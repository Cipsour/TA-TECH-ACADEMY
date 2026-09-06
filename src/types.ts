export type UserRole = 'VISITOR' | 'STUDENT' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  avatarUrl?: string;
  phone?: string;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'CONVERTED';
export type LeadSource = 'FORM' | 'ZALO' | 'LANDING';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  grade?: string;
  desiredCourse: string;
  notes?: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  content: string;
  order: number;
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  targetAge: string;
  price: number;
  originalPrice?: number;
  category: 'Elementary' | 'Office Skills' | 'Programming' | 'Applied AI';
  duration: string;
  isPublished: boolean;
  highlights: string[];
  modules: Module[];
}

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  studentAge: string;
  courseTitle: string;
  thumbnail: string;
  category: string;
  likes: number;
  demoUrl?: string;
  description: string;
}

export interface RoadmapItem {
  id: string;
  stage: string;
  title: string;
  targetAge: string;
  duration: string;
  description: string;
  skills: string[];
  iconName: string;
  highlightColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  courseTaken: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
