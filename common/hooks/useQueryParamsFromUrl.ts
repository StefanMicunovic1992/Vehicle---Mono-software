import { useEffect } from 'react';
import { useVehiclesStore } from '@/common/store/store';
import { useSearchParams } from 'next/navigation';

function useFilterParamsFromUrl() {
  const searchParams = useSearchParams();
  const vehiclesStore = useVehiclesStore();

  useEffect(() => {
    if (vehiclesStore.filterItems.length !== 0) {
      const filtersInUrl = searchParams.get('filter')?.split(',');
      const sortInUrl = searchParams.get('sort');
      const fuelInUrl = searchParams.get('fuel');

      if (filtersInUrl) {
        const matchedItems = vehiclesStore.filterItems.filter((item) => filtersInUrl?.some((brand) => item.value === brand));
        vehiclesStore.setSelectedFilters(matchedItems);
        vehiclesStore.getByBrands(matchedItems);
      }

      if (fuelInUrl) {
        vehiclesStore.setSelectedFuel(vehiclesStore.fuelItems.filter((fuel) => fuel.value === fuelInUrl)[0]);
        vehiclesStore.getByFuel(vehiclesStore.fuelItems.filter((fuel) => fuel.value === fuelInUrl)[0]);
      }

      if (sortInUrl) {
        vehiclesStore.setSelectedSort(vehiclesStore.allValueForSort.filter((item) => item.value === sortInUrl)[0]);

        if (sortInUrl === 'random') {
          vehiclesStore.sortRandom();
        } else {
          const parts = sortInUrl.split('(');
          const typeOfSort = parts[0].trim();
          const descOrAsc = parts[1].slice(0, -1).trim();

          if (typeOfSort === 'price') {
            vehiclesStore.sortByPrice(descOrAsc);
          } else if (typeOfSort === 'name') {
            vehiclesStore.sortByName(descOrAsc);
          } else {
            vehiclesStore.sortByHP(descOrAsc);
          }
        }
      }
    }
  }, [vehiclesStore.vehicles]);
}

export default useFilterParamsFromUrl;
