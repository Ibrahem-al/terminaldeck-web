# TerminalDeck — Complete Feature Guide

TerminalDeck is a spatial terminal workspace for power users. Instead of tabs or rigid panes, you arrange terminals freely on an infinite canvas — organized into projects and workspaces, with smart automation, AI awareness, and deep customization.

---

## Infinite Spatial Canvas

The core of TerminalDeck. Every terminal lives on a boundless 2D canvas you control.

- **Pan** by clicking empty space and dragging, scrolling, or using middle-mouse button
- **Zoom** from 25% to 200% with Ctrl+Scroll (Cmd+Scroll on Mac) or trackpad pinch
- New terminals automatically appear in your current viewport
- The canvas extends seamlessly in all directions — no limits

## Magnetic Snap Alignment

Drag terminals near each other and edges snap into alignment like puzzle pieces. Keeps layouts clean without forcing a grid. Snap strength is adjustable from 0% (off) to 100% (strong) in Settings.

- Edge-to-edge and center-to-center snapping
- Blue dashed guide lines appear during drag to show alignment
- Adjacent terminals snap flush for clean tiling

## Collision & Overlap Control

Choose how terminals interact when they overlap:

| Mode | Behavior |
|------|----------|
| **No Overlap** (default) | Terminals push each other aside — no stacking allowed |
| **Allow Overlap** | Free-form overlapping like OS windows |
| **Warning** | Allows overlap but visually flags collisions with dimming |

---

## Workspaces

Top-level containers for entirely separate work contexts. Each workspace has its own canvas, projects, terminals, and layout state.

- Switch instantly from the workspace dropdown in the sidebar
- Create, rename, and delete workspaces
- All state (positions, zoom, groups) is saved per workspace

## Projects

Color-coded terminal groups within a workspace. Use them to organize terminals by concern — "Backend", "Frontend", "Database", "Monitoring", etc.

- 24 preset colors with a visual picker
- Set a default working directory for all terminals in the project
- Set startup commands that run automatically for new terminals in the project
- Drag terminals between projects in the sidebar
- Right-click a project for quick actions: **New Instance**, Settings, Rename, Change Color, Delete

## Sidebar Navigation

A collapsible left panel (toggle with the button in the title bar) showing your full workspace tree:

- **Workspace switcher** at the top
- **Expandable project tree** with color dots and instance counts
- **Ungrouped terminals** section
- **Embedded windows** section
- **Status indicator lights** next to every terminal
- **Click any terminal** to instantly scroll the canvas to it and focus it
- **Double-click** to rename inline
- **Drag-and-drop** terminals between projects
- **Right-click** for context menus (rename, move, delete, settings)

---

## Terminal Features

### Creating Terminals

Create terminals from the sidebar ("+ New Instance" button), from a project's right-click menu ("New Instance"), or from the Command Palette. Each terminal can be configured with:

- **Shell** — PowerShell, Bash, Zsh, Cmd, or system default
- **Working directory** — where the shell starts
- **Startup commands** — run automatically on creation
- **Name** — double-click to rename anytime
- **Minimize** — hide from canvas while keeping the session alive

### Startup Commands

Automate terminal setup with a three-level inheritance system:

1. **Global** — runs for every new terminal (Settings > Startup)
2. **Project** — runs for terminals in that project (Project Settings)
3. **Instance** — runs for a specific terminal (Instance Settings)

Commands execute sequentially with 1.5-second delays, giving interactive programs (like `claude` or `aider`) time to initialize before the next command runs. Use **override mode** on an instance to skip inherited commands entirely.

### AI Instance Detection

TerminalDeck auto-detects AI CLI tools — Claude, ChatGPT, Aider, Copilot, and others. AI instances get special behavior:

- **Yellow indicator** when the AI is waiting for your input
- Detection is automatic based on terminal output patterns
- You can also manually tag any terminal as an AI instance

### Status Indicator Lights

Every terminal displays a colored dot showing its current state:

| Color | Meaning |
|-------|---------|
| **Gray** | Idle — shell at prompt, nothing running |
| **Blue** (pulsing) | Active — command running, output flowing |
| **Green** | Task completed — persists until you interact with the terminal |
| **Yellow** | Waiting for input (AI instances) |
| **Orange** | Embedded external window |

