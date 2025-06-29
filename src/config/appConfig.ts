// App Configuration
export const APP_CONFIG = {
  // Toggle between launch page and main app
  IS_LAUNCHED: true, // Set to true to show main app, false to show launch page

  // Under development pages/components - DISABLED FOR NOW
  UNDER_DEVELOPMENT: {
    routes: [] as string[],
    components: [] as string[],
    features: [] as string[],
  },

  // Launch page configuration
  LAUNCH_CONFIG: {
    title: 'What If? Life',
    subtitle: 'Your Infinite Potential',
    description:
      'Revolutionary AI-powered life simulation platform. Discover the extraordinary paths your life could have taken with advanced decision analysis.',
    launchDate: '2025-03-15', // YYYY-MM-DD format
    earlyAccessEnabled: false, // Disabled for now
    socialLinks: {
      twitter: 'https://twitter.com/whatiflife',
      linkedin: 'https://linkedin.com/company/whatiflife',
      email: 'hello@whatiflife.com',
    },
  },
};

// Helper function to check if a route is under development
export const isRouteUnderDevelopment = (route: string): boolean => {
  return APP_CONFIG.UNDER_DEVELOPMENT.routes.includes(route);
};

// Helper function to check if a component is under development
export const isComponentUnderDevelopment = (component: string): boolean => {
  return APP_CONFIG.UNDER_DEVELOPMENT.components.includes(component);
};

// Helper function to check if a feature is under development
export const isFeatureUnderDevelopment = (feature: string): boolean => {
  return APP_CONFIG.UNDER_DEVELOPMENT.features.includes(feature);
};
