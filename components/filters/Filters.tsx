'use client';

import React, { useId } from 'react';
import './Filters.scss';
import { useVehiclesStore } from '@/common/store/store';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import setParamsInUrl from '@/common/utils/setParamsInUrl';

function Filters() {
  const router = useRouter();
  const vehiclesStore = useVehiclesStore();

  const setValue = (selected: any) => {
    if (selected.length === 0) {
      vehiclesStore.setSelectedFilters(selected);
      vehiclesStore.getAllCar();
    } else {
      vehiclesStore.setSelectedFilters(selected);
      vehiclesStore.getByBrands(selected);
    }

    const fuelSelected = vehiclesStore.selectedFuel;
    const filterSelected = vehiclesStore.selectedFilters;
    const sortSelected = vehiclesStore.selectedSort;
    const stringForUrl = setParamsInUrl(fuelSelected, filterSelected, sortSelected);
    router.push(stringForUrl);
  };

  return (
    <article className="filters">
      <h3>Brends...</h3>
      <Select
        className="filterSelect"
        instanceId={useId()}
        value={vehiclesStore.selectedFilters}
        onChange={setValue}
        options={vehiclesStore.filterItems}
        placeholder="Brands"
        isMulti
      />
    </article>
  );
}
export default observer(Filters);
