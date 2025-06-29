// Application Constants
export const APP_CONSTANTS = {
  // API Configuration
  API: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },

  // Simulation Limits
  SIMULATION: {
    FREE_TIER_LIMIT: 3, // simulations per month
    PREMIUM_TIER_LIMIT: -1, // unlimited
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_PATH_LENGTH: 1000,
    MAX_CONTEXT_LENGTH: 1000,
    MIN_CONFIDENCE_SCORE: 0.6,
    MAX_CONFIDENCE_SCORE: 0.95,
  },

  // Media Generation
  MEDIA: {
    MAX_PROMPT_LENGTH: 500,
    MIN_PROMPT_LENGTH: 10,
    MAX_VIDEO_DURATION: 10, // seconds
    MIN_VIDEO_DURATION: 3, // seconds
    SUPPORTED_IMAGE_FORMATS: ['png', 'jpg', 'jpeg', 'webp'],
    SUPPORTED_VIDEO_FORMATS: ['mp4', 'webm'],
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  },

  // UI Configuration
  UI: {
    ANIMATION_DURATION: 300, // milliseconds
    DEBOUNCE_DELAY: 500, // milliseconds
    TOAST_DURATION: 5000, // milliseconds
    MODAL_TRANSITION: 200, // milliseconds
  },

  // Validation Rules
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 128,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Feature Flags
  FEATURES: {
    MEDIA_GENERATION: true,
    ADVANCED_ANALYTICS: false,
    SOCIAL_SHARING: false,
    EXPORT_FUNCTIONALITY: true,
    REAL_TIME_UPDATES: true,
  },

  // Subscription Tiers
  TIERS: {
    FREE: {
      name: 'Explorer',
      price: 0,
      simulations: 3,
      features: ['basic_analysis', 'community_insights', 'email_support'],
    },
    PREMIUM: {
      name: 'Visionary',
      price: 19.99,
      simulations: -1, // unlimited
      features: [
        'unlimited_simulations',
        'advanced_analysis',
        'media_generation',
        'priority_support',
        'export_features',
        'analytics_dashboard',
      ],
    },
    ENTERPRISE: {
      name: 'Mastermind',
      price: 39.99,
      simulations: -1, // unlimited
      features: [
        'all_premium_features',
        'custom_ai_training',
        'api_access',
        'dedicated_support',
        'white_label',
        'enterprise_security',
      ],
    },
  },

  // Error Messages
  ERRORS: {
    NETWORK: 'Network error. Please check your connection and try again.',
    AUTH_REQUIRED: 'Please sign in to continue.',
    PERMISSION_DENIED: 'You do not have permission to perform this action.',
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_FAILED: 'Please check your input and try again.',
    SIMULATION_FAILED: 'Simulation processing failed. Please try again.',
    MEDIA_GENERATION_FAILED: 'Media generation failed. Please try again.',
  },

  // Success Messages
  SUCCESS: {
    SIMULATION_CREATED: 'Simulation created successfully!',
    MEDIA_GENERATED: 'Media generated successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    EMAIL_VERIFIED: 'Email verified successfully!',
    PASSWORD_RESET: 'Password reset email sent!',
  },

  // Local Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'paths_auth_token',
    USER_PREFERENCES: 'paths_user_preferences',
    THEME: 'paths_theme',
    ONBOARDING_COMPLETED: 'paths_onboarding_completed',
    LAST_SIMULATION: 'paths_last_simulation',
  },

  // External URLs
  URLS: {
    PRIVACY_POLICY: '/privacy',
    TERMS_OF_SERVICE: '/terms',
    SUPPORT: 'mailto:support@pathsnottaken.com',
    DOCUMENTATION: '/docs',
    STATUS_PAGE: 'https://status.pathsnottaken.com',
  },
};

// Decision Categories
export const DECISION_CATEGORIES = [
  {
    value: 'career',
    label: 'Career & Work',
    icon: '💼',
    description: 'Professional decisions, job changes, career pivots',
    color: 'blue',
  },
  {
    value: 'education',
    label: 'Education',
    icon: '🎓',
    description: 'Academic choices, learning paths, skill development',
    color: 'green',
  },
  {
    value: 'relationship',
    label: 'Relationships',
    icon: '💕',
    description: 'Personal relationships, marriage, family decisions',
    color: 'pink',
  },
  {
    value: 'location',
    label: 'Location & Living',
    icon: '🏠',
    description: 'Moving, housing, geographic life changes',
    color: 'purple',
  },
  {
    value: 'health',
    label: 'Health & Wellness',
    icon: '🏃',
    description: 'Health choices, lifestyle changes, wellness decisions',
    color: 'red',
  },
  {
    value: 'finance',
    label: 'Financial',
    icon: '💰',
    description: 'Investment, spending, financial planning decisions',
    color: 'yellow',
  },
] as const;

// Media Generation Styles
export const MEDIA_STYLES = [
  {
    value: 'realistic',
    label: 'Realistic',
    description: 'Photorealistic, high quality, detailed',
  },
  {
    value: 'artistic',
    label: 'Artistic',
    description: 'Painterly, creative style, expressive',
  },
  {
    value: 'cinematic',
    label: 'Cinematic',
    description: 'Film-like, dramatic lighting, professional',
  },
  {
    value: 'vintage',
    label: 'Vintage',
    description: 'Retro, nostalgic feel, classic aesthetic',
  },
  {
    value: 'futuristic',
    label: 'Futuristic',
    description: 'Sci-fi, high-tech, modern aesthetic',
  },
  {
    value: 'minimalist',
    label: 'Minimalist',
    description: 'Clean, simple design, elegant',
  },
] as const;

// Export types for TypeScript
export type DecisionCategory = typeof DECISION_CATEGORIES[number]['value'];
export type MediaStyle = typeof MEDIA_STYLES[number]['value'];
export type SubscriptionTier = keyof typeof APP_CONSTANTS.TIERS;