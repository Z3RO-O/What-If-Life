# Paths Not Taken - AI Life Simulation Platform

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
- **Primary**: Emerald-based palette (modern, trustworthy)
- **Secondary**: Teal and Cyan accents
- **Premium**: Amber and Orange highlights
- **Background**: Dark slate with subtle gradients

### **Typography**
- **Headings**: Space Grotesk (stylish, modern)
- **Body**: Inter (readable, professional)
- **Code/Data**: JetBrains Mono (technical elements)

### **Component Organization**

#### **Freemium Components** (`/freemium/`)
- Hero section with free features
- Basic feature showcase
- Community-focused elements
- Emerald/teal color scheme

#### **Premium Components** (`/premium/`)
- Advanced feature displays
- Pricing sections
- Premium-only functionality
- Amber/orange color scheme

## 🚀 **Launch & Development System**

### **Easy Configuration**

Toggle launch mode in `src/config/appConfig.ts`:

```typescript
export const APP_CONFIG = {
  IS_LAUNCHED: false, // Show launch page
  IS_LAUNCHED: true,  // Show main app
  
  UNDER_DEVELOPMENT: {
    routes: ['/pricing'],           // Full pages
    components: ['PricingSection'], // UI components  
    features: ['ai-generation']     // Specific features
  }
};
```

### **Usage Examples**

#### **Wrap Components**
```tsx
import DevWrapper from '@/components/common/DevWrapper';

<DevWrapper componentName="PricingSection">
  <PricingSection />
</DevWrapper>
```

#### **Direct Component**
```tsx
<UnderDevelopment
  type="feature"
  name="AI Media Generation"
  description="Advanced AI-powered media creation"
  estimatedCompletion="Q3 2025"
/>
```

## 🎯 **Key Features**

### **Modern Design**
- ✅ **Glass morphism** effects
- ✅ **Invisible scrollbars** (all browsers)
- ✅ **Smooth animations** and micro-interactions
- ✅ **Responsive design** (mobile-first)

### **Professional Organization**
- ✅ **Clear separation** of free vs premium features
- ✅ **Modular component** structure
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
```

## 📱 **Responsive Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1400px

## 🎨 **Custom CSS Classes**

```css
/* Typography */
.font-heading     /* Space Grotesk for headings */
.font-display     /* Space Grotesk for display text */
.font-mono        /* JetBrains Mono for code/data */

/* Gradients */
.gradient-text    /* Emerald gradient text */
.premium-gradient /* Amber/orange gradient text */

/* Effects */
.glass           /* Glass morphism background */
.glass-hover     /* Glass with hover effects */
.emerald-glow    /* Emerald glow effect */
.premium-glow    /* Premium amber glow */

/* Cards */
.freemium-card   /* Free tier styling */
.premium-card    /* Premium tier styling */
```

## 🚀 **Deployment Ready**

The project is production-ready with:
- SEO-friendly meta tags
- Optimized bundle sizes
- Progressive enhancement
- Accessibility compliance
- Cross-browser compatibility

## 📈 **Performance Optimizations**

- Lazy loading for components
- Image optimization
- Code splitting by feature
- Minimal bundle sizes
- Efficient re-renders

---

**Built with modern web technologies for maximum performance and user experience.**