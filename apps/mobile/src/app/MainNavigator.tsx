import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BookOpen, Home, Library, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LibraryScreen } from '@/screens/library';
import { CoursesStack, HomeStack, ProfileStack } from '@/navigation/stacks';
import type { MainTabParamList } from '@/navigation/types';
import { colors, layout } from '@/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TABS = {
  HomeTab: { label: 'Home', Icon: Home },
  CoursesTab: { label: 'Courses', Icon: BookOpen },
  LibraryTab: { label: 'Library', Icon: Library },
  ProfileTab: { label: 'Profile', Icon: User },
} as const;

/** Home · Courses · Library · Profile — the 4-tab bar from the design. */
export function MainNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => {
        const { label, Icon } = TABS[route.name];
        return {
          headerShown: false,
          tabBarLabel: label,
          tabBarActiveTintColor: colors.primary[500],
          tabBarInactiveTintColor: colors.text.muted,
          tabBarIcon: ({ color, size }) => <Icon color={color} size={size} />,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarStyle: {
            height: layout.tabBarHeight + insets.bottom,
            paddingTop: 6,
            paddingBottom: insets.bottom + 6,
            backgroundColor: colors.background.card,
            borderTopColor: colors.border.DEFAULT,
          },
        };
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="CoursesTab" component={CoursesStack} />
      <Tab.Screen name="LibraryTab" component={LibraryScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}
