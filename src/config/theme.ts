export const brand = {
  bg: '#0a0a12',
  bgDeep: '#060610',
  bgPanel: '#12122a',
  bgCard: '#16162a',
  border: '#1e1e3a',
  borderLight: '#2a2a4a',
  accent: '#4a9eff',
  accentGlow: '#4a9eff80',
  accentDim: '#2a6ecc',
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  red: '#ef4444',
  purple: '#a855f7',
  textPrimary: '#e8e8f0',
  textSecondary: '#8888aa',
  textDim: '#555570',
} as const

export const projectColors = [
  '#4a9eff', '#22c55e', '#eab308', '#f97316', '#ef4444',
  '#a855f7', '#ec4899', '#06b6d4', '#14b8a6', '#84cc16',
  '#f43f5e', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b',
  '#6366f1', '#d946ef', '#0891b2', '#059669', '#ca8a04',
  '#e11d48', '#7c3aed', '#0284c7', '#047857',
] as const

export const fonts = {
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
