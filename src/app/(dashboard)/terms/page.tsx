import { RiFileTextLine } from '@remixicon/react';
import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/placeholder-page';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <PlaceholderPage icon={RiFileTextLine} title='Terms & Conditions'>
      Your terms of service go here.
    </PlaceholderPage>
  );
}