Green and yellow indicators stay visible until you click or focus the terminal, so you never miss a completed task. New terminals start gray — the green indicator only appears after an actual task runs (shell startup doesn't count).

### Copy & Paste

- **Ctrl+C with text selected** — copies to clipboard (does NOT kill the process)
- **Ctrl+C with nothing selected** — sends SIGINT (interrupt signal)
- **Ctrl+V** — paste from clipboard
- **Ctrl+Shift+C / Ctrl+Shift+V** — alternative copy/paste shortcuts

### Sleep/Wake Resilience

When your computer sleeps and wakes, all terminal sessions are preserved. No data loss, no re-execution of startup commands. Sessions resume exactly where they left off.

---

## Canvas Layouts

### Auto-Arrange Presets

Instantly rearrange all terminals with one click from the Layout picker:

| Layout | Description |
|--------|-------------|
| **Grid** | Equal-sized tiles in a square grid |
| **Columns** | Side-by-side vertical columns |
| **Rows** | Stacked horizontal rows |
| **Full Screen** | Each terminal fills the entire viewport, stacked vertically for scrolling |

### Custom Layout Presets

Save your current terminal arrangement as a named preset. Reapply it anytime to restore exact positions and sizes. Delete presets you no longer need.

### Instance Grouping

Select multiple terminals and group them so they move as a single unit. Individual resizing still works — neighbors shift to accommodate. Useful for keeping related terminals together.

---

## Focus Mode

Zoom into a single terminal to fill the entire canvas area. Everything else dims to 30% opacity and becomes non-interactive.

- **Default hotkey:** F11 (customizable in Settings > General)
- **Exit:** Escape, click the dimmed overlay, or press the hotkey again
- Smooth 400ms zoom animation
- Your previous canvas position is restored on exit
- Also accessible from the Command Palette

---

## Search & Navigation

### Command Palette

A VS Code-style searchable action menu. Press **Ctrl+Shift+P** (Cmd+Shift+P on Mac) to open.

- Fuzzy search across all available actions
- Create, rename, and delete terminals, projects, and workspaces
- Apply layout presets and switch themes
- Toggle sidebar, focus mode, and settings
- Navigate with arrow keys, Enter to execute, Escape to close

### Global Search

Full-text search across all terminal names and output. Press **Ctrl+Shift+F** (Cmd+Shift+F on Mac) or click the search bar in the title bar.

- **Instance name matches** appear first with accent highlighting
- **Terminal output matches** show the instance name, line number, and highlighted text
- Click any result to scroll the canvas to that terminal and focus it
- Searches up to 10,000 lines of output per terminal
- Results update as you type (150ms debounce)

---

## External Window Embedding

Embed any application window directly onto the TerminalDeck canvas. Embedded windows behave like terminals — resize, snap, drag, and group them alongside your terminal sessions.

- **Windows:** Uses the DWM Thumbnail API for zero-copy GPU-composited rendering at full display refresh rate
- **macOS:** Native Objective-C integration with frame capture
- Click "+ Embed Window" in the sidebar to select a window
- Embedded windows appear in a dedicated sidebar section
- Full mouse and keyboard interaction forwarded to the source window

---

## Notifications

Get alerted when terminal tasks complete, even when you're focused elsewhere.

### Sound Notifications

A two-tone chime plays when a task finishes. Volume is adjustable from 0% to 100% in Settings > Notifications. Only fires for actual task completions — shell startup is ignored.

### Desktop Notifications

Native OS notifications display the terminal name and a "Task Complete" message. Works on both Windows and macOS. Requests permission on first use.

Both notification types can be independently enabled or disabled in Settings.

---

## Theming

Five built-in themes with full light mode support:

| Theme | Description |
|-------|-------------|
| **Dark** | Clean, modern dark interface (default) |
| **Light** | Full light mode with proper contrast across all UI |
| **Solarized Dark** | Classic Solarized color scheme |
| **Solarized Light** | Light variant of Solarized |
| **System** | Automatically follows your OS light/dark preference |

All UI elements — sidebar, settings, dialogs, context menus, buttons, borders — respect the active theme via CSS custom properties.

### Project-Colored Borders

When enabled (Settings > Appearance), each terminal displays its project's color as a subtle border for quick visual identification.

---

## Settings

A full tabbed settings panel accessible from the sidebar:

| Tab | What You Configure |
|-----|-------------------|
| **General** | Restore on startup, auto-start on login, default shell, working directory, focus mode hotkey |
| **Appearance** | Theme, title bar mode, project-colored borders |
| **Canvas** | Overlap mode, zoom enable/disable, snap strength, canvas margin |
| **Notifications** | Desktop notifications, sound notifications, volume |
| **Startup** | Global startup commands |
| **Data** | Import/export layout presets and app settings |

All changes are drafted locally and applied when you click Save — you can always cancel to discard.

---

## Import & Export

Back up and share your configuration via the Data tab in Settings:

- **Export Layout Presets** — save all custom layouts to a JSON file
- **Import Layout Presets** — load layouts from a file (appended alongside existing presets, names deduplicated)
- **Export App Settings** — save your complete settings configuration
- **Import App Settings** — load settings from a file (click Save to apply)

Files use a versioned JSON format with type validation to prevent importing the wrong file type.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl+Shift+P** (Cmd+Shift+P) | Open Command Palette |
| **Ctrl+Shift+F** (Cmd+Shift+F) | Open Global Search |
| **F11** (customizable) | Toggle Focus Mode |
| **Escape** | Exit Focus Mode |
| **Arrow Keys** | Navigate search/palette results |
| **Enter** | Execute selected action |

The focus mode hotkey can be changed to F2, F6, F9, F11, or F12 in Settings > General.

---

## Persistence

Everything is automatically saved and restored when you reopen TerminalDeck:

- All workspaces, projects, and terminals
- Canvas positions, sizes, zoom levels, and groupings
- Terminal scrollback history
- Sidebar state and all settings

Toggle "Restore on startup" in Settings to start fresh each launch while keeping your configuration.

---

## Platform Support

| Platform | Status |
|----------|--------|
| **Windows 10/11** | Full feature set including DWM window embedding |
| **macOS** (Intel + Apple Silicon) | Full feature set with native integration |

---

## Custom Title Bar

TerminalDeck uses a frameless window with a custom title bar for a clean, integrated look:

- **Sidebar toggle** on the left
- **Search bar** in the center (click to open Global Search)
- **Window controls** on the right (minimize, maximize/restore, close)
- Draggable for window repositioning
