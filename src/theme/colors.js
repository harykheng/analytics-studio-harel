// MD3 dark color scheme tokens (mirrors tailwind.config.js)
export const colors = {
  bg: '#0f1117',
  surface: '#1a1d23',
  surfaceVariant: '#1e2128',
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  tertiary: '#EFB8C8',
  onTertiary: '#492532',
  tertiaryContainer: '#633B48',
  onSurface: '#E6E1E5',
  onSurfaceVariant: '#C9C5D0',
  outline: '#938F99',
  outlineVariant: '#49454F',
  error: '#F2B8B5',
  success: '#7DD8A4',
}

// Chart series palette drawn from MD3 roles
export const chartPalette = [colors.primary, colors.tertiary, colors.secondary, '#9AC7FA', '#F6C177']

export const deviceColors = {
  desktop: colors.primary,
  mobile: colors.tertiary,
  tablet: colors.secondary,
}
