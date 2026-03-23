'use client';

import React from 'react';

// Shared keyframes injected once
const sharedStyles = `
@keyframes float-up {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.15; }
  90% { opacity: 0.15; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}
@keyframes drift-right {
  0% { transform: translateX(-10%) translateY(0); }
  50% { transform: translateX(10%) translateY(-8px); }
  100% { transform: translateX(-10%) translateY(0); }
}
@keyframes dash-move {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -200; }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.06; transform: scale(1); }
  50% { opacity: 0.12; transform: scale(1.05); }
}
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes drive-road {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
@keyframes drive-left {
  0% { transform: translateX(calc(100vw + 80px)); }
  100% { transform: translateX(-80px); }
}
@keyframes drive-right {
  0% { transform: translateX(-80px) scaleX(-1); }
  100% { transform: translateX(calc(100vw + 80px)) scaleX(-1); }
}
`;

function InjectStyles() {
  return <style dangerouslySetInnerHTML={{ __html: sharedStyles }} />;
}

// ============================================================
// About Section - Curved road path with moving dashes
// ============================================================
export function AboutBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <path id="aboutRoad1" d="M-50,100 Q200,50 400,200 T800,150 T1200,250 T1600,100" />
          <path id="aboutRoad2" d="M-50,400 Q300,350 500,500 T900,400 T1400,550 T1800,350" />
        </defs>
        {/* Road 1 - surface */}
        <use href="#aboutRoad1" fill="none" stroke="currentColor" className="text-primary/[0.06]" strokeWidth="80" strokeLinecap="round" />
        {/* Road 1 - center dashes */}
        <use href="#aboutRoad1" fill="none" stroke="currentColor" className="text-primary/[0.08]" strokeWidth="3" strokeDasharray="20 15" style={{ animation: 'dash-move 8s linear infinite' }} />

        {/* Road 2 - surface */}
        <use href="#aboutRoad2" fill="none" stroke="currentColor" className="text-secondary/[0.05]" strokeWidth="60" strokeLinecap="round" />
        {/* Road 2 - center dashes */}
        <use href="#aboutRoad2" fill="none" stroke="currentColor" className="text-secondary/[0.07]" strokeWidth="2" strokeDasharray="16 12" style={{ animation: 'dash-move 10s linear infinite' }} />
      </svg>
      {/* Subtle steering wheel silhouettes */}
      <svg className="absolute top-12 right-12 w-32 h-32 text-primary/[0.04]" style={{ animation: 'spin-slow 30s linear infinite' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="50" y1="10" x2="50" y2="40" stroke="currentColor" strokeWidth="4" />
        <line x1="14" y1="70" x2="40" y2="55" stroke="currentColor" strokeWidth="4" />
        <line x1="86" y1="70" x2="60" y2="55" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  );
}

// ============================================================
// Pricing Section - Floating traffic signs & speedometer arcs
// ============================================================
export function PricingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Speedometer arcs */}
      <svg className="absolute -bottom-20 -left-20 w-80 h-80 text-primary/[0.04]" viewBox="0 0 200 200">
        <path d="M30,170 A80,80 0 0,1 170,170" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M50,155 A60,60 0 0,1 150,155" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 6" style={{ animation: 'dash-move 6s linear infinite' }} />
        <line x1="35" y1="170" x2="25" y2="170" stroke="currentColor" strokeWidth="2" />
        <line x1="46" y1="133" x2="40" y2="124" stroke="currentColor" strokeWidth="2" />
        <line x1="73" y1="107" x2="70" y2="97" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="105" x2="100" y2="95" stroke="currentColor" strokeWidth="2" />
        <line x1="127" y1="107" x2="130" y2="97" stroke="currentColor" strokeWidth="2" />
        <line x1="154" y1="133" x2="160" y2="124" stroke="currentColor" strokeWidth="2" />
        <line x1="165" y1="170" x2="175" y2="170" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg className="absolute -top-10 -right-10 w-64 h-64 text-secondary/[0.05]" viewBox="0 0 200 200">
        <path d="M30,170 A80,80 0 0,1 170,170" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M50,155 A60,60 0 0,1 150,155" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" style={{ animation: 'dash-move 8s linear infinite' }} />
      </svg>
      {/* Floating traffic sign shapes */}
      {[
        { top: '15%', left: '8%', size: 40, delay: 0 },
        { top: '60%', right: '5%', size: 36, delay: 2 },
        { top: '80%', left: '45%', size: 30, delay: 4 },
      ].map((pos, i) => (
        <svg key={i} className="absolute text-primary/[0.04]" style={{ top: pos.top, left: pos.left, right: pos.right, width: pos.size, height: pos.size, animation: `drift-right ${6 + i * 2}s ease-in-out infinite`, animationDelay: `${pos.delay}s` }} viewBox="0 0 40 40">
          {i % 2 === 0 ? (
            // Diamond sign
            <rect x="5" y="5" width="30" height="30" rx="3" transform="rotate(45 20 20)" fill="none" stroke="currentColor" strokeWidth="3" />
          ) : (
            // Round sign
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
          )}
        </svg>
      ))}
    </div>
  );
}

