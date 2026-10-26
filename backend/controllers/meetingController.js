import Meeting from '../models/meetingModel.js';
import { analyzeMeetingTranscript, generateFollowUpEmail, askAboutMeeting } from '../services/geminiService.js';
import fs from 'fs';

// ─────────────────────────────────────────────
// @desc    Create a new meeting (with transcript text)
// @route   POST /api/meetings
// @access  Private
// ─────────────────────────────────────────────
export const createMeeting = async (req, res) => {
  try {
    const { title, transcript, participants, duration, tags } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Meeting title is required' });
    }

    const meeting = await Meeting.create({
      user: req.user._id,
      title,
      transcript: transcript || '',
      participants: participants || [],
      duration: duration || 0,
      tags: tags || [],
      status: transcript ? 'processing' : 'pending',
    });

    // If transcript provided, analyze it immediately
    if (transcript && transcript.trim().length > 0) {
      try {
        const analysis = await analyzeMeetingTranscript(transcript, title);

        meeting.summary = analysis.summary || '';
        meeting.keyPoints = analysis.keyPoints || [];
        meeting.actionItems = analysis.actionItems || [];
        meeting.sentiment = analysis.sentiment || 'neutral';

        // Merge AI-detected participants with manually provided ones
        if (analysis.participants && analysis.participants.length > 0) {
          const combined = [...new Set([...meeting.participants, ...analysis.participants])];
          meeting.participants = combined;
        }

        meeting.status = 'completed';
      } catch (aiError) {
        console.error('Gemini analysis error:', aiError.message);
        meeting.status = 'failed';
      }

      await meeting.save();
    }

    res.status(201).json(meeting);
  } catch (error) {
    console.error('createMeeting error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all meetings for authenticated user
// @route   GET /api/meetings
// @access  Private
// ─────────────────────────────────────────────
export const getMeetings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    // Build filter
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const [meetings, total] = await Promise.all([
      Meeting.find(filter)
        .select('-transcript') // Don't send full transcript in list view
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Meeting.countDocuments(filter),
    ]);

    res.json({
      meetings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('getMeetings error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get a single meeting by ID
// @route   GET /api/meetings/:id
// @access  Private
// ─────────────────────────────────────────────
export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json(meeting);
  } catch (error) {
    console.error('getMeetingById error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Update a meeting (title, transcript, tags, etc.)
// @route   PUT /api/meetings/:id
// @access  Private
// ─────────────────────────────────────────────
export const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const { title, transcript, participants, duration, tags, actionItems } = req.body;

    if (title !== undefined) meeting.title = title;
    if (participants !== undefined) meeting.participants = participants;
    if (duration !== undefined) meeting.duration = duration;
    if (tags !== undefined) meeting.tags = tags;
    if (actionItems !== undefined) meeting.actionItems = actionItems;

    // If transcript was updated, re-analyze
    if (transcript !== undefined && transcript !== meeting.transcript) {
      meeting.transcript = transcript;
      meeting.status = 'processing';
      await meeting.save();

      if (transcript.trim().length > 0) {
        try {
          const analysis = await analyzeMeetingTranscript(transcript, meeting.title);
          meeting.summary = analysis.summary || '';
          meeting.keyPoints = analysis.keyPoints || [];
          meeting.actionItems = analysis.actionItems || [];
          meeting.sentiment = analysis.sentiment || 'neutral';
          if (analysis.participants && analysis.participants.length > 0) {
            const combined = [...new Set([...meeting.participants, ...analysis.participants])];
            meeting.participants = combined;
          }
          meeting.status = 'completed';
        } catch (aiError) {
          console.error('Gemini re-analysis error:', aiError.message);
          meeting.status = 'failed';
        }
      }
    }

    await meeting.save();
    res.json(meeting);
  } catch (error) {
    console.error('updateMeeting error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Delete a meeting
// @route   DELETE /api/meetings/:id
// @access  Private
// ─────────────────────────────────────────────
export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('deleteMeeting error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Analyze/Re-analyze a meeting transcript with Gemini
// @route   POST /api/meetings/:id/analyze
// @access  Private
// ─────────────────────────────────────────────
export const analyzeMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    if (!meeting.transcript || meeting.transcript.trim().length === 0) {
      return res.status(400).json({ message: 'No transcript available to analyze' });
    }

    meeting.status = 'processing';
    await meeting.save();

    const analysis = await analyzeMeetingTranscript(meeting.transcript, meeting.title);

    meeting.summary = analysis.summary || '';
    meeting.keyPoints = analysis.keyPoints || [];
    meeting.actionItems = analysis.actionItems || [];
    meeting.sentiment = analysis.sentiment || 'neutral';
    if (analysis.participants && analysis.participants.length > 0) {
      const combined = [...new Set([...meeting.participants, ...analysis.participants])];
      meeting.participants = combined;
    }
    meeting.status = 'completed';
    await meeting.save();

    res.json({
      message: 'Analysis complete',
      summary: meeting.summary,
      keyPoints: meeting.keyPoints,
      actionItems: meeting.actionItems,
      sentiment: meeting.sentiment,
      participants: meeting.participants,
    });
  } catch (error) {
    console.error('analyzeMeeting error:', error.message);
    // Mark as failed if AI call fails
    await Meeting.findByIdAndUpdate(req.params.id, { status: 'failed' });
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Generate a follow-up email for a meeting
// @route   POST /api/meetings/:id/email
// @access  Private
// ─────────────────────────────────────────────
export const generateEmail = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    if (!meeting.summary) {
      return res.status(400).json({ message: 'Meeting must be analyzed before generating an email' });
    }

    const emailContent = await generateFollowUpEmail(meeting);
    res.json({ email: emailContent });
  } catch (error) {
    console.error('generateEmail error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Ask a question about a specific meeting
// @route   POST /api/meetings/:id/ask
// @access  Private
// ─────────────────────────────────────────────
export const askMeeting = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const meeting = await Meeting.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    if (!meeting.transcript || meeting.transcript.trim().length === 0) {
      return res.status(400).json({ message: 'No transcript available for this meeting' });
    }

    const answer = await askAboutMeeting(meeting.transcript, question, meeting.title);
    res.json({ question, answer });
  } catch (error) {
    console.error('askMeeting error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get meeting statistics for the user's dashboard
// @route   GET /api/meetings/stats
// @access  Private
// ─────────────────────────────────────────────
export const getMeetingStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [total, completed, pending, failed, sentimentCounts, recentMeetings] = await Promise.all([
      Meeting.countDocuments({ user: userId }),
      Meeting.countDocuments({ user: userId, status: 'completed' }),
      Meeting.countDocuments({ user: userId, status: 'pending' }),
      Meeting.countDocuments({ user: userId, status: 'failed' }),
      Meeting.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$sentiment', count: { $sum: 1 } } },
      ]),
      Meeting.find({ user: userId })
        .select('title status createdAt sentiment')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const sentimentMap = { positive: 0, neutral: 0, negative: 0 };
    sentimentCounts.forEach(({ _id, count }) => {
      if (_id && sentimentMap.hasOwnProperty(_id)) {
        sentimentMap[_id] = count;
      }
    });

    res.json({
      total,
      completed,
      pending,
      failed,
      sentiment: sentimentMap,
      recentMeetings,
    });
  } catch (error) {
    console.error('getMeetingStats error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
