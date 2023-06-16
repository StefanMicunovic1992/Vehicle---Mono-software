'use client';

import React, { useState } from 'react';
import './SetNewPrice.scss';
import { useVehiclesStore } from '@/common/store/store';
import { observer } from 'mobx-react';
import TextField from '@mui/material/TextField';
import { BsCheck } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

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

  const hendleNewPrice = (e: any) => {
    const inputValue = e.target.value;
    const regex = /^[0-9\b]+$/;

    if (inputValue === '' || regex.test(inputValue)) {
      setNewPrice(inputValue);
    }
  };
  return (
    <div className="newPrice">
      {/* <input type="text" placeholder="set new price" value={newPrice} onChange={(e) => hendleNewPrice(e)} /> */}
      <TextField required margin="dense" label="Set new price" fullWidth variant="standard" value={newPrice} onChange={(e) => hendleNewPrice(e)} />
      <BsCheck onClick={updatePrice} className="newPriceIcon confirm" />
      <AiOutlineClose onClick={() => setShowOrHideNewPrice(false)} className="newPriceIcon close" />
    </div>
  );
}

export default observer(SetNewPrice);
