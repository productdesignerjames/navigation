# Navigation Prototype — Animation Specification

## Overview

This document describes all animations and transitions used in the navigation prototype, covering desktop mega menu, mobile navigation, interactive elements, and the theme toggle.

---

## 1. Desktop Mega Menu

### 1.1 Panel Open (First Open — Fade In)

| Property | Value |
|----------|-------|
| Trigger | Hover on a nav tab (`tab-figma`) |
| Target | `.mega-menu-panel` |
| Properties animated | `opacity`, `visibility` |
| Duration | 300ms (in), 500ms (out) |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease-out) |
| Behaviour | Panel fades from `opacity: 0` → `opacity: 1`. Visibility toggles with a 0s/0.5s delay to allow pointer events only when visible. |

### 1.2 Panel Switch (Between Tabs)

| Property | Value |
|----------|-------|
| Trigger | Moving hover from one tab to another while menu is already open |
| Behaviour | Transition is set to `none` on the new panel, it is made `.active` instantly, and the previous panel's `.active` class is removed. After a single `requestAnimationFrame`, transition is restored so subsequent close/opens animate normally. This prevents a crossfade flicker when switching tabs. |

### 1.3 Panel Close

| Property | Value |
|----------|-------|
| Trigger | Mouse leaves the tab row AND the panel area |
| Delay | 300ms (via `setTimeout` in JS) — acts as a hover grace period |
| Animation | Reverse of open: `opacity: 1` → `opacity: 0` over 500ms with the same cubic-bezier easing |

### 1.4 Navbar Background Transition

| Property | Value |
|----------|-------|
| Trigger | `.mega-open` class added/removed from `.navbar` |
| Properties animated | `background`, `border-bottom` |
| Duration | 300ms open / 500ms close |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Effect | Navbar background transitions from `transparent` → `#001029` with a `0.5px solid #0066cc` bottom border |

### 1.5 Mega Card Stagger Animation (`cardMorph`)

| Property | Value |
|----------|-------|
| Trigger | Panel becomes `.active` |
| Keyframe name | `cardMorph` |
| Duration | 600ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` (custom overshoot ease-out) |
| Stagger | 60ms per card (child 1 = 0ms, child 2 = 60ms, … child 7 = 360ms) |
| From state | `opacity: 0`, `transform: scale(0.9)`, `filter: blur(4px)` |
| To state | `opacity: 1`, `transform: scale(1)`, `filter: blur(0)` |
| Fill mode | `both` |

### 1.6 Mega Card Hover

| Property | Value |
|----------|-------|
| Properties animated | Background fill (via `::before` pseudo-element opacity), label transform |
| `::before` transition | `opacity 0.4s ease` (0 → 1, fills card with `#2C6BE3`) |
| Label shift | `transform: translateY(-4px)` over `0.3s ease` |
| Card transform | `transition: transform 0.3s ease` (reserved for future scale on hover) |

---

## 2. Mobile Navigation

### 2.1 Hamburger → Close Icon Morph

| Property | Value |
|----------|-------|
| Trigger | `.mobile-menu-btn.active` class toggle |
| Target | Three `<span>` bars inside `.mobile-menu-icon` |
| Duration | 300ms |
| Easing | `ease` |
| Behaviour | Top bar: `translateY(8.5px) rotate(45deg)`. Middle bar: `opacity: 0`. Bottom bar: `translateY(-8.5px) rotate(-45deg)`. |

### 2.2 Mobile Menu Open/Close

| Property | Value |
|----------|-------|
| Trigger | `.open` class on `.mobile-menu` |
| Mechanism | `display: none` ↔ `display: flex` (instant show/hide, no CSS transition) |
| Note | The menu appears/disappears immediately; animation is delegated to the accordion cards within. |

### 2.3 Accordion Expand/Collapse

