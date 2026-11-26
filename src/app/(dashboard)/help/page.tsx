import { RiQuestionAnswerLine } from '@remixicon/react';
import type { Metadata } from 'next';

import { PlaceholderPage } from '@/components/layout/placeholder-page';

export const metadata: Metadata = { title: 'Help' };

export default function HelpPage() {
  return (
    <PlaceholderPage icon={RiQuestionAnswerLine} title='Need help?'>
      Point this page at your docs, support form or status page.
    </PlaceholderPage>
  );
}
