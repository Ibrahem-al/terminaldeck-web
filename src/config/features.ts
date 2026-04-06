export interface Feature {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
}

export const features: Feature[] = [
  {
    id: 'canvas',
    title: 'Infinite Spatial Canvas',
    tagline: 'No Walls. No Limits.',
    description: 'Every terminal lives on a boundless 2D canvas you control. Pan, zoom, and arrange freely in all directions.',
    highlights: [
      'Pan by dragging, scrolling, or middle-mouse',
      'Zoom from 25% to 200% with Ctrl+Scroll or pinch',
      'Canvas extends seamlessly in all directions',
      'Magnetic snap alignment with adjustable strength',
    ],
  },
  {
    id: 'organization',
    title: 'Workspaces & Projects',
    tagline: 'Order from Chaos.',
    description: 'Top-level workspaces for separate contexts. Color-coded projects within each workspace to organize terminals by concern.',
    highlights: [
      'Switch workspaces instantly',
      '24 preset project colors',
      'Per-project working directories & startup commands',
      'Drag terminals between projects',
    ],
  },
  {
    id: 'terminal',
    title: 'Terminal Power',
    tagline: 'Every Shell. Every Tool. One Surface.',
    description: 'Create terminals with any shell, automate setup with startup commands, and let AI instances be detected automatically.',
    highlights: [
      'PowerShell, Bash, Zsh, Cmd, or system default',
      'Three-level startup command inheritance',
      'Auto-detects AI CLI tools (Claude, ChatGPT, Aider)',
      'Color-coded status indicator lights',
    ],
  },
  {
    id: 'layouts',
    title: 'Canvas Layouts',
    tagline: 'One Click. Perfect Arrangement.',
    description: 'Instantly rearrange all terminals with preset layouts or save your own custom arrangements.',
    highlights: [
      'Grid, Columns, Rows, Full Screen presets',
      'Save & restore custom layout presets',
      'Instance grouping for linked movement',
      'Snap alignment with blue guide lines',
    ],
  },
  {
    id: 'focus',
    title: 'Focus Mode & Search',
    tagline: 'Find Anything. Focus on What Matters.',
    description: 'Zoom into any terminal with Focus Mode. Find anything with the Command Palette and Global Search.',
    highlights: [
      'F11 to zoom into a single terminal',
      'Everything else dims to 30% opacity',
      'VS Code-style Command Palette (Ctrl+Shift+P)',
      'Full-text search across all terminal output',
    ],
  },
  {
    id: 'embedding',
    title: 'Window Embedding',
    tagline: 'Any App. On Your Canvas.',
    description: 'Embed any application window directly onto the canvas. Resize, snap, and group them alongside your terminals.',
    highlights: [
      'Zero-copy GPU-composited rendering on Windows',
      'Full mouse and keyboard interaction forwarded',
      'Drag, resize, and snap like terminals',
      'Native macOS integration',
    ],
  },
  {
    id: 'themes',
    title: 'Themes & Customization',
    tagline: 'Make It Yours.',
    description: 'Five built-in themes with full light mode support. Project-colored borders for instant visual identification.',
    highlights: [
      'Dark, Light, Solarized Dark, Solarized Light, System',
      'Project-colored terminal borders',
      'Full settings panel with tabbed interface',
      'Import & export configurations',
    ],
  },
  {
    id: 'platform',
    title: 'Cross-Platform',
    tagline: 'Everywhere You Work.',
    description: 'Full feature set on both Windows and macOS, including native integrations for each platform.',
    highlights: [
      'Windows 10/11 with DWM window embedding',
      'macOS Intel + Apple Silicon',
      'Sound & desktop notifications',
      'Sleep/wake session resilience',
    ],
  },
]
