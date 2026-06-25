import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // Not required because Google signups won't have a password
      minLength: 8,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { 
    timestamps: true 
  }
);

const User = mongoose.model('User', userSchema);

export default User;
