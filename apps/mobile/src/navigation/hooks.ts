import { useNavigation, type NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from './types';

/** Typed handle on the root navigator — lets any nested screen jump across stacks/tabs. */
export const useRootNavigation = () => useNavigation<NavigationProp<RootStackParamList>>();
