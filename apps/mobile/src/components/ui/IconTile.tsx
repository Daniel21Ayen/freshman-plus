import React from 'react';
import { View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

export interface IconTileProps {
  icon: LucideIcon;
  color: string;
  bg: string;
  size?: number;
  radius?: number;
}

export function IconTile({ icon: Icon, color, bg, size = 40, radius = 12 }: IconTileProps) {
  return (
    <View style={{ width: size, height: size, borderRadius: radius, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={Math.round(size * 0.5)} color={color} strokeWidth={2} />
    </View>
  );
}
