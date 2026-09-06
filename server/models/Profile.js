import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    default: 'Visionary Architect',
  },
  archetype: {
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
  },
  scores: {
    innovation: { type: Number, required: true },
    sustainability: { type: Number, required: true },
    humanImpact: { type: Number, required: true },
    aiIntegration: { type: Number, required: true },
    digitalWellbeing: { type: Number, required: true },
  },
  choices: {
    aiLevel: { type: Number, required: true },
    sustainabilityLevel: { type: Number, required: true },
    smartCitiesLevel: { type: Number, required: true },
    collaborationLevel: { type: Number, required: true },
    educationModel: { type: String, required: true },
    healthcareModel: { type: String, required: true },
  },
  strengths: [{ type: String }],
  priorities: [{ type: String }],
  technologies: [{ type: String }],
  challenges: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProfileModel = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
