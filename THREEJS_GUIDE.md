# 3D Background System - main2.js Documentation

## Overview

`main2.js` is a Three.js-powered interactive 3D background that brings the homepage to life. It features an animated earth, particle system, orbiting satellites, and interactive plant growth.

---

## Features

### 🌍 Interactive Earth
- Central rotating sphere representing Africa
- Professional texture mapping
- Atmospheric glow effect
- Emissive blue lighting
- Click to create plants at intersection points

### ✨ Particle System
- 2000 animated particles representing stories and data
- Professional color palette (blue, teal, cyan, green)
- Smooth particle motion and wrapping
- Vertex colors for visual variety

### 🛰️ Orbiting Satellites
- 4 colored satellites orbiting the earth
- Professional colors matching brand palette
- Rotating animation
- Varied orbits and speeds

### 🌱 Interactive Plants
- Click earth to spawn plants
- Plants grow and animate
- Auto-remove after 3 seconds
- Green color symbolizing growth

### 💡 Professional Lighting
- Key light (blue-tinted)
- Rim light (cyan accent)
- Fill light (teal)
- Ambient light for soft illumination
- Shadows and depth

---

## Color System

Uses professional color palette from your website:

```javascript
COLORS = {
  PRIMARY_BLUE: 0x1e40af,      // #1e40af
  PRIMARY_LIGHT: 0x3b82f6,     // #3b82f6
  SECONDARY_TEAL: 0x0369a1,    // #0369a1
  ACCENT_CYAN: 0x00d9ff,       // #00d9ff
  SUCCESS_GREEN: 0x10b981,     // #10b981
  WARNING_AMBER: 0xf59e0b,     // #f59e0b
  BG_DARK: 0x111827,           // #111827
  BG_LIGHTER: 0x1f2937         // #1f2937
}
```

---

## Scene Components

### 1. Camera
```javascript
PerspectiveCamera
- FOV: 60°
- Near plane: 0.1
- Far plane: 100
- Position: (0, 1.6, 4)
```

### 2. Renderer
```javascript
WebGLRenderer
- Antialias: true
- Device pixel ratio: up to 1.8
- Tone mapping: ACES Filmic
- Shadow mapping: Enabled
```

### 3. Controls
```javascript
OrbitControls
- Auto rotate: true (0.3 speed)
- Min distance: 2.5
- Max distance: 6
- Pan disabled
- Damping: 0.05
```

### 4. Lighting Setup

**Ambient Light**
```
Color: White (#ffffff)
Intensity: 0.4
Purpose: Soft overall illumination
```

**Key Light**
```
Color: Light Blue (#3b82f6)
Intensity: 1.2
Position: (5, 6, 4)
Shadows: Enabled (2048x2048)
Purpose: Main directional light
```

**Rim Light**
```
Color: Cyan (#00d9ff)
Intensity: 1.5
Range: 15 units
Position: (-4, 2, -3)
Purpose: Edge/rim highlighting
```

**Fill Light**
```
Color: Teal (#0369a1)
Intensity: 0.8
Range: 12 units
Position: (4, 1, -2)
Purpose: Depth and shadow fill
```

---

## Interactive Features

### Click to Create Plants

```javascript
// Click detection
canvas.addEventListener("click", (e) => {
  // Calculate mouse position
  // Raycast from camera
  // If hits earth, create plant at intersection
});
```

**How it works:**
1. User clicks on canvas
2. Mouse position converted to 3D space
3. Raycaster checks for earth intersection
4. Plant spawned at hit point
5. Plant animates for 3 seconds then disappears

### Creating a Plant

```javascript
function createPlant(x, z) {
  // Create cylinder geometry
  // Apply green material
  // Position at coordinates
  // Add to scene
  // Track lifetime
}
```

---

## Animation Loop

The `animate()` function runs every frame:

### Earth Animation
```javascript
earth.rotation.y += 0.0006;  // Slow rotation
glow.rotation.y += 0.0003;   // Even slower glow
```

### Particle Animation
```javascript
// Update positions based on velocities
// Wrap particles that go out of bounds
// Maintain continuous motion
```

### Satellite Animation
```javascript
// Orbital motion
// Individual rotations
// Height variation based on orbit
```

### Plant Animation
```javascript
// Vertical scale oscillation
// Vertical position bobbing
// Lifetime tracking
// Auto-removal after 3 seconds
```

---

## Performance Optimizations

### Mobile Optimization
```javascript
if (window.innerWidth < 768) {
  // Reduce pixel ratio on mobile
  renderer.setPixelRatio(1);
  // Smaller particles
  particleMaterial.size = 0.008;
}
```

### Efficient Rendering
- Geometry reuse
- Instanced materials where possible
- Fog culling (far distance)
- Optimized particle count

