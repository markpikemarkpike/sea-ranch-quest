# Sea Ranch Quest

A 12-level mini-game collection celebrating The Sea Ranch, a planned community on the Northern California coast known for its distinctive modernist architecture and Barbara Stauffacher Solomon's iconic Supergraphic murals.

**Live Site:** https://markpikemarkpike.github.io/sea-ranch-quest/

**Status**: Complete - All 12 levels playable with mobile touch controls

---

## CRITICAL: File Safety

### DO NOT OVERWRITE WITHOUT BACKUP:
- **`web-deploy/`** - These are the PRIMARY working copies of the HTML games
- **`sea-ranch-style.js`** - Shared library used by ALL levels
- **`love2d/`** - Original Lua source files (reference only)

### Before Making Changes:
1. The GitHub repo is your backup: `markpikemarkpike/sea-ranch-quest`
2. Always pull latest before editing
3. Commit frequently
4. Test locally before deploying

---

## Quick Start

```bash
# Local testing
cd /Users/mark/Documents/sea-ranch-video-game/web-deploy
npx http-server -p 8082 --cors
# Open: http://localhost:8082/level0-menu.html
```

---

## Project Structure

```
sea-ranch-video-game/
├── README.md
├── DEVELOPMENT.md          # This development guide
│
├── web-deploy/             # HTML/JS games (DEPLOYED TO GITHUB PAGES)
│   ├── level0-menu.html    # Main menu hub
│   ├── level1-kelp.html    # Kelp Forest - otter balancing ecosystem
│   ├── level2-sheep.html   # Sheep herding
│   ├── level3-highway.html # Highway 1 driving/dodging
│   ├── level4-biketrail.html
│   ├── level5-driftwood.html # Driftwood fort (Tetris-like, has R button)
│   ├── level6-hardware.html
│   ├── level7-paddleball.html
│   ├── level8-abalone.html
│   ├── level9-covey.html   # Poppy the dog herding quail
│   ├── level10-woodblock.html
│   ├── level11-sauna.html  # Maze (grid-based movement)
│   ├── level12-chapel.html # Breathing meditation
│   └── sea-ranch-style.js  # SHARED - touch controls, design system
│
└── love2d/                 # Original Love2D Lua versions (REFERENCE ONLY)
```

---

## Deployment to GitHub Pages

### Repo Info
- **Repo:** `https://github.com/markpikemarkpike/sea-ranch-quest`
- **Deploys from:** `main` branch root
- **Propagation:** 1-2 minutes after push

### Deploy Process
```bash
# Clone fresh copy to /tmp
cd /tmp
rm -rf sea-ranch-quest
git clone https://github.com/markpikemarkpike/sea-ranch-quest.git

# Copy your updated files
cp /Users/mark/Documents/sea-ranch-video-game/web-deploy/*.html /tmp/sea-ranch-quest/
cp /Users/mark/Documents/sea-ranch-video-game/web-deploy/*.js /tmp/sea-ranch-quest/

# Configure git (if needed in /tmp)
cd /tmp/sea-ranch-quest
git config user.email "mark@example.com"
git config user.name "Mark Pike"

# Commit and push
git add -A
git commit -m "Your commit message"
git push
```

### Cache Busting
When updating `sea-ranch-style.js`, increment version in ALL HTML files:
```html
<script src="sea-ranch-style.js?v=5"></script>
```
Current version: `?v=4`

---

## A Day at Sea Ranch (Level Narrative)

| # | Level | Time | Description |
|---|-------|------|-------------|
| 1 | Kelp Forest | Dawn | Protect kelp as a sea otter |
| 2 | Sheep Herding | Morning | Guard the flock |
| 3 | Highway 1 | Midday | Family arrives via coastal road |
| 4 | Bike Trail | Afternoon | Explore Sea Ranch scenes |
| 5 | Driftwood Fort | Afternoon | Build on the beach (Tetris) |
| 6 | Hardware Store | Late afternoon | Find cabin supplies |
| 7 | Paddle Ball | Evening | Play at Moonraker courts |
| 8 | Abalone Puzzle | Dusk | Tidepools moment |
| 9 | Design Patrol | Twilight | Quail covey reviews cabins |
| 10 | Woodblock Print | Night | Creative cabin time |
| 11 | Sauna | Late night | Steam maze + supergraphics |
| 12 | Chapel | Dawn | Breathing meditation, cycle completes |

---

## Controls

### Desktop
- **Arrow Keys**: Movement/navigation
- **Enter/Space/A**: Confirm/action
- **B/Escape**: Back/cancel/menu
- **R**: Rotate (Level 5 only)

### Mobile Touch Controls
Provided by `sea-ranch-style.js` via `SeaRanchStyle.setupTouchControls()`:

- **Joystick** (left): Circular, 8-way directional with visual thumb
- **A Button** (red): Fires 'a', 'Enter', 'Space' events
- **B Button** (blue): Fires 'b' event
- **ESC Button** (top-right): Returns to menu
- **R Button** (green, Level 5 only): Rotate piece