// ============================================================
// Statistics Section - Animated highway lanes
// ============================================================
export function StatisticsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Horizontal highway lanes */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1400 400">
        {/* Lane markings flowing left to right */}
        <line x1="0" y1="80" x2="1400" y2="80" stroke="white" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.08" style={{ animation: 'dash-move 4s linear infinite' }} />
        <line x1="0" y1="200" x2="1400" y2="200" stroke="white" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.08" style={{ animation: 'dash-move 3s linear infinite' }} />
        <line x1="0" y1="320" x2="1400" y2="320" stroke="white" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.08" style={{ animation: 'dash-move 5s linear infinite' }} />
        {/* Side lines */}
        <line x1="0" y1="0" x2="1400" y2="0" stroke="white" strokeWidth="2" opacity="0.05" />
        <line x1="0" y1="400" x2="1400" y2="400" stroke="white" strokeWidth="2" opacity="0.05" />
      </svg>
      {/* Car silhouettes */}
      {[
        { top: '20%', delay: 0, dir: 1 },
        { top: '55%', delay: 3, dir: -1 },
        { top: '78%', delay: 6, dir: 1 },
      ].map((car, i) => (
        <div key={i} className="absolute" style={{ top: car.top, left: '-5%', animation: `dash-move ${12 + i * 4}s linear infinite reverse`, opacity: 0.06 }}>
          <svg width="50" height="20" viewBox="0 0 50 20" fill="white" style={{ transform: car.dir === -1 ? 'scaleX(-1)' : undefined }}>
            <rect x="5" y="8" width="40" height="10" rx="3" />
            <rect x="15" y="2" width="20" height="10" rx="3" />
            <circle cx="14" cy="18" r="3" fill="rgba(255,255,255,0.5)" />
            <circle cx="38" cy="18" r="3" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Gallery Section - Tire track patterns
// ============================================================
export function GalleryBackground() {
  const lanes = [
    { y: '18%', direction: 'left' as const },
    { y: '38%', direction: 'right' as const },
    { y: '62%', direction: 'left' as const },
    { y: '82%', direction: 'right' as const },
  ];

  const vehicles = [
    // Lane 1 — left
    { lane: 0, type: 'sedan' as const, duration: 18, delay: 0 },
    { lane: 0, type: 'hatchback' as const, duration: 22, delay: 8 },
    // Lane 2 — right
    { lane: 1, type: 'suv' as const, duration: 20, delay: 2 },
    { lane: 1, type: 'truck' as const, duration: 26, delay: 14 },
    // Lane 3 — left
    { lane: 2, type: 'sedan' as const, duration: 16, delay: 5 },
    { lane: 2, type: 'suv' as const, duration: 24, delay: 13 },
    // Lane 4 — right
    { lane: 3, type: 'hatchback' as const, duration: 21, delay: 3 },
    { lane: 3, type: 'truck' as const, duration: 28, delay: 16 },
  ];

  const carSvg = (type: 'sedan' | 'hatchback' | 'suv' | 'truck') => {
    switch (type) {
      case 'sedan':
        return (
          <svg width="60" height="22" viewBox="0 0 60 22" fill="currentColor">
            <rect x="4" y="9" width="52" height="11" rx="3" />
            <rect x="14" y="2" width="26" height="11" rx="4" />
            <circle cx="16" cy="20" r="3.5" opacity="0.5" />
            <circle cx="46" cy="20" r="3.5" opacity="0.5" />
            <rect x="54" y="11" width="4" height="3" rx="1" opacity="0.6" />
          </svg>
        );
      case 'hatchback':
        return (
          <svg width="50" height="22" viewBox="0 0 50 22" fill="currentColor">
            <rect x="3" y="9" width="44" height="11" rx="3" />
            <path d="M12,9 L16,2 L34,2 L38,9" />
            <circle cx="14" cy="20" r="3.5" opacity="0.5" />
            <circle cx="38" cy="20" r="3.5" opacity="0.5" />
            <rect x="45" y="11" width="3" height="3" rx="1" opacity="0.6" />
          </svg>
        );
      case 'suv':
        return (
          <svg width="66" height="26" viewBox="0 0 66 26" fill="currentColor">
            <rect x="4" y="10" width="58" height="14" rx="3" />
            <rect x="10" y="2" width="36" height="12" rx="3" />
            <circle cx="18" cy="24" r="4" opacity="0.5" />
            <circle cx="52" cy="24" r="4" opacity="0.5" />
            <rect x="60" y="13" width="4" height="3" rx="1" opacity="0.6" />
          </svg>
        );
      case 'truck':
        return (
          <svg width="74" height="26" viewBox="0 0 74 26" fill="currentColor">
            <rect x="4" y="8" width="66" height="16" rx="3" />
            <rect x="50" y="2" width="18" height="10" rx="3" />
            <circle cx="18" cy="24" r="4" opacity="0.5" />
            <circle cx="38" cy="24" r="4" opacity="0.5" />
            <circle cx="58" cy="24" r="4" opacity="0.5" />
            <rect x="68" y="12" width="4" height="3" rx="1" opacity="0.6" />
          </svg>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />

      {/* 4-lane track */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1400 800">
        {/* Road surface */}
        <rect x="0" y="100" width="1400" height="600" fill="currentColor" className="text-gray-200" opacity="0.25" />

        {/* Outer edges — solid white */}
        <line x1="0" y1="100" x2="1400" y2="100" stroke="currentColor" className="text-gray-400" strokeWidth="3" opacity="0.12" />
        <line x1="0" y1="700" x2="1400" y2="700" stroke="currentColor" className="text-gray-400" strokeWidth="3" opacity="0.12" />

        {/* Center divider — double yellow */}
        <line x1="0" y1="398" x2="1400" y2="398" stroke="currentColor" className="text-yellow-500" strokeWidth="2" opacity="0.1" />
        <line x1="0" y1="402" x2="1400" y2="402" stroke="currentColor" className="text-yellow-500" strokeWidth="2" opacity="0.1" />

        {/* Lane dividers — dashed white */}
        <line x1="0" y1="250" x2="1400" y2="250" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.1" style={{ animation: 'dash-move 4s linear infinite' }} />
        <line x1="0" y1="550" x2="1400" y2="550" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.1" style={{ animation: 'dash-move 4s linear infinite reverse' }} />
      </svg>

      {/* Animated vehicles */}
      {vehicles.map((v, i) => {
        const lane = lanes[v.lane];
        const anim = lane.direction === 'left' ? 'drive-left' : 'drive-right';
        return (
          <div
            key={i}
            className="absolute text-gray-400"
            style={{
              top: lane.y,
              left: 0,
              opacity: 0.08,
              animation: `${anim} ${v.duration}s linear infinite`,
              animationDelay: `${v.delay}s`,
            }}
          >
            {carSvg(v.type)}
          </div>
        );
      })}

      {/* Floating camera shutter shapes for gallery theme */}
      <svg className="absolute bottom-10 right-10 w-24 h-24 text-gray-300" style={{ animation: 'pulse-slow 6s ease-in-out infinite' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.06" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.06" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.08" />
      </svg>
    </div>
  );
}

// ============================================================
// Testimonials Section - Floating road signs & speech bubbles
// ============================================================
export function TestimonialsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Floating elements */}
      {[
        { top: '10%', left: '5%', delay: 0, type: 'sign' },
        { top: '70%', left: '90%', delay: 3, type: 'sign' },
        { top: '30%', left: '85%', delay: 1, type: 'bubble' },
        { top: '75%', left: '10%', delay: 5, type: 'bubble' },
        { top: '50%', left: '50%', delay: 2, type: 'license' },
      ].map((el, i) => (
        <div key={i} className="absolute" style={{ top: el.top, left: el.left, animation: `drift-right ${7 + i}s ease-in-out infinite`, animationDelay: `${el.delay}s` }}>
          {el.type === 'sign' && (
            <svg width="40" height="52" viewBox="0 0 40 52" className="text-primary/[0.05]">
              <rect x="18" y="20" width="4" height="32" fill="currentColor" />
              <polygon points="20,0 38,14 20,28 2,14" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          )}
          {el.type === 'bubble' && (
            <svg width="44" height="36" viewBox="0 0 44 36" className="text-secondary/[0.06]">
              <rect x="2" y="2" width="40" height="24" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <polygon points="12,26 18,34 22,26" fill="currentColor" opacity="0.5" />
              <line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
              <line x1="10" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            </svg>
          )}
          {el.type === 'license' && (
            <svg width="48" height="32" viewBox="0 0 48 32" className="text-primary/[0.04]">
              <rect x="2" y="2" width="44" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="6" y="8" width="12" height="14" rx="2" fill="currentColor" opacity="0.3" />
              <line x1="22" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
              <line x1="22" y1="16" x2="36" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
              <line x1="22" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Instructors Section - ID badge & person silhouettes
// ============================================================
export function InstructorsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="instructorGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#instructorGrid)" />
      </svg>
      {/* Floating ID badge shapes */}
      {[
        { top: '12%', left: '6%', delay: 0 },
        { top: '65%', right: '8%', delay: 3 },
        { top: '80%', left: '40%', delay: 5 },
      ].map((pos, i) => (
        <svg key={i} className="absolute text-primary/[0.04]" style={{ top: pos.top, left: pos.left, right: pos.right, width: 48, height: 36, animation: `drift-right ${7 + i * 2}s ease-in-out infinite`, animationDelay: `${pos.delay}s` }} viewBox="0 0 48 36">
          <rect x="2" y="2" width="44" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.3" />
          <line x1="26" y1="12" x2="42" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="26" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="8" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        </svg>
      ))}
      {/* Subtle graduation cap */}
      <svg className="absolute top-16 right-16 w-24 h-24 text-secondary/[0.04]" style={{ animation: 'drift-right 10s ease-in-out infinite' }} viewBox="0 0 100 100">
        <polygon points="50,20 90,40 50,60 10,40" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="50" y1="60" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
        <line x1="80" y1="45" x2="80" y2="70" stroke="currentColor" strokeWidth="2" />
        <path d="M35,65 Q50,80 65,65" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ============================================================
// FAQ Section - Question marks & speech bubbles
// ============================================================
export function FAQBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Floating question marks */}
      {[
        { top: '8%', left: '4%', size: 36, delay: 0 },
        { top: '25%', right: '6%', size: 28, delay: 2 },
        { top: '60%', left: '8%', size: 32, delay: 4 },
        { top: '75%', right: '12%', size: 24, delay: 1 },
        { top: '45%', left: '85%', size: 30, delay: 3 },
      ].map((pos, i) => (
        <svg key={i} className="absolute text-primary/[0.05]" style={{ top: pos.top, left: pos.left, right: pos.right, width: pos.size, height: pos.size, animation: `drift-right ${6 + i * 1.5}s ease-in-out infinite`, animationDelay: `${pos.delay}s` }} viewBox="0 0 40 40">
          <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="32" fill="currentColor" fontWeight="bold">?</text>
        </svg>
      ))}
      {/* Light bulb shape */}
      <svg className="absolute bottom-20 left-[10%] w-16 h-24 text-secondary/[0.04]" style={{ animation: 'pulse-slow 5s ease-in-out infinite' }} viewBox="0 0 40 60">
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14,32 L14,28 Q20,24 26,28 L26,32" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="36" x2="26" y2="36" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="40" x2="24" y2="40" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="6" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="12" x2="36" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="12" x2="4" y2="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ============================================================
// Video Section - Film reel & play button shapes
// ============================================================
export function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Film strip along top edge */}
      <svg className="absolute top-0 left-0 w-full h-16 text-gray-300" preserveAspectRatio="none" viewBox="0 0 1400 60">
        <rect x="0" y="0" width="1400" height="60" fill="currentColor" opacity="0.03" />
        {Array.from({ length: 28 }).map((_, i) => (
          <rect key={i} x={i * 50 + 5} y="5" width="12" height="10" rx="2" fill="currentColor" opacity="0.04" />
        ))}
        {Array.from({ length: 28 }).map((_, i) => (
          <rect key={`b${i}`} x={i * 50 + 5} y="45" width="12" height="10" rx="2" fill="currentColor" opacity="0.04" />
        ))}
      </svg>
      {/* Play button circles */}
      {[
        { top: '20%', right: '5%', size: 48, delay: 0 },
        { top: '70%', left: '4%', size: 36, delay: 2 },
        { top: '85%', right: '30%', size: 28, delay: 4 },
      ].map((pos, i) => (
        <svg key={i} className="absolute text-primary/[0.04]" style={{ top: pos.top, left: pos.left, right: pos.right, width: pos.size, height: pos.size, animation: `pulse-slow ${5 + i * 2}s ease-in-out infinite`, animationDelay: `${pos.delay}s` }} viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <polygon points="20,15 38,25 20,35" fill="currentColor" opacity="0.4" />
        </svg>
      ))}
      {/* Film reel */}
      <svg className="absolute bottom-16 left-[8%] w-20 h-20 text-secondary/[0.04]" style={{ animation: 'spin-slow 25s linear infinite' }} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="40" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="12" r="5" fill="currentColor" opacity="0.3" />
        <circle cx="40" cy="68" r="5" fill="currentColor" opacity="0.3" />
        <circle cx="12" cy="40" r="5" fill="currentColor" opacity="0.3" />
        <circle cx="68" cy="40" r="5" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}

// ============================================================
// Blog Preview Section - Notebook & pen shapes
// ============================================================
export function BlogPreviewBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Notebook lines pattern */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="10%" y1={`${12 + i * 11}%`} x2="90%" y2={`${12 + i * 11}%`} stroke="currentColor" className="text-gray-300" strokeWidth="0.5" opacity="0.2" />
        ))}
      </svg>
      {/* Floating pen/pencil shapes */}
      {[
        { top: '15%', right: '6%', delay: 0, rotate: -30 },
        { top: '70%', left: '5%', delay: 3, rotate: 15 },
      ].map((pos, i) => (
        <svg key={i} className="absolute text-primary/[0.04]" style={{ top: pos.top, left: pos.left, right: pos.right, width: 40, height: 40, animation: `drift-right ${8 + i * 2}s ease-in-out infinite`, animationDelay: `${pos.delay}s`, transform: `rotate(${pos.rotate}deg)` }} viewBox="0 0 40 40">
          <rect x="14" y="4" width="12" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="14,32 20,38 26,32" fill="currentColor" opacity="0.4" />
          <line x1="14" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        </svg>
      ))}
      {/* Open book shape */}
      <svg className="absolute bottom-12 right-[10%] w-24 h-20 text-secondary/[0.04]" style={{ animation: 'drift-right 9s ease-in-out infinite', animationDelay: '1s' }} viewBox="0 0 100 80">
        <path d="M50,15 Q30,5 5,15 L5,70 Q30,60 50,70" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M50,15 Q70,5 95,15 L95,70 Q70,60 50,70" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="15" x2="50" y2="70" stroke="currentColor" strokeWidth="1.5" />
        <line x1="15" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="15" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="58" y1="30" x2="85" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="58" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}

// ============================================================
// Contact Section - Traffic light & road map pattern
// ============================================================
export function ContactBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <InjectStyles />
      {/* Traffic light */}
      <svg className="absolute top-20 right-[8%] w-16 h-44 text-primary/[0.05]" style={{ animation: 'drift-right 8s ease-in-out infinite' }} viewBox="0 0 40 110">
        <rect x="5" y="0" width="30" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="45" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="70" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="17" y="90" width="6" height="20" fill="currentColor" />
      </svg>
      {/* Map route lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M100,600 Q200,400 350,450 T600,300 T850,350 T1100,200"
          fill="none"
          stroke="currentColor"
          className="text-primary/[0.05]"
          strokeWidth="3"
          strokeDasharray="12 8"
          strokeLinecap="round"
          style={{ animation: 'dash-move 10s linear infinite' }}
        />
        {/* Location pins along the route */}
        {[
          { cx: 350, cy: 440 },
          { cx: 700, cy: 320 },
          { cx: 1000, cy: 230 },
        ].map((pin, i) => (
          <g key={i} className="text-primary/[0.06]">
            <circle cx={pin.cx} cy={pin.cy} r="6" fill="currentColor" />
            <path d={`M${pin.cx},${pin.cy - 20} a10,10 0 1,1 0,-1 Z`} fill="none" stroke="currentColor" strokeWidth="2" />
          </g>
        ))}
      </svg>
      {/* Subtle compass */}
      <svg className="absolute bottom-16 left-[6%] w-20 h-20 text-secondary/[0.05]" style={{ animation: 'spin-slow 40s linear infinite' }} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="40,10 44,38 40,42 36,38" fill="currentColor" opacity="0.6" />
        <polygon points="40,70 44,42 40,38 36,42" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}