| Property | Value |
|----------|-------|
| Trigger | `.open` class on `.mobile-accordion` |
| Properties animated | `max-height`, `opacity`, `padding` |
| Duration | 400ms (max-height, padding), 300ms (opacity) |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` for height/padding, `ease` for opacity |
| Collapsed state | `max-height: 0`, `opacity: 0`, `padding: 0 24px` |
| Expanded state | `max-height: 800px`, `opacity: 1`, `padding: 24px 16px` |

### 2.4 Accordion Chevron Rotation

| Property | Value |
|----------|-------|
| Trigger | `.mobile-accordion.open` |
| Properties animated | `transform` |
| Duration | 300ms |
| Easing | `ease` |
| Closed | `rotate(45deg)` (pointing down) |
| Open | `rotate(-135deg)` (pointing up) |

### 2.5 Mobile Card Stagger Animation (`cardSlideUp`)

| Property | Value |
|----------|-------|
| Trigger | Accordion opens (`.mobile-accordion.open`) |
| Keyframe name | `cardSlideUp` |
| Duration | 400ms |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Stagger | 50ms per card (child 1 = 50ms, child 2 = 100ms, … child 6 = 300ms) |
| From state | `opacity: 0`, `transform: translateY(12px)` |
| To state | `opacity: 1`, `transform: translateY(0)` |
| Fill mode | `both` |

---

## 3. Theme Toggle ("Lights On" Button)

### 3.1 Light Ray Icon Animation

| Property | Value |
|----------|-------|
| Trigger | Hover on `.topbar-toggle` |
| Target | SVG paths with class `.light-ray` |
| Properties animated | `opacity`, `transform`, `fill` |
| Default state | `opacity: 0`, `transform: scale(0.3)` |
| Hover state | `opacity: 1`, `transform: scale(1)` |
| Duration | 400ms (opacity, transform), 200ms (fill) |
| Easing | `ease` (opacity), `cubic-bezier(0.34, 1.56, 0.64, 1)` (transform — springy overshoot) |
| Transform origin | `50% 50%` (centre of each ray) |

### 3.2 Fill Colour Change

| Property | Value |
|----------|-------|
| Trigger | Hover on `.topbar-toggle` |
| Target | All SVG `path` elements |
| Transition | `fill 0.2s ease` |
| Effect | Icon colour changes from `#C9E4FF` → `#fff` |

---

## 4. General Interactive Transitions

### 4.1 Tab Hover/Active State

| Property | Value |
|----------|-------|
| Target | `.tab-figma` |
| Properties | `background`, `color` |
| Duration | 200ms |
| Easing | default (ease) |
| Effect | Background: `transparent` → `#002f87`, text remains white |

### 4.2 Log In Button Hover

| Property | Value |
|----------|-------|
| Target | `.small-btn-figma` |
| Properties | `background`, `color` |
| Duration | 300ms |
| Easing | `ease` |
| Effect | Background: `#fcfcfd` → `#c9e4ff` |

### 4.3 "View All" Button Hover

| Property | Value |
|----------|-------|
| Target | `.mega-menu-view-all` |
| Properties | `background`, `border-color` |
| Duration | 300ms |
| Easing | `ease` |
| Effect | Gradient border disappears, solid `#2C6BE3` background and border |

### 4.4 Top Bar Links

| Property | Value |
|----------|-------|
| Target | `.topbar-link` |
| Property animated | `color` |
| Duration | 200ms |
| Effect | `#C9E4FF` → `#fff` on hover |

---

## 5. Keyboard / Escape Handling

| Event | Behaviour |
|-------|-----------|
| `Escape` key pressed | Immediately closes the desktop mega menu (removes `.active` from all panels, removes `.mega-open` from navbar). Also closes mobile menu if open. No animation delay — instant state removal. |

---

## 6. Timing Summary

| Animation | Duration | Easing |
|-----------|----------|--------|
| Mega panel fade in | 300ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Mega panel fade out | 500ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Card morph (desktop) | 600ms + 60ms stagger | cubic-bezier(0.22, 1, 0.36, 1) |
| Card slide up (mobile) | 400ms + 50ms stagger | cubic-bezier(0.4, 0, 0.2, 1) |
| Accordion expand | 400ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Hamburger morph | 300ms | ease |
| Light ray reveal | 400ms | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Card hover fill | 400ms | ease |
| Close grace period | 300ms | — (setTimeout delay) |

---

## 7. Design Principles

1. **Progressive disclosure** — cards stagger in to draw the eye through content hierarchy.
2. **Responsive timing** — shorter durations on mobile (400ms vs 600ms) for snappier feel on touch.
3. **Grace periods** — 300ms hover-out delay prevents accidental menu closure when moving between tabs and panel.
4. **Instant switching** — when the menu is already open, switching tabs skips the fade to feel instantaneous.
5. **Physics-informed easing** — overshoot curves (springy) on decorative elements (light rays, card scale); standard material curves on layout animations.
