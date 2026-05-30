import { useState } from 'react';

import { Button } from '@components/Button';
import { NumericBox } from '@components/NumericBox';

import './index.css';

export interface CreationBlockProps {
  maxCount: number;
  onCreate: (quantity: number) => void;
  className?: string;
  disabled?: boolean;
}

export function CreationBlock({
  maxCount,
  onCreate,
  className,
  disabled = false,
}: CreationBlockProps) {
  const effectiveMax = Math.max(0, maxCount);
  const min = effectiveMax > 0 ? 1 : 0;
  const [rawQuantity, setRawQuantity] = useState(min);
  const quantity =
    effectiveMax <= 0
      ? 0
      : Math.min(Math.max(rawQuantity, 1), effectiveMax);

  const canCreate = !disabled && effectiveMax > 0 && quantity > 0;
  const classes =
    'creation-block grid min-w-0 grid-cols-[minmax(0,1fr)_var(--creation-create-max-width)] items-stretch gap-3' +
    (className ? ' ' + className : '');

  function handleCreate() {
    if (!canCreate) return;
    onCreate(quantity);
  }

  return (
    <div className={classes}>
      <NumericBox
        className="min-w-0 w-full"
        value={quantity}
        onChange={setRawQuantity}
        min={min}
        max={effectiveMax}
      />
      <Button
        className="create"
        disabled={!canCreate}
        onClick={handleCreate}
      >
        Create
      </Button>
    </div>
  );
}
