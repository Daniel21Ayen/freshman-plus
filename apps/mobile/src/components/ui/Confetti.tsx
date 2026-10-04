import React from 'react';
import { View } from 'react-native';

interface Piece { x: number; y: number; color: string; w: number; h: number; r: number; round?: boolean }

const PIECES: Piece[] = [
  { x: 14, y: 18, color: '#22C55E', w: 8, h: 8, r: 0, round: true },
  { x: 24, y: 34, color: '#F59E0B', w: 10, h: 4, r: 35 },
  { x: 10, y: 52, color: '#7C5CFA', w: 8, h: 4, r: -20 },
  { x: 30, y: 8, color: '#0067F1', w: 4, h: 10, r: 25 },
  { x: 82, y: 16, color: '#EC4899', w: 8, h: 8, r: 0, round: true },
  { x: 72, y: 34, color: '#0067F1', w: 10, h: 4, r: -30 },
  { x: 90, y: 50, color: '#F59E0B', w: 8, h: 4, r: 40 },
  { x: 66, y: 8, color: '#22C55E', w: 4, h: 10, r: -25 },
  { x: 40, y: 72, color: '#EC4899', w: 6, h: 6, r: 0, round: true },
  { x: 62, y: 76, color: '#7C5CFA', w: 10, h: 4, r: 20 },
];

/** Static confetti burst behind the success check. Decorative only. */
export function Confetti() {
  return (
    <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {PIECES.map((p, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%` as `${number}%`,
            top: `${p.y}%` as `${number}%`,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: p.round ? p.w / 2 : 2,
            transform: [{ rotate: `${p.r}deg` }],
          }}
        />
      ))}
    </View>
  );
}
