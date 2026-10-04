import React from 'react';
import { Download } from 'lucide-react-native';
import { EmptyState, Screen } from '@/components/ui';

export function LibraryScreen() {
  return (
    <Screen title="Library" subtitle="Downloads & saved content">
      <EmptyState icon={Download} title="Nothing downloaded yet" message="Notes and exams you download will be available here, even offline." />
    </Screen>
  );
}
