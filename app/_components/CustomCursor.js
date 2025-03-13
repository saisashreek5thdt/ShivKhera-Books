// components/CustomCursor.js
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { vec2 } from 'vecteur';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverEl, setHoverEl] = useState(null);

  const position = {
    previous: vec2(-100, -100),
    current: vec2(-100, -100),
    target: vec2(-100, -100),
    lerpAmount: 0.1,
  };

  const scale = {
    previous: 1,
    current: 1,
    target: 1,
    lerpAmount: 0.1,
  };

  useEffect(() => {
    const cursor = cursorRef.current;

    // Update the cursor position and scale
    const updateCursor = () => {
      position.current.lerp(position.target, position.lerpAmount);
      scale.current = gsap.utils.interpolate(scale.current, scale.target, scale.lerpAmount);
      const delta = position.current.clone().sub(position.previous);
      position.previous.copy(position.current);
      scale.previous = scale.current;

      gsap.set(cursor, {
        x: position.current.x,
        y: position.current.y,
      });

      if (!isHovered) {
        const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
        const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04;

        gsap.set(cursor, {
          rotate: angle,
          scaleX: scale.current + Math.min(distance, 1),
          scaleY: scale.current - Math.min(distance, 0.3),
        });
      }
    };

    // Update the target position of the cursor
    const updateTargetPosition = (x, y) => {
      if (isHovered && hoverEl) {
        const bounds = hoverEl.getBoundingClientRect();
        const cx = bounds.x + bounds.width / 2;
        const cy = bounds.y + bounds.height / 2;

        const dx = x - cx;
        const dy = y - cy;

        position.target.x = cx + dx * 0.15;
        position.target.y = cy + dy * 0.15;
        scale.target = 2;

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const distance = Math.sqrt(dx * dx + dy * dy) * 0.01;

        gsap.set(cursor, { rotate: angle });
        gsap.to(cursor, {
          scaleX: scale.target + Math.pow(Math.min(distance, 0.6), 3) * 3,
          scaleY: scale.target - Math.pow(Math.min(distance, 0.3), 3) * 3,
          duration: 0.5,
          ease: 'power4.out',
          overwrite: true,
        });
      } else {
        position.target.x = x;
        position.target.y = y;
        scale.target = 1;
      }
    };

    // Mouse move event listener
    const onMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;
      updateTargetPosition(x, y);
    };

    // Resize event listener
    const onResize = () => {
      const { x, y, width, height } = cursor.getBoundingClientRect();
      gsap.set(cursor, {
        left: x - width,
        top: y + height,
      });
    };

    // Add event listeners
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('resize', onResize);

    gsap.ticker.add(updateCursor);

    return () => {
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [isHovered, hoverEl]);

  // Hover listeners for hover elements
  const addHoverListeners = () => {
    document.querySelectorAll('[data-hover]').forEach((hoverEl) => {
      const hoverBoundsEl = hoverEl.querySelector('[data-hover-bounds]');
      hoverBoundsEl.addEventListener('pointerover', () => {
        setIsHovered(true);
        setHoverEl(hoverBoundsEl);
      });
      hoverBoundsEl.addEventListener('pointerout', () => {
        setIsHovered(false);
        setHoverEl(null);
      });

      // Magnetic effect on hover
      const xTo = gsap.quickTo(hoverEl, 'x', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      const yTo = gsap.quickTo(hoverEl, 'y', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });

      hoverEl.addEventListener('pointermove', (event) => {
        const { clientX: cx, clientY: cy } = event;
        const { height, width, left, top } = hoverEl.getBoundingClientRect();
        const x = cx - (left + width / 2);
        const y = cy - (top + height / 2);
        xTo(x * 0.2);
        yTo(y * 0.2);
      });

      hoverEl.addEventListener('pointerout', () => {
        xTo(0);
        yTo(0);
      });
    });
  };

  useEffect(() => {
    addHoverListeners();
  }, []);

  return (
    <div ref={cursorRef} className="cursor">
      {/* Custom cursor content here */}
    </div>
  );
};

export default CustomCursor;
