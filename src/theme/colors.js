// MD3 light color scheme tokens (mirrors tailwind.config.js)
export const colors = {
  bg: '#F4F6F5',
  surface: '#FFFFFF',
  surfaceVariant: '#EEF1EF',
  primary: '#14532D',
  onPrimary: '#FFFFFF',
  primaryContainer: '#DCFCE7',
  onPrimaryContainer: '#0F3D22',
  secondary: '#3F6B57',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E3EEE7',
  tertiary: '#F97362',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFE4DF',
  onSurface: '#111827',
  onSurfaceVariant: '#6B7280',
  outline: '#D1D5DB',
  outlineVariant: '#E5E7EB',
  error: '#DC2626',
  success: '#16A34A',
}

// Chart series palette drawn from MD3 roles
export const chartPalette = [colors.primary, colors.tertiary, colors.secondary, '#2563EB', '#F6C177']

export const deviceColors = {
  desktop: colors.primary,
  mobile: colors.tertiary,
  tablet: colors.secondary,
}
