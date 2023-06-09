'use client';

import './Vehicle.scss';
import React, { useState } from 'react';
import Image from 'next/image';
import VehicleI from '@/common/interface/Vehicle';
import { observer } from 'mobx-react';
import { useVehiclesStore } from '@/common/store/store';
import Card from '@mui/material/Card';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { SiSpeedtest } from 'react-icons/si';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import DeleteIcon from '@mui/icons-material/Delete';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SetNewPrice from '../set-new-price/SetNewPrice';

interface VehicleProps {
  car: VehicleI;
  setShowOrHideGallery: React.Dispatch<React.SetStateAction<boolean>>;
}

function Vehicle({ car, setShowOrHideGallery }: VehicleProps) {
  const vehiclesStore = useVehiclesStore();

  const [showOrHideNewPrice, setShowOrHideNewPrice] = useState<boolean>(false);

  const {
    name,
    model,
    price,
    image,
    id,
    hp,
    fuel,
  } = car;

  const deleteVehicle = () => {
    vehiclesStore.deleteVehicles(id);
  };

  const showCarusel = () => {
    vehiclesStore.setImagesForGallery(image);
    setShowOrHideGallery(true);
  };

  function formatPrice(priceOfCar: number) {
    const formattedPrice = priceOfCar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `$${formattedPrice}`;
  }

  return (
    <Card className="car">
      <h2>{[name, ' ', model]}</h2>
      <div className="wrapperImage">
        <Image className="imageOfCar" src={image[0]} alt={model} width={500} height={500} quality={100} onClick={showCarusel} priority />
      </div>
      <div className="price">
        <FaMoneyBillAlt className="icon" />
        <h3>{formatPrice(price)}</h3>
      </div>
      <div className="price">
        <BsFillFuelPumpFill className="icon" />
        <h3>{fuel}</h3>
      </div>
      <div className="price">
        <SiSpeedtest className="icon" />
        <h3>
          {hp}
          hp
        </h3>
      </div>
      {showOrHideNewPrice && <SetNewPrice id={id} setShowOrHideNewPrice={setShowOrHideNewPrice} />}
      <div>
        <Stack direction="row" spacing={3}>
          <Button variant="contained" size="small" startIcon={<PriceChangeOutlinedIcon />} onClick={() => setShowOrHideNewPrice(true)}>
            Change price
          </Button>
          <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={deleteVehicle}>
            Delete vehicle
          </Button>
        </Stack>
      </div>
    </Card>
  );
}

export default observer(Vehicle);
