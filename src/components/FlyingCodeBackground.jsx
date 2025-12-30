import React, { useEffect, useRef } from 'react';
import { resumeData } from '../data/resumeData';

const FlyingCodeBackground = () => {
  const canvasRef = useRef(null);
  const drops = useRef([]);
  const dropStates = useRef([]);
  const activePopups = useRef([]);
  const lastSpawned = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const fontSize = 16;
    const drops = { current: [] };
    const dropStates = { current: [] }; // Track active word streams per column

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      // Recalculate columns based on new width
      const columns = Math.ceil(window.innerWidth / fontSize);

      // Adjust arrays without resetting existing progress
      if (columns > drops.current.length) {
        for (let i = drops.current.length; i < columns; i++) {
          drops.current[i] = Math.random() * -100;
          dropStates.current[i] = null;
        }
      } else {
        drops.current.length = columns;
        dropStates.current.length = columns;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Characters to use (Matrix-like katakana + latin)
    const chars = 'कृष्णABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*&^%$#@!~ァィイゥウガカォエェオゲケクギキゴサザシセズズダッツバノネヌニヒピフブホペプパポララマミユユヮロヴンヲワヵヶヷヸヹヾヽー・アകൃഷ്';

    // Active pop-out elements

    const draw = () => {
      try {
        const speed = resumeData.settings?.backgroundSpeed ?? 1.0;

        // I. Spawn New Pop-ups
        if (activePopups.current.length < 5 && Math.random() < 0.03) {
          const elements = resumeData.settings?.backgroundElements;
          // Reduced probability for words (0.15)
          const useWord = elements?.words?.length > 0 && Math.random() < 0.15;

          let textToDisplay;
          let attempts = 0;
          // Try up to 5 times to find a unique word/char not in recent history
          do {
            textToDisplay = useWord
              ? elements.words[Math.floor(Math.random() * elements.words.length)]
              : (elements?.chars?.length > 0
                ? elements.chars[Math.floor(Math.random() * elements.chars.length)]
                : chars.charAt(Math.floor(Math.random() * chars.length)));
            attempts++;
          } while (lastSpawned.current.includes(textToDisplay) && attempts < 5);

          // Update history
          lastSpawned.current.push(textToDisplay);
          if (lastSpawned.current.length > 5) lastSpawned.current.shift();

          console.log('Spawning popup:', textToDisplay, 'useWord:', useWord);

          activePopups.current.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            text: textToDisplay,
            scale: 1,
            growing: true,
            maxScale: 2 + Math.random() * 2,
            color: Math.random() > 0.5 ? '#38bdf8' : '#818cf8',
            wait: 30 + Math.random() * 30, // Reduced wait time (0.5s - 1s)
            alpha: 1.0
          });
        }

        // II. Update & Filter Pop-ups
        activePopups.current.forEach(popup => {
          if (!popup) return;
          if (popup.growing) {
            popup.scale += 0.8;
            if (popup.scale >= popup.maxScale) {
              popup.scale = popup.maxScale;
              popup.growing = false;
            }
          } else if (popup.wait > 0) {
            popup.wait--;
          } else {
            popup.alpha -= 0.015;
            popup.scale -= 0.05;
            if (popup.scale < 0) popup.scale = 0; // Prevent negative scale
          }
        });

        // Remove invisible/finished popups
        activePopups.current = activePopups.current.filter(p => p && p.alpha > 0 && p.scale > 0);


        // III. Render Layers
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        // 1. Semi-transparent black fade for trail effect
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // 2. Draw "Void" underneath each popup
        activePopups.current.forEach(popup => {
          if (!popup || !popup.text) return;
          ctx.save();
          ctx.translate(popup.x, popup.y);

          ctx.font = `900 ${Math.max(0, fontSize * popup.scale)}px monospace`;
          const metrics = ctx.measureText(popup.text);
          const textWidth = metrics.width;

          const radius = Math.max(0, fontSize * popup.scale * 1.5); // Ensure positive radius
          if (radius > 0) {
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            gradient.addColorStop(0, `rgba(15, 23, 42, ${popup.alpha * 0.8})`);
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            // Prevent division by zero or negative scaleX
            const scaleBase = Math.max(0.1, fontSize * popup.scale * 0.6);
            const scaleX = Math.max(1, textWidth / scaleBase);
            ctx.scale(scaleX, 1);
            ctx.arc(0, 0, radius / scaleX, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });

        // 3. Draw Code Rain
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.current.length; i++) {
          const x = i * fontSize;
          const yCoord = Math.floor(drops.current[i]);
          const y = yCoord * fontSize;

          if (y >= 0) {
            let charToDraw = '';
            const state = dropStates.current[i];

            if (state && state.word) {
              charToDraw = state.word[state.charIndex];
              ctx.fillStyle = '#7dd3fc';
            } else {
              charToDraw = chars.charAt(Math.floor(Math.random() * chars.length));
              ctx.fillStyle = '#0ea5e9';
            }

            ctx.fillText(charToDraw, x, y);

            if (state && state.word) {
              state.charIndex = (state.charIndex + 1) % state.word.length;
            }
          }

          if (y > window.innerHeight && Math.random() > 0.975) {
            drops.current[i] = 0;
            const elements = resumeData.settings?.backgroundElements;
            if (elements?.words?.length > 0 && Math.random() < 0.04) {
              dropStates.current[i] = {
                word: elements.words[Math.floor(Math.random() * elements.words.length)],
                charIndex: 0
              };
            } else {
              dropStates.current[i] = null;
            }
          }
          drops.current[i] += speed;
        }

        // 4. Draw Pop-out Character/Word on top of the rain
        activePopups.current.forEach(popup => {
          if (!popup || !popup.text || !popup.color) return;
          ctx.save();
          ctx.translate(popup.x, popup.y);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.font = `900 ${fontSize * popup.scale}px monospace`;
          ctx.shadowColor = popup.color;
          ctx.shadowBlur = 25 * popup.alpha;

          const r = parseInt(popup.color.slice(1, 3), 16);
          const g = parseInt(popup.color.slice(3, 5), 16);
          const b = parseInt(popup.color.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${popup.alpha})`;
          ctx.fillText(popup.text, 0, 0);

          if (popup.scale > 2) {
            ctx.fillStyle = `rgba(255, 255, 255, ${popup.alpha})`;
            ctx.shadowBlur = 0;
            ctx.fillText(popup.text, 0, 0);
          }
          ctx.restore();
        });

      } catch (error) {
        console.error("Frame error:", error);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    try {
      draw();
    } catch (e) {
      console.error("Animation Loop Crash:", e);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: 0.15 // Slightly more visible
      }}
    />
  );
};

export default FlyingCodeBackground;
