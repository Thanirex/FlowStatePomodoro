# 📁 Custom Assets Guide

This folder contains customizable assets for your Flow Mode app.

## 🔔 Notification Sounds

**Location:** `public/assets/sounds/`

### Adding Your Custom Notification Sound

1. **Prepare your audio file:**
   - Supported formats: `.mp3`, `.wav`, `.ogg`
   - Recommended duration: 2-3 seconds
   - Keep file size small (<500KB) for faster loading

2. **Replace the placeholder:**
   - Delete or rename `notification.mp3`
   - Add your sound file named `notification.mp3` (or update the path in Timer.tsx)

3. **Suggested sounds:**
   - Gentle bell chime
   - Singing bowl
   - Nature sounds (bird chirp, water drop)
   - Soft gong

### Free Sound Resources

- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [Mixkit](https://mixkit.co/free-sound-effects/)

---

## 🖼️ Background Images

**Location:** `public/assets/images/`

### Adding Your Custom Background

1. **Prepare your image:**
   - Supported formats: `.jpg`, `.png`, `.webp`
   - Recommended size: 1920x1080 or higher
   - Keep file size optimized (<500KB using compression)

2. **Replace the placeholder:**
   - Add your image named `background.jpg` (or update the filename in `app/page.tsx`)

3. **Suggested themes:**
   - Japanese mountain landscapes
   - Cherry blossoms
   - Zen gardens
   - Minimalist nature scenes
   - Soft gradients

### Free Image Resources

- [Unsplash](https://unsplash.com/) - Search "japanese landscape", "zen garden"
- [Pexels](https://www.pexels.com/)
- [Pixabay](https://pixabay.com/)

### Image Optimization

Before adding images, optimize them:
```bash
# Using online tools:
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)

# Or install Sharp for local optimization:
npm install -g sharp-cli
npx sharp -i background.jpg -o background-optimized.jpg --quality 85
```

---

## 🎨 Current Setup

- **Notification Sound:** `sounds/notification.mp3`
- **Background Image:** `images/background.jpg`
- **Image Opacity:** 0.3 (configurable in `app/page.tsx`)

## 🔧 Advanced Customization

To use different filenames, update these files:

**For notification sound:**
- Edit: `components/Timer.tsx` (line ~80)

**For background image:**
- Edit: `app/page.tsx` (look for background image section)
