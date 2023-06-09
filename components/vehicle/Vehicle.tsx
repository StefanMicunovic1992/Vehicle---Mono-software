'use client';

import './Vehicle.scss';
import VehicleI from '@/interface/Vehicle';
import { observer } from 'mobx-react';
import { useVehiclesStore } from '@/store/store';
import React, { useState } from 'react';
import Image from 'next/image';
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

  return (
    <article className="car">
      <h2>{[name, ' - ', model]}</h2>
      <h3>{price}</h3>
      {showOrHideNewPrice && <SetNewPrice id={id} setShowOrHideNewPrice={setShowOrHideNewPrice} />}
      <Image src={image[0]} className="imageOfCar" width={1000} height={1000} alt={model} onClick={showCarusel} />
      <h3>{id}</h3>
      <button type="button" onClick={deleteVehicle}>
        DELETE
      </button>
      <button type="button" onClick={() => setShowOrHideNewPrice(true)}>
        UPDATA
      </button>
    </article>
  );
}

export default observer(Vehicle);
