'use client';

import * as React from 'react';

import type { Model } from '@/types';

type ModelState = { models: Model[]; model: Model; setModelId: (id: string) => void };

const ModelContext = React.createContext<ModelState | null>(null);

/** The model the next message goes to; shared by the composer's picker and the mobile header. */
export function ModelProvider({ models, children }: { models: Model[]; children: React.ReactNode }) {
  const [modelId, setModelId] = React.useState(models[0]?.id);
  const value = React.useMemo<ModelState>(() => {
    const model = models.find((m) => m.id === modelId) ?? models[0];
    if (!model) throw new Error('ModelProvider needs at least one model');
    return { models, model, setModelId };
  }, [models, modelId]);
  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}

export function useModel() {
  const ctx = React.useContext(ModelContext);
  if (!ctx) throw new Error('useModel must be used inside <ModelProvider>');
  return ctx;
}
