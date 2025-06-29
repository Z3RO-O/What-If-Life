# WhatIf Life - AI Life Simulation Platform 🔮

_"See the Life You Didn't Choose"_

## 🎯 **Project Structure**

```
src/
├── assets/              # Static assets (images, icons, etc.)
├── components/
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── common/         # Shared components (Modals, Forms, etc.)
│   ├── specific/       # Page-specific components
│   ├── freemium/       # Free tier features
│   └── premium/        # Premium tier features
├── helpers/            # Utility functions and helpers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # State management
└── types/              # TypeScript type definitions
```

## 🎨 **Design System**

### **Color Palette**

- **Primary**: Deep Purple and Violet (mystical, future-focused)
- **Secondary**: Indigo and Blue accents (trust, intelligence)
- **Premium**: Golden and Amber highlights (premium experience)
- **Background**: Dark cosmic themes with subtle gradients

### **Typography**

- **Headings**: Space Grotesk (modern, futuristic)
- **Body**: Inter (readable, professional)
- **Code/Data**: JetBrains Mono (technical elements)

### **Component Organization**

#### **Freemium Components** (`/freemium/`)

- Hero section with basic life simulations
- Limited scenario showcase
- Community-focused elements
- Purple/violet color scheme

#### **Premium Components** (`/premium/`)

- Advanced AI-powered simulations
- Unlimited scenarios & detailed analytics
- Premium-only neuro-AI features
- Golden/amber color scheme

## 🚀 **Launch & Development System**

### **Easy Configuration**

Toggle launch mode in `src/config/appConfig.ts`:

```typescript
export const APP_CONFIG = {
  IS_LAUNCHED: false, // Show launch page
  IS_LAUNCHED: true, // Show main app

  UNDER_DEVELOPMENT: {
    routes: ['/advanced-simulation'], // Full pages
    components: ['NeuroAIEngine'], // UI components
    features: ['timeline-visualization'], // Specific features
  },
};
```

### **Usage Examples**

#### **Wrap Components**

```tsx
import DevWrapper from '@/components/common/DevWrapper';

<DevWrapper componentName="LifeSimulationEngine">
  <LifeSimulationEngine />
</DevWrapper>;
```

#### **Direct Component**

```tsx
<UnderDevelopment
  type="feature"
  name="Advanced Neuro-AI Modeling"
  description="Deep learning-powered life outcome predictions"
  estimatedCompletion="Q2 2025"
/>
```

## 🎯 **Key Features**

### **Modern Design**

- ✅ **Cosmic glass morphism** effects
- ✅ **Invisible scrollbars** (all browsers)
- ✅ **Smooth timeline animations** and micro-interactions
- ✅ **Responsive design** (mobile-first)

### **Professional Organization**

- ✅ **Clear separation** of basic vs advanced simulations
- ✅ **Modular component** structure for life scenarios
- ✅ **Consistent naming** conventions
- ✅ **TypeScript** throughout

### **Developer Experience**

- ✅ **Easy configuration** management
- ✅ **Hot reloading** for development
- ✅ **Component isolation** for testing
- ✅ **Clear documentation**

## 🛠️ **Development Commands**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview

# Run AI model tests
npm run test:ai

# Generate life simulation data
npm run generate:scenarios
```

## 📱 **Responsive Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1400px

## 🎨 **Custom CSS Classes**

```css
/* Typography */
.font-heading        /* Space Grotesk for headings */
.font-display        /* Space Grotesk for display text */
.font-mono           /* JetBrains Mono for code/data */

/* Gradients */
.whatif-gradient     /* Purple/violet gradient text */
.premium-gradient    /* Golden/amber gradient text */
.cosmic-gradient     /* Deep space gradient background */

/* Effects */
.glass               /* Glass morphism background */
.glass-hover         /* Glass with hover effects */
.purple-glow         /* Purple mystical glow effect */
.premium-glow        /* Premium golden glow */
.timeline-glow       /* Timeline visualization glow */

/* Cards */
.freemium-card       /* Basic tier styling */
.premium-card        /* Premium tier styling */
.simulation-card     /* Life simulation display */
.outcome-card        /* Outcome visualization */
```

## 🧠 **AI Components Structure**

```
src/components/ai/
├── LifeSimulator/      # Core simulation engine
├── OutcomePredictor/   # AI prediction models
├── TimelineVisualizer/ # Interactive timeline display
├── DecisionTree/       # Decision point mapping
└── NeuroAnalyzer/      # Advanced neuro-AI features
```

## 🔮 **Simulation Features**

### **Free Tier**

- 3 life simulations per month
- Basic outcome predictions
- Simple timeline visualization
- Community scenario sharing

### **Premium Tier**

- Unlimited simulations
- Advanced neuro-AI modeling
- Detailed probability analytics
- Custom scenario creation
- Export & sharing capabilities

## 🚀 **Deployment Ready**

The project is production-ready with:

- SEO-friendly meta tags for life simulation content
- Optimized AI model loading
- Progressive enhancement for complex visualizations
- Accessibility compliance
- Cross-browser compatibility

## 📈 **Performance Optimizations**

- Lazy loading for AI models
- Simulation result caching
- Code splitting by simulation features
- Minimal bundle sizes for core functionality
- Efficient re-renders for timeline updates

## 🎭 **Theme Variables**

```css
:root {
  /* WhatIf Life Brand Colors */
  --whatif-primary: #8b5cf6; /* Deep Purple */
  --whatif-secondary: #06b6d4; /* Cyan */
  --whatif-premium: #f59e0b; /* Amber */
  --whatif-cosmic: #1e1b4b; /* Dark Indigo */

  /* Simulation Colors */
  --timeline-past: #64748b; /* Slate */
  --timeline-present: #8b5cf6; /* Purple */
  --timeline-future: #06b6d4; /* Cyan */
  --outcome-positive: #10b981; /* Emerald */
  --outcome-negative: #ef4444; /* Red */
}
```

---

**Built with cutting-edge AI technology to explore infinite life
possibilities.**

_"What if you could see every path your life could take?"_ ✨
