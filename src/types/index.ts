export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'masjid_admin';
  masjidId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Mosque {
  _id: string;
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

export interface SalahTimes {
  _id: string;
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

export interface Event {
  _id: string;
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

export interface SearchFilters {
  city?: string;
  state?: string;
  country?: string;
  name?: string;
  hasJumuah?: boolean;
}
