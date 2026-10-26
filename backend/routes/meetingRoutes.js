import express from 'express';
import {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  analyzeMeeting,
  generateEmail,
  askMeeting,
  getMeetingStats,
} from '../controllers/meetingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Stats (must be before /:id to avoid route conflict)
router.get('/stats', protect, getMeetingStats);

// CRUD
router.route('/').get(protect, getMeetings).post(protect, createMeeting);

router
  .route('/:id')
  .get(protect, getMeetingById)
  .put(protect, updateMeeting)
  .delete(protect, deleteMeeting);

// AI endpoints
router.post('/:id/analyze', protect, analyzeMeeting);
router.post('/:id/email', protect, generateEmail);
router.post('/:id/ask', protect, askMeeting);

export default router;
