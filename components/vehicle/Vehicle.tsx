'use client';

import './Vehicle.scss';
import React, { useState } from 'react';
import VehicleI from '@/interface/Vehicle';
import { observer } from 'mobx-react';
import { useVehiclesStore } from '@/store/store';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { FaMoneyBillAlt } from 'react-icons/fa';
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
      <CardMedia
        className="imageOfCar"
        component="img"
        image={image[0]}
        alt={model}
        onClick={showCarusel}
      />
      <div className="price">
        <FaMoneyBillAlt className="icon" />
        <h3>{formatPrice(price)}</h3>
      </div>
      {showOrHideNewPrice && <SetNewPrice id={id} setShowOrHideNewPrice={setShowOrHideNewPrice} />}
      <div>
        <Stack direction="row" spacing={3}>
          <Button variant="contained" size="small" startIcon={<PriceChangeOutlinedIcon />} onClick={() => setShowOrHideNewPrice(true)}>Change price</Button>
          <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={deleteVehicle}>Delete vehicle</Button>
        </Stack>
      </div>
    </Card>
  );
}

export default observer(Vehicle);
