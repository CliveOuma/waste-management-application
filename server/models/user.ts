import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;  
  email: string;
  password: string;
  role?: string;  
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

// Define the schema
const userSchema: Schema<IUser> = new Schema(
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
      type: String,
      required: true,
    },
    role: { type: String, default: 'user', required: true },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);


const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
