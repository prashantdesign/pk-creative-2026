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
  siteName?: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  aboutText: string;
  aboutImageUrl?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    email?: string;
  };
  aiSettings?: {
    geminiModel?: string;
    isAiFeatureEnabled?: boolean;
  };
  theme?: 'light' | 'dark';
  isMaintenanceModeEnabled?: boolean;
  areAnimationsEnabled?: boolean;
  isAboutSectionVisible?: boolean;
  isStatsSectionVisible?: boolean;
  isGallerySectionVisible?: boolean;
  isPortfolioSectionVisible?: boolean;
  isSkillsSectionVisible?: boolean;
  isToolsSectionVisible?: boolean;
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
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
    isRead: boolean;
}
