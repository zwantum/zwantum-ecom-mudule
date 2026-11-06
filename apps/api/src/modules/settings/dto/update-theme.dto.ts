import { z } from 'zod';

export const ThemeColorsSchema = z.object({
  primary: z.string().min(1),
  primaryForeground: z.string().min(1),
  secondary: z.string().min(1),
  secondaryForeground: z.string().min(1),
  background: z.string().min(1).refine((val) => {
    // Enforce Rule: Don't use #000 as background by default
    const normalized = val.toLowerCase().trim();
    return normalized !== '#000' && normalized !== '#000000' && normalized !== 'black';
  }, {
    message: 'RULE ENFORCEMENT: Black (#000000) cannot be used as the default background. Use a light or neutral canvas.',
  }),
  foreground: z.string().min(1),
  muted: z.string().min(1),
  mutedForeground: z.string().min(1),
  accent: z.string().min(1),
  accentForeground: z.string().min(1),
  border: z.string().min(1),
  card: z.string().optional(),
  cardForeground: z.string().optional(),
});

export const ThemeBrandingSchema = z.object({
  storeName: z.string().min(1),
  tagline: z.string().optional(),
  announcementText: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
});

export const UpdateThemeDtoSchema = z.object({
  branding: ThemeBrandingSchema.optional(),
  colors: ThemeColorsSchema.optional(),
  borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
  headerLayout: z.enum(['standard', 'centered', 'minimal']).optional(),
  footerLayout: z.enum(['columns', 'simple']).optional(),
});

export type UpdateThemeDto = z.infer<typeof UpdateThemeDtoSchema>;

