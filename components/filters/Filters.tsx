'use client';

import React, { useEffect, useId } from 'react';
import './Filters.scss';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const vehiclesStore = useVehiclesStore();

  useEffect(() => {
    if (vehiclesStore.filterItems.length !== 0) {
      console.log('provera stanja', JSON.stringify(vehiclesStore.filterItems));
      const searchFiltersInUrl = searchParams.get('filter')?.split(',');

      if (searchFiltersInUrl) {
        const matchedItems = vehiclesStore.filterItems.filter((item) => searchFiltersInUrl?.some((brand) => item.value === brand));
        console.log('pogadjanje sa filterima', JSON.stringify(matchedItems));
        vehiclesStore.setSelectedFilters(matchedItems);
        vehiclesStore.getByBrands(matchedItems);
      } else {
        console.log('ne postoji');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiclesStore.filterItems]);

  const setValue = (selected: any) => {
    if (selected.length === 0) {
      router.push(pathname);
      vehiclesStore.getAllCar();
      vehiclesStore.setSelectedFilters(selected);
    } else {
      const selectedValues = selected.map((item: { value: string; }) => item.value);
      router.push(`?filter=${selectedValues}`);
      vehiclesStore.getByBrands(selected);
      vehiclesStore.setSelectedFilters(selected);
    }
  };

  return (
    <article className="filters">
      <h3>Get by brends...</h3>
      <Select className="filterSelect" instanceId={useId()} value={vehiclesStore.selectedFilters} onChange={setValue} options={vehiclesStore.filterItems} placeholder="Brands" isMulti />
    </article>
  );
}
export default observer(Filters);
