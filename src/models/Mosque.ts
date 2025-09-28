import mongoose, { Schema, Document } from 'mongoose';

export interface IMosque extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  imam: {
    name: string;
    photo?: string;
  };
  images: string[];
  isApproved: boolean;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
}

const MosqueSchema = new Schema<IMosque>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String,
  },
  imam: {
    name: {
      type: String,
      required: true,
    },
    photo: String,
  },
  images: [String],
  isApproved: {
    type: Boolean,
    default: false,
  },
  adminId: {
    type: String,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Create indexes for search functionality
MosqueSchema.index({ name: 'text', city: 'text', address: 'text' });
MosqueSchema.index({ city: 1, state: 1, country: 1 });
MosqueSchema.index({ latitude: 1, longitude: 1 });

export default mongoose.models.Mosque || mongoose.model<IMosque>('Mosque', MosqueSchema);
