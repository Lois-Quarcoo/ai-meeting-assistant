import mongoose from 'mongoose';

const actionItemSchema = new mongoose.Schema({
  task: { type: String, required: true },
  assignee: { type: String, default: '' },
  dueDate: { type: String, default: '' },
  completed: { type: Boolean, default: false },
});

const meetingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Raw transcript text (uploaded or live)
    transcript: {
      type: String,
      default: '',
    },
    // Optional: path/url to uploaded audio file
    audioFileUrl: {
      type: String,
      default: null,
    },
    // AI-generated outputs
    summary: {
      type: String,
      default: '',
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    actionItems: {
      type: [actionItemSchema],
      default: [],
    },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative', ''],
      default: '',
    },
    // Meeting metadata
    duration: {
      type: Number, // in minutes
      default: 0,
    },
    participants: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast user queries
meetingSchema.index({ user: 1, createdAt: -1 });
meetingSchema.index({ user: 1, status: 1 });

const Meeting = mongoose.model('Meeting', meetingSchema);
export default Meeting;
