// Form Validation Helpers
import { z } from 'zod';

// Decision validation schema
export const decisionSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z.string().max(500, 'Description must be less than 500 characters').optional(),

  category: z.enum(['career', 'education', 'relationship', 'location', 'health', 'finance']),

  chosenPath: z
    .string()
    .min(10, 'Chosen path must be at least 10 characters')
    .max(1000, 'Chosen path must be less than 1000 characters'),

  alternativePath: z
    .string()
    .min(10, 'Alternative path must be at least 10 characters')
    .max(1000, 'Alternative path must be less than 1000 characters'),

  timeframe: z
    .string()
    .min(3, 'Timeframe must be at least 3 characters')
    .max(50, 'Timeframe must be less than 50 characters'),

  importance: z
    .number()
    .min(1, 'Importance must be between 1 and 5')
    .max(5, 'Importance must be between 1 and 5'),

  context: z.string().max(1000, 'Context must be less than 1000 characters').optional(),
});

// User profile validation schema
export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .optional(),

  email: z.string().email('Invalid email address'),

  avatarUrl: z.string().url('Invalid URL').optional(),
});

// Media generation validation schema
export const mediaGenerationSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(500, 'Prompt must be less than 500 characters'),

  type: z.enum(['image', 'video']),

  style: z
    .enum(['realistic', 'artistic', 'cinematic', 'vintage', 'futuristic', 'minimalist'])
    .optional(),

  duration: z
    .number()
    .min(3, 'Duration must be at least 3 seconds')
    .max(10, 'Duration must be at most 10 seconds')
    .optional(),
});

// Validation helper function
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  errors?: string[];
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => err.message);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}

// Form field validation helpers
export const fieldValidators = {
  email: (value: string) => {
    const result = z.string().email().safeParse(value);
    return result.success ? null : 'Invalid email address';
  },

  password: (value: string) => {
    const result = z.string().min(6).safeParse(value);
    return result.success ? null : 'Password must be at least 6 characters';
  },

  required: (value: string) => {
    return value.trim() ? null : 'This field is required';
  },

  minLength: (min: number) => (value: string) => {
    return value.length >= min ? null : `Must be at least ${min} characters`;
  },

  maxLength: (max: number) => (value: string) => {
    return value.length <= max ? null : `Must be less than ${max} characters`;
  },
};
