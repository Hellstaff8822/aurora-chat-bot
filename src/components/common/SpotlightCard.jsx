import { useState, useRef, useEffect } from 'react';

function SpotlightCard({ children, className = '' }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current && isHovered) {
        try {
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePosition({ x, y });
        } catch (error) {
          console.error('Помилка обробки mouse move:', error);
        }
      }
    };

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className={`overflow-hidden relative rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none select-none"
        style={{
          background: `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none select-none"
        style={{
          background: `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.08), transparent 30%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 pointer-events-auto">{children}</div>
    </div>
  );
}

export default SpotlightCard;
