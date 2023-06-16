const setParamsInUrl = (fuelSelected: any, filterSelected: any, sortSelected: any): string => {
  let url = '';

  if (fuelSelected) {
    url = `?fuel=${fuelSelected.value}`;
  } else if (filterSelected.length > 0) {
    const selectedValues = filterSelected.map((item: { value: string }) => item.value);
    url = `?filter=${selectedValues}`;
  } else if (sortSelected) {
    url = `?sort=${sortSelected.value}`;
  }

  if (fuelSelected && filterSelected.length > 0 && sortSelected) {
    const selectedValues = filterSelected.map((item: { value: string }) => item.value);
    url = `?filter=${selectedValues}&fuel=${fuelSelected.value}&sort=${sortSelected.value}`;
  } else if (fuelSelected && filterSelected.length > 0) {
    const selectedValues = filterSelected.map((item: { value: string }) => item.value);
    url = `?filter=${selectedValues}&fuel=${fuelSelected.value}`;
  } else if (fuelSelected && sortSelected) {
    url = `?fuel=${fuelSelected.value}&sort=${sortSelected.value}`;
  } else if (filterSelected.length > 0 && sortSelected) {
    const selectedValues = filterSelected.map((item: { value: string }) => item.value);
    url = `?filter=${selectedValues}&sort=${sortSelected.value}`;
  }

  return url;
};

export default setParamsInUrl;
