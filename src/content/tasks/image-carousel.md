---
title: Image Carousel
description: Build an image carousel with prev/next navigation, indicator dots, and auto-play
tags:
  - useState
  - useEffect
  - intervals
  - UI components
difficulty: medium
timeEstimate: 25
learningGoals:
  - Manage carousel state and navigation
  - Implement auto-play with useEffect cleanup
  - Handle edge cases (wrap around)
  - Build indicator dots with click navigation
hints:
  - Track currentIndex in state
  - Use modulo for wrapping (index + 1) % length
  - Clear interval on unmount and when paused
  - Pause auto-play on hover
starterCode: |
  import { useState, useEffect } from 'react';

  const images = [
    { id: 1, src: 'https://picsum.photos/id/10/600/400', alt: 'Forest' },
    { id: 2, src: 'https://picsum.photos/id/20/600/400', alt: 'Beach' },
    { id: 3, src: 'https://picsum.photos/id/30/600/400', alt: 'Mountains' },
    { id: 4, src: 'https://picsum.photos/id/40/600/400', alt: 'City' },
    { id: 5, src: 'https://picsum.photos/id/50/600/400', alt: 'Desert' },
  ];

  export default function App() {
    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Image Carousel</h1>
        <Carousel images={images} autoPlayInterval={3000} />
      </div>
    );
  }

  function Carousel({ images, autoPlayInterval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // TODO: Auto-play effect
    // useEffect(() => {
    //   if (!isPlaying) return;
    //   const interval = setInterval(() => {
    //     // Go to next slide
    //   }, autoPlayInterval);
    //   return () => clearInterval(interval);
    // }, [isPlaying, autoPlayInterval]);

    const goToNext = () => {
      // TODO: Go to next image (wrap around)
    };

    const goToPrev = () => {
      // TODO: Go to previous image (wrap around)
    };

    const goToSlide = (index) => {
      // TODO: Go to specific slide
    };

    return (
      <div
        style={{
          position: 'relative',
          maxWidth: '600px',
          margin: '0 auto',
        }}
        // TODO: Pause on hover (onMouseEnter/Leave)
      >
        {/* Image */}
        <div style={{
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#f3f4f6',
        }}>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Prev/Next Buttons */}
        <button
          onClick={goToPrev}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          ←
        </button>
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          →
        </button>

        {/* Indicator Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '16px',
        }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: index === currentIndex ? '#3b82f6' : '#d1d5db',
                transition: 'background 0.2s',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <span style={{ marginLeft: '12px', color: '#6b7280' }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    );
  }
---

## Task

Build an image carousel with navigation controls, indicator dots, and auto-play functionality.

### Requirements

**Navigation:**
- Previous/Next buttons on sides
- Clicking dots jumps to that slide
- Wrap around at ends (after last → first, before first → last)

**Auto-play:**
- Automatically advance every 3 seconds
- Pause on hover
- Play/Pause button toggle
- Clean up interval on unmount

**Visual:**
- Smooth transitions
- Active dot highlighted
- Current slide counter (1/5)

### Example Behavior

1. Page loads: first image, auto-play starts
2. After 3s: advances to second image
3. Hover carousel: auto-play pauses
4. Mouse leave: auto-play resumes
5. Click next on last image: wraps to first
6. Click dot 3: jumps to image 3

### Bonus Challenges

- Add slide transition animation (fade or slide)
- Add swipe support for touch devices
- Add keyboard navigation (arrow keys)
- Preload adjacent images
- Add thumbnail strip below

### Testing Checklist

- [ ] Next/Prev buttons work
- [ ] Wraps around at ends
- [ ] Dots navigate correctly
- [ ] Active dot highlighted
- [ ] Auto-play advances slides
- [ ] Pause on hover works
- [ ] Play/Pause button works
- [ ] Counter shows correct position
