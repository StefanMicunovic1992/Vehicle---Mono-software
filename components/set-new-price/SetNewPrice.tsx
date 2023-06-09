'use client';

import React, { useState, ChangeEvent } from 'react';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';

interface SetNewPriceProps {
  id: string;
  setShowOrHideNewPrice: React.Dispatch<React.SetStateAction<boolean>>;
}

function SetNewPrice({ id, setShowOrHideNewPrice }: SetNewPriceProps) {
  const vehiclesStore = useVehiclesStore();
  const [newPrice, setNewPrice] = useState<string>('');

  const updatePrice = () => {
    if (newPrice !== '') {
      vehiclesStore.newPrice(+newPrice, id);
      setShowOrHideNewPrice(false);
      setNewPrice('');
    }
  };

  const hendleNewPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[0-9\b]+$/;

    if (inputValue === '' || regex.test(inputValue)) {
      setNewPrice(inputValue);
    }
  };
  return (
    <div className="newPrice">
      <input
        type="text"
        placeholder="set new price"
        value={newPrice}
        onChange={(e) => hendleNewPrice(e)}
      />
      <button type="button" onClick={updatePrice}>
        Save
      </button>
      <button type="button" onClick={() => setShowOrHideNewPrice(false)}>
        Close
      </button>
    </div>
  );
}

export default observer(SetNewPrice);
