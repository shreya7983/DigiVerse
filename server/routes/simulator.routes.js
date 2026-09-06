import express from 'express';
import { saveProfile, getProfileById, getRecentProfiles } from '../controllers/simulatorController.js';

const router = express.Router();

router.post('/save', saveProfile);
router.get('/recent', getRecentProfiles);
router.get('/:id', getProfileById);

export default router;
