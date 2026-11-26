'use client';

import * as React from 'react';

import { SettingsBody, SettingsGroup, SettingsRow, SettingsSwitch } from '@/components/settings/settings-primitives';
import * as Label from '@/components/ui/label';
import * as Radio from '@/components/ui/radio';
import * as Select from '@/components/ui/select';
import type { User } from '@/types';

const responseLength = {
  id: 'response-length',
  label: 'Response length',
  description: 'Preferred length of AI responses',
  options: [
    { id: 'short', value: 'short', label: 'Short' },
    { id: 'balanced', value: 'balanced', label: 'Balanced' },
    { id: 'detailed', value: 'detailed', label: 'Detailed' },
  ],
};

const creativityLevel = {
  id: 'creativity-level',
  label: 'Creativity level',
  description: 'How creative responses should be',
  options: [
    { id: 'conservative', value: 'conservative', label: 'Conservative' },
    { id: 'balanced', value: 'balanced', label: 'Balanced' },
    { id: 'creative', value: 'creative', label: 'Creative' },
  ],
};

const modelOptions = [
  { value: 'claude-v4', label: 'Claude V4' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
];

function RadioSetting({
  setting,
  value,
  onValueChange,
  className,
}: {
  setting: typeof responseLength;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={className ?? 'flex flex-col gap-5'}>
      <div className='flex flex-col gap-1'>
        <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{setting.label}</div>
        <div className='text-label-xs text-text-soft-400 lg:text-label-sm'>{setting.description}</div>
      </div>
      <div className='flex'>
        <Radio.Group value={value} onValueChange={onValueChange} className='flex gap-6'>
          {setting.options.map((option) => {
            // Both groups have a "balanced" option: the id is prefixed so each label points at its own radio.
            const id = `${setting.id}-${option.id}`;
            return (
              <div key={option.id} className='group/radio flex items-center gap-1.5'>
                <Radio.Item value={option.value} id={id} />
                <Label.Root
                  htmlFor={id}
                  className='cursor-pointer text-label-sm text-text-sub-600 group-has-[[data-state=checked]]/radio:text-text-sub-600'
                >
                  {option.label}
                </Label.Root>
              </div>
            );
          })}
        </Radio.Group>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function AiSettings({ user }: { user: User }) {
  const [state, setState] = React.useState({
    responseLength: 'short',
    creativityLevel: 'balanced',
    contentFiltering: false,
    aiModel: 'claude-v4',
    autoSuggestions: true,
  });
  const set = <K extends keyof typeof state>(key: K, value: (typeof state)[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  return (
    <SettingsBody>
      <SettingsGroup
        first
        title='Response behavior'
        description='Customize AI response style and tone.'
        contentClassName='gap-4 lg:gap-5'
      >
        <RadioSetting
          setting={responseLength}
          value={state.responseLength}
          onValueChange={(v) => set('responseLength', v)}
        />
        <RadioSetting
          setting={creativityLevel}
          value={state.creativityLevel}
          onValueChange={(v) => set('creativityLevel', v)}
          className='flex flex-col gap-5 border-t border-stroke-soft-200 pt-5'
        />
      </SettingsGroup>

      <SettingsGroup
        title='Content preferences'
        description='Control AI content and filtering.'
        className='lg:border-t-0'
        contentClassName='gap-4 lg:gap-5'
      >
        <SettingsRow label='Content filtering' description='Filter inappropriate content' className='gap-0'>
          <SettingsSwitch checked={state.contentFiltering} onCheckedChange={(v) => set('contentFiltering', v)} />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup
        title='Model settings'
        description='AI model and performance options.'
        className='lg:border-t-0'
        contentClassName='gap-4 lg:gap-5'
      >
        <SettingsRow label='AI Model' description='Choose your preferred AI model' stack>
          <Select.Root size='xsmall' value={state.aiModel} onValueChange={(v) => set('aiModel', v)}>
            <Select.Trigger className='w-full text-paragraph-sm text-text-sub-600 lg:w-auto'>
              <Select.Value placeholder={state.aiModel} />
            </Select.Trigger>
            <Select.Content className='z-62'>
              {modelOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </SettingsRow>
        <SettingsRow
          label='Auto-suggestions'
          description='Show suggested follow-up questions'
          className='gap-0 border-t border-stroke-soft-200 pt-5'
        >
          <SettingsSwitch checked={state.autoSuggestions} onCheckedChange={(v) => set('autoSuggestions', v)} />
        </SettingsRow>
      </SettingsGroup>
    </SettingsBody>
  );
}
