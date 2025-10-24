# Todo Frontend — Ocean Professional

A modern, minimalist React Todo app with in-memory state and the Ocean Professional theme.

## Features
- Add, view, and remove todos (no persistence)
- Central column layout with a card surface
- Smooth transitions, rounded corners, subtle shadows
- Accessible: keyboard Enter to add, focus styles, ARIA labels
- Auto-focus input and disables Add when empty

## Quick Start
1. Install dependencies
   - npm install
2. Run the app
   - npm start
3. Open in browser
   - http://localhost:3000 (or the port configured by the environment; container runs on 3004 in the workspace)

## Styling
Theme colors and styles are defined in src/App.css using CSS variables:
- Primary: #3b82f6
- Secondary: #64748b
- Success: #06b6d4
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

## Notes
- This app is intentionally lightweight and uses only React + CSS.
- State is in-memory and resets on refresh.
