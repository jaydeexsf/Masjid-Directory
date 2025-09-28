import mongoose, { Schema, Document } from 'mongoose';

export interface ISalahTimes extends Document {
  masjidId: string;
  date: Date;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jumuah?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SalahTimesSchema = new Schema<ISalahTimes>({
  masjidId: {
    type: String,
    ref: 'Mosque',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fajr: {
    type: String,
    required: true,
  },
  dhuhr: {
    type: String,
    required: true,
  },
  asr: {
    type: String,
    required: true,
  },
  maghrib: {
    type: String,
    required: true,
  },
  isha: {
    type: String,
    required: true,
  },
  jumuah: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create compound index for efficient queries
SalahTimesSchema.index({ masjidId: 1, date: 1 });

export default mongoose.models.SalahTimes || mongoose.model<ISalahTimes>('SalahTimes', SalahTimesSchema);
