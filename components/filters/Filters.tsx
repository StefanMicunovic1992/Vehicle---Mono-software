'use client';

import React, { useEffect, useState } from 'react';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FilterItem {
  value: string;
  label: string;
}

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const vehiclesStore = useVehiclesStore();

  const [filterValue, setFiltersValue] = useState<FilterItem[]>();

  useEffect(() => {
    const filtersParams = searchParams.get('filter');
    if (filtersParams) {
      const findValue = vehiclesStore.filterItems.filter((item) => item.value === filtersParams);
      setFiltersValue(findValue);
      vehiclesStore.getByBrands(filtersParams);
    }
  }, [vehiclesStore.filterItems]);

  const setValue = (selected: any) => {
    console.log(JSON.stringify(selected));
    if (selected !== undefined && selected !== null) {
      vehiclesStore.getByBrands(selected.value);
      vehiclesStore.setFiltersValue(selected.value);
      const query = `?filter=${selected.value}`;
      router.push(`${pathname}${query}`);
    }
  };

  return (
    <article>
      <h3>Get by brends...</h3>
      {/* <Select onChange={setValue} options={uniqueBrands} placeholder="Brands" /> */}
      <Select value={filterValue} onChange={setValue} options={vehiclesStore.filterItems} placeholder="Brands" />
    </article>
  );
}
export default observer(Filters);
