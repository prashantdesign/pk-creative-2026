import { Timestamp } from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  description: string;
  projectCategoryId: string;
  imageUrl: string;
  projectImages: string[];
  toolsUsed: string;
  order: number;
  problem?: string;
  solution?: string;
  outcome?: string;
  projectUrl?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  galleryCategoryId: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ProjectCategory {
  id: string;
  name: string;
  order: number;
}

export interface GalleryCategory {
  id: string;
  name: string;
  order: number;
}

export interface SiteContent {
  id: string;
  siteName: string;
  logoUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    email?: string;
    whatsapp?: string;
  };
  aiSettings?: {
    geminiModel?: string;
    isAiFeatureEnabled?: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  isMaintenanceModeEnabled: boolean;
  areAnimationsEnabled: boolean;
  isGallerySectionVisible: boolean;
  isPortfolioSectionVisible: boolean;
  isServicesSectionVisible: boolean;
  isTestimonialsSectionVisible: boolean;
  isTargetAudienceSectionVisible?: boolean;
  skillsSectionTitle?: string;
  skillsSectionDescription?: string;
  skills?: string[];
  toolsSectionTitle?: string;
  toolsSectionDescription?: string;
  tools?: {
    name: string;
    iconUrl: string;
  }[];
  gallerySectionTitle?: string;
  gallerySectionDescription?: string;
  portfolioSectionTitle?: string;
  portfolioSectionDescription?: string;
  servicesSectionTitle?: string;
  servicesSectionDescription?: string;
  services?: {
    title: string;
    description: string;
    icon: string;
  }[];
  targetAudienceSectionTitle?: string;
  targetAudienceSectionDescription?: string;
  targetAudience?: string[];
  testimonialsSectionTitle?: string;
  testimonialsSectionDescription?: string;
  testimonials?: {
    name: string;
    role: string;
    content: string;
    avatarUrl?: string;
  }[];
  contactSectionTitle?: string;
  contactSectionDescription?: string;
  footerDescription?: string;
  footerCopyrightText?: string;
  seoSettings?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImageUrl?: string;
    gaTrackingId?: string;
  };
  isTeamSectionVisible?: boolean;
  teamSectionTitle?: string;
  teamSectionDescription?: string;
  aboutText?: string;
  aboutImageUrl?: string;
  stats?: { label: string; value: string }[];
  isWebsiteShowcaseVisible?: boolean;
  websiteShowcaseTitle?: string;
  websiteShowcaseDescription?: string;
}

export interface WebsiteProject {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface PrivateSettings {
  id: string; // 'global'
  smtpHost?: string;
  smtpPort?: string;
  smtpUser?: string;
  smtpPass?: string;
  smtpSender?: string;
  adminEmail?: string;
  metaAppId?: string;
  metaAppSecret?: string;
  instagramAccountId?: string;
  metaAccessToken?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  scheduledTime: string; // ISO string
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED';
  publishedAt?: string; // ISO string
  error?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    services?: string[];
    timestamp: Timestamp;
    isRead: boolean;
}
