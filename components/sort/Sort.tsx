'use client';

import React, { useId } from 'react';
import './Sort.scss';
import { useVehiclesStore } from '@/common/store/store';
import { observer } from 'mobx-react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import setParamsInUrl from '@/common/utils/setParamsInUrl';

interface OptionsForSortProps {
  value: string;
  label: string;
}

interface SortProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

function Sort({ setPageNumber }: SortProps) {
  const router = useRouter();
  const vehiclesStore = useVehiclesStore();

  const sortBy = (selected: OptionsForSortProps | null) => {
    const inputString = selected?.value;
    vehiclesStore.setSelectedSort(selected);

    if (inputString !== null && inputString !== 'random' && inputString !== undefined) {
      const parts = inputString.split('(');
      const typeOfSort = parts[0].trim();
      const descOrAsc = parts[1].slice(0, -1).trim();

      if (typeOfSort === 'price') {
        vehiclesStore.sortByPrice(descOrAsc);
      } else if (typeOfSort === 'name') {
        vehiclesStore.sortByName(descOrAsc);
      } else {
        vehiclesStore.sortByHP(descOrAsc);
      }
    } else {
      vehiclesStore.sortRandom();
    }

    setPageNumber(1);
    const fuelSelected = vehiclesStore.selectedFuel;
    const filterSelected = vehiclesStore.selectedFilters;
    const sortSelected = vehiclesStore.selectedSort;
    const stringForUrl = setParamsInUrl(fuelSelected, filterSelected, sortSelected);
    router.push(stringForUrl);
  };

  return (
    <article className="sort">
      <h3>Sort by...</h3>
      <Select className="sortSelect" value={vehiclesStore.selectedSort} placeholder="sort..." instanceId={useId()} onChange={sortBy} options={vehiclesStore.allValueForSort} />
    </article>
  );
}

export default observer(Sort);
