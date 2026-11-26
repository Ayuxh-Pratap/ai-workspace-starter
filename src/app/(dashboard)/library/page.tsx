import { RiBookOpenLine } from '@remixicon/react';
import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/placeholder-page';

export const metadata: Metadata = { title: 'Library' };

export default function LibraryPage() {
  return (
    <PlaceholderPage icon={RiBookOpenLine} title='Library'>
      Saved prompts, files and generated images will live here. Build it in src/app/(dashboard)/library.
    </PlaceholderPage>
  );
}
