import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Composer } from '@/components/chat/composer';
import { ModelProvider } from '@/components/providers/model-provider';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

const models = [{ id: 'gpt-4', name: 'GPT-4', description: '' }];

function setup() {
  const onSend = vi.fn();
  render(
    <ModelProvider models={models}>
      <Composer onSend={onSend} />
    </ModelProvider>,
  );
  return { onSend, box: screen.getByRole('textbox', { name: 'Message' }) };
}

describe('Composer', () => {
  it('sends on Enter and clears the field', async () => {
    const { onSend, box } = setup();
    await userEvent.type(box, 'Hello{Enter}');
    expect(onSend).toHaveBeenCalledWith({ text: 'Hello', attachments: [], modelId: 'gpt-4' });
    expect(box).toHaveValue('');
  });
  it('keeps Shift+Enter as a line break', async () => {
    const { onSend, box } = setup();
    await userEvent.type(box, 'a{Shift>}{Enter}{/Shift}b');
    expect(onSend).not.toHaveBeenCalled();
    expect(box).toHaveValue('a\nb');
  });
  it('does not send an empty message', async () => {
    const { onSend } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSend).not.toHaveBeenCalled();
  });
});