---

## Mobile Touch Controls - Technical Details

### Architecture
All touch controls live in `sea-ranch-style.js`:
- `setupTouchControls(options)` - Creates joystick + buttons
- `setupResponsive()` - Handles viewport scaling
- `_dispatchKey(key, type)` - Fires synthetic keyboard events

### Joystick Implementation
- 8-way directional (supports diagonals)
- Visual thumb follows touch position
- Fires `ArrowUp/Down/Left/Right` keyboard events
- Dead zone: 15px from center
- Max travel: 35px from center

### Critical Bug Fix (Jan 2026)
The `_dispatchKey()` function must generate correct `event.code`:
```javascript
// Arrow keys need code = key (not 'KeyARROWUP')
if (key.startsWith('Arrow')) code = key;
```

### Styling
- Sea Ranch aesthetic: cream/wood gradients, black borders, offset shadows
- Joystick base has subtle wood grain texture
- Buttons have press animation (translate + shadow reduction)

---

## Game-Specific Tuning

### Level 1 - Kelp Forest (Otter)
```javascript
accel: 0.28      // Snappier for joystick (was 0.18)
friction: 0.88   // Tighter control (was 0.95)
maxSpeed: 2.8    // Slightly faster (was 2.4)
currents: ~0.003 // Reduced 40% so player feels in control
```

### Level 3 - Highway (Driving)
```javascript
steerPower: 4.5  // Balanced for joystick (was 8.0, too twitchy)
```

### Level 9 - Covey (Dog/Quail)
```javascript
speed: 1.1       // Snappier response (was 0.8)
friction: 0.88   // Already good
```

### Level 11 - Sauna Maze
- **Grid-based** discrete movement (not continuous physics)
- Uses `justPressed()` - one cell per input
- Joystick tap = one move; return to center between moves
- Maze walls shift during play (adds difficulty)

---

## Visual Design System

### Colors (Barbara Stauffacher Solomon inspired)
```javascript
// Supergraphic accents
red: '#C41E3A'
blue: '#2E5DA8'

// Nature tones
meadow: '#7A9B6D'
wood: '#8b7355'
sand: '#d4c4a8'
sky: '#87CEEB'
ocean: '#1a5a7a'

// Neutrals
black: '#1a1a1a'
cream: '#f5f5f0'
```

### Typography
- **Font:** Helvetica Neue, Helvetica, Arial, sans-serif
- **Titles:** Bold, large
- **Labels:** Uppercase, letter-spacing
- **Body:** Regular weight, minimal text

### UI Elements
- 3-4px black borders
- Offset drop shadows (3px right, 3px down)
- Cream/wood gradient backgrounds
- Subtle wood grain texture overlay
- Press states: translate(2px, 2px) + reduced shadow

---

## Common Issues & Solutions

### Touch controls not showing on mobile
1. Check `setupTouchControls()` is called
2. Verify `@media (pointer: coarse)` CSS is present
3. Check z-index (should be 9999)

### Buttons off-screen on iOS Safari
- **Cause:** `100vw` includes scrollbar width
- **Fix:** Use `width: 100%` with `position: fixed; left: 0; right: 0`

### Cached old JavaScript
- Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
- Or increment `?v=X` in script tags

### Maze not responding on mobile
- **Was a bug:** Arrow key `event.code` was 'KeyARROWUP' instead of 'ArrowUp'
- **Fixed in:** `_dispatchKey()` function

### Joystick feels floaty/unresponsive
- Decrease `friction` (lower = tighter, try 0.85-0.88)
- Increase `accel` (higher = snappier response)
- Reduce environmental forces (currents, wind, etc.)

---

## Development Tips

1. **Test mobile in Chrome DevTools** - Toggle device toolbar (Cmd+Shift+M)
2. **iOS Safari quirks** - Use `position: fixed` with `inset: 0` for full viewport
3. **Touch events** - Always use `{ passive: false }` to allow `preventDefault()`
4. **Multi-touch** - Joystick and buttons work simultaneously
5. **Viewport meta** - Include `maximum-scale=1.0, user-scalable=no` to prevent zoom

---

## Credits

- **Concept & Development**: Mark & Family
- **Supergraphic Inspiration**: Barbara Stauffacher Solomon
- **Target Platform**: Web (mobile + desktop), originally WaveShare Game HAT

---

## Sea Ranch References

### Design Guidelines (Level 9)
- Natural wood siding
- Muted earth tones
- Integration with landscape
- Sod roofs encouraged
- No reflective surfaces

### Locations Featured
- Highway 1 coastal drive
- Sea Ranch Chapel (non-denominational, Hubbell design)
- Meadows and bluffs
- Monterey Cypress groves
- Pacific Ocean cliffs

### Barbara Stauffacher Solomon
Swiss-trained graphic designer whose bold Supergraphic murals at the Sea Ranch Swim & Tennis Club defined the community's visual identity in the 1960s. Features sweeping curves, bold arrows, and the iconic red/blue/white palette.

---

*Last Updated: January 2026*
