/** 4pt grid */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const layout = {
  /** Mobile screen horizontal padding used across the designs */
  screenPadding: 16,
  /** Primary button / input height on mobile */
  controlHeight: 48,
  tabBarHeight: 64,
  /** Admin portal */
  adminSidebarWidth: 232,
  adminHeaderHeight: 64,
} as const;
