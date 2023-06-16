'use client';

import React, { useId } from 'react';
import './Fuel.scss';
import { useVehiclesStore } from '@/common/store/store';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import setParamsInUrl from '@/common/utils/setParamsInUrl';

interface OptionsForSortProps {
  value: string;
  label: string;
}

interface FuelProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

function Fuel({ setPageNumber }: FuelProps) {
  const router = useRouter();
  const vehiclesStore = useVehiclesStore();

  const fuelBy = (selected: OptionsForSortProps | null) => {
    vehiclesStore.setSelectedFuel(selected);
    vehiclesStore.getByFuel(selected);
    setPageNumber(1);

    const fuelSelected = vehiclesStore.selectedFuel;
    const filterSelected = vehiclesStore.selectedFilters;
    const sortSelected = vehiclesStore.selectedSort;
    const stringForUrl = setParamsInUrl(fuelSelected, filterSelected, sortSelected);
    router.push(stringForUrl);
  };

  return (
    <article className="fuel">
      <h3>Fuel...</h3>
      <Select className="fuelSelect" value={vehiclesStore.selectedFuel} placeholder="sort..." instanceId={useId()} options={vehiclesStore.fuelItems} onChange={fuelBy} />
    </article>
  );
}

export default observer(Fuel);
