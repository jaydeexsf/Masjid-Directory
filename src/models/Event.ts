import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  masjidId: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  image?: string;
  isRecurring: boolean;
  recurringPattern?: 'weekly' | 'monthly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  masjidId: {
    type: String,
    ref: 'Mosque',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringPattern: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
  },
}, {
  timestamps: true,
});

// Create indexes for efficient queries
EventSchema.index({ masjidId: 1, date: 1 });
EventSchema.index({ date: 1 });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
