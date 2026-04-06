// Update these URLs when you upload release assets to GitHub
const REPO = 'Ibrahem-al/terminaldeck-web'
const GUIDES = 'Ibrahem-al/TerminalDeck'

export const DOWNLOADS = {
  windows: `https://github.com/${REPO}/releases/latest/download/TerminalDeck.0.1.0.exe`,
  windowsGuide: `https://github.com/${GUIDES}/blob/main/guides/WINDOWS.md`,
  macos: `https://github.com/${GUIDES}/blob/main/guides/MACOS.md`,
  releases: `https://github.com/${REPO}/releases`,
  github: `https://github.com/${GUIDES}`,
} as const
