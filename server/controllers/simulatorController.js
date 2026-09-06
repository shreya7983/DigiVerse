import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProfileModel } from '../models/Profile.js';
import { isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/profiles.json');

// Ensure local fallback data file exists
const ensureDataFile = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error creating data file:', err);
  }
};

const getLocalProfiles = () => {
  ensureDataFile();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

const saveLocalProfile = (profile) => {
  const profiles = getLocalProfiles();
  const existingIdx = profiles.findIndex((p) => p.id === profile.id);
  if (existingIdx >= 0) {
    profiles[existingIdx] = profile;
  } else {
    profiles.unshift(profile);
  }
  // Keep latest 100
  if (profiles.length > 100) profiles.length = 100;
  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles, null, 2), 'utf-8');
};

export const saveProfile = async (req, res) => {
  try {
    const profileData = req.body;
    if (!profileData || !profileData.archetype || !profileData.scores) {
      return res.status(400).json({ error: 'Incomplete profile payload' });
    }

    const id = profileData.id || `vision-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const record = {
      ...profileData,
      id,
      createdAt: new Date().toISOString(),
    };

    if (isDbConnected()) {
      try {
        await ProfileModel.findOneAndUpdate({ id }, record, { upsert: true, new: true });
      } catch (dbErr) {
        console.warn('DB write error, using local fallback:', dbErr.message);
        saveLocalProfile(record);
      }
    } else {
      saveLocalProfile(record);
    }

    return res.status(201).json({
      success: true,
      message: 'Future Profile secured successfully',
      data: record,
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    return res.status(500).json({ error: 'Failed to preserve future profile' });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      try {
        const found = await ProfileModel.findOne({ id });
        if (found) return res.json({ success: true, data: found });
      } catch (err) {
        console.warn('DB read fallback:', err.message);
      }
    }

    const profiles = getLocalProfiles();
    const match = profiles.find((p) => p.id === id);
    if (!match) {
      return res.status(404).json({ error: 'Vision profile not found' });
    }
    return res.json({ success: true, data: match });
  } catch (error) {
    console.error('Error retrieving profile:', error);
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

export const getRecentProfiles = async (req, res) => {
  try {
    if (isDbConnected()) {
      try {
        const list = await ProfileModel.find().sort({ createdAt: -1 }).limit(6);
        if (list && list.length > 0) return res.json({ success: true, data: list });
      } catch (err) {
        console.warn('DB list fallback:', err.message);
      }
    }

    const profiles = getLocalProfiles().slice(0, 6);
    return res.json({ success: true, data: profiles });
  } catch (error) {
    console.error('Error fetching recent profiles:', error);
    return res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};
