'use client';

import React from 'react';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Select from 'react-select';

const optionsForSort = [
  { value: 'random', label: 'random' },
  { value: 'price (desc)', label: 'price (desc)' },
  { value: 'price (asc)', label: 'price (asc)' },
  { value: 'name (desc)', label: 'name (decs)' },
  { value: 'name (asc)', label: 'name (asc)' },
];

interface OptionsForSortProps {
  value: string;
  label: string;
}

interface SortProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

function Sort({ setPageNumber }: SortProps) {
  const vehiclesStore = useVehiclesStore();

  const sortByPrice = (selected: OptionsForSortProps | null) => {
    const inputString = selected?.value;

    if (inputString !== null && inputString !== 'random' && inputString !== undefined) {
      const parts = inputString.split('(');
      const typeOfSort = parts[0].trim();
      const descOrAsc = parts[1].slice(0, -1).trim();

      if (typeOfSort === 'price') {
        vehiclesStore.sortByPrice(descOrAsc);
      } else {
        vehiclesStore.sortByName(descOrAsc);
      }
    } else {
      vehiclesStore.sortRandom();
    }

    setPageNumber(1);
  };
  return (
    <article>
      <h3>Sort by...</h3>
      <Select placeholder="sort..." onChange={sortByPrice} options={optionsForSort} />
    </article>
  );
}

export default observer(Sort);