### Responsive Handling
```javascript
window.addEventListener("resize", () => {
  // Update camera aspect ratio
  // Update renderer size
  // Maintain performance
});
```

---

## Customization Guide

### Change Earth Texture
```javascript
// Replace texture path
const earthTexture = new THREE.TextureLoader()
  .load("path/to/your/texture.jpg");
```

### Modify Particle Count
```javascript
const PARTICLE_COUNT = 2000;  // Change this number
// Higher = more visual density (may impact performance)
```

### Adjust Rotation Speed
```javascript
earth.rotation.y += 0.0006;  // Increase for faster rotation
```

### Change Satellite Speeds
```javascript
satellites.forEach((s) => {
  s.speed = 0.003;  // Adjust orbital speed
});
```

### Modify Colors
```javascript
COLORS.PRIMARY_BLUE = 0xnewcolor;  // Update hex code
// Automatically applied to scene
```

### Lighting Adjustments
```javascript
keyLight.intensity = 1.5;  // Increase/decrease brightness
rimLight.position.set(x, y, z);  // Move light source
```

---

## Troubleshooting

### Black Screen
- Check if canvas element exists with id="webgl"
- Verify Three.js is imported correctly
- Check browser console for errors

### Texture Not Loading
- Verify texture path is correct
- Check file exists in assets folder
- Fallback uses procedural gradient

### Poor Performance
- Reduce PARTICLE_COUNT
- Disable shadows: `renderer.shadowMap.enabled = false`
- Reduce pixel ratio: `renderer.setPixelRatio(1)`

### Controls Not Working
- Check OrbitControls import
- Verify mouse events are supported
- Test on different browsers

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari 15+, Chrome Android)

Requires WebGL support.

---

## File Size & Performance

- **Three.js:** ~550KB (included via CDN)
- **main2.js:** ~8KB
- **Performance:** 60 FPS on modern devices
- **Mobile:** Optimized for 30-60 FPS

---

## Scene Hierarchy

```
Scene
├── Camera
├── Lighting
│   ├── Ambient Light
│   ├── Key Light (directional)
│   ├── Rim Light (point)
│   └── Fill Light (point)
├── Earth
│   ├── Sphere Mesh
│   └── Atmospheric Glow
├── Particles
│   └── Points (2000 vertices)
├── Satellites (4)
│   ├── Satellite 1 (Blue)
│   ├── Satellite 2 (Cyan)
│   ├── Satellite 3 (Teal)
│   └── Satellite 4 (Green)
└── Plants (Dynamic)
    ├── Plant 1 (Animated)
    ├── Plant 2 (Animated)
    └── ... (max 20 at a time)
```

---

## Development Mode

### Local Testing
```bash
npm run dev
# Visit http://localhost:5000
# Open DevTools (F12) to see console
```

### Debug Mode
To add debugging:
```javascript
// Add to animate() function
console.log('FPS:', 1/deltaTime);
console.log('Plants:', plants.length);
```

---

## Future Enhancements

Potential additions:
- [ ] Particle system trails
- [ ] More interactive elements
- [ ] Data-driven particle generation
- [ ] Audio reactivity
- [ ] VR support
- [ ] Advanced shader effects
- [ ] Multiple earth layers
- [ ] Real-time data visualization

---

## Code Structure

```
main2.js
├── Color Palette Definition
├── Basic Setup (Scene, Camera)
├── Renderer Configuration
├── Controls Setup
├── Earth & Glow
├── Lighting System
├── Particle System
├── Satellites
├── Plants
├── Interaction (Click)
├── Animation Loop
├── Resize Handler
└── Performance Optimization
```

---

## API Reference

### Creating Plants
```javascript
createPlant(x, z)
// Creates a plant at world coordinates (x, z)
// Plant has 3-second lifespan
// Automatically removed after animation
```

### Accessing Scene Objects
```javascript
// Earth
earth.position
earth.rotation
earth.material

// Particles
particles.rotation
particleGeometry.attributes.position

// Satellites
satellites[0].mesh
satellites[0].angle
satellites[0].speed
```

---

## Performance Tips

1. **Reduce Particles:** Lower PARTICLE_COUNT for better performance
2. **Disable Shadows:** Set `renderer.shadowMap.enabled = false`
3. **Reduce Lights:** Remove fill or rim light if needed
4. **Simplify Geometry:** Use lower geometry subdivisions
5. **Optimize Textures:** Use smaller, compressed images

---

## Credits

- Three.js: Advanced 3D graphics library
- OrbitControls: Camera rotation system
- Professional color scheme: Pearlmeen Media design system

---

**Version:** 1.0
**Last Updated:** January 8, 2025
**Status:** Production Ready ✨
