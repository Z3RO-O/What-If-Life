// Global State Management
// Using Zustand for lightweight state management

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Auth Store
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: true,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setLoading: (loading) => set({ loading }),
        clearAuth: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      }
    ),
    { name: 'auth-store' }
  )
);

// Simulation Store
interface SimulationState {
  currentSimulation: any | null;
  simulations: any[];
  loading: boolean;
  setCurrentSimulation: (simulation: any) => void;
  setSimulations: (simulations: any[]) => void;
  addSimulation: (simulation: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useSimulationStore = create<SimulationState>()(
  devtools(
    (set, get) => ({
      currentSimulation: null,
      simulations: [],
      loading: false,
      setCurrentSimulation: (simulation) => set({ currentSimulation: simulation }),
      setSimulations: (simulations) => set({ simulations }),
      addSimulation: (simulation) => {
        const { simulations } = get();
        set({ simulations: [simulation, ...simulations] });
      },
      setLoading: (loading) => set({ loading }),
    }),
    { name: 'simulation-store' }
  )
);

// UI Store
interface UIState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  notifications: any[];
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'dark',
        sidebarOpen: false,
        notifications: [],
        toggleTheme: () => {
          const { theme } = get();
          set({ theme: theme === 'dark' ? 'light' : 'dark' });
        },
        toggleSidebar: () => {
          const { sidebarOpen } = get();
          set({ sidebarOpen: !sidebarOpen });
        },
        addNotification: (notification) => {
          const { notifications } = get();
          set({ notifications: [...notifications, { ...notification, id: Date.now().toString() }] });
        },
        removeNotification: (id) => {
          const { notifications } = get();
          set({ notifications: notifications.filter(n => n.id !== id) });
        },
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    { name: 'ui-store' }
  )
);