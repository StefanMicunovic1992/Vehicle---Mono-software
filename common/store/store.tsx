'use client';

import React, { useContext, useRef } from 'react';
import { makeAutoObservable } from 'mobx';
import VehicleI from '@/common/interface/Vehicle';

interface FilterAndSortI {
  value: string;
  label: string;
}

interface AddNewCarI {
  name: string;
  model: string;
  price: number;
  image: string[];
}

interface SelectedFuelPropsI {
  value: string;
  label: string;
}

export default class Vehicles {
  vehicles: VehicleI[] = [];

  filterVehicle: VehicleI[] = [];

  filterItems: FilterAndSortI[] = [];

  selectedFilters: FilterAndSortI[] = [];

  selectedSort: FilterAndSortI | null = null;

  selectedFuel: SelectedFuelPropsI | null = null;

  imagesForGallery: string[] = [];

  fuelItems: FilterAndSortI[] = [];

  allValueForSort: FilterAndSortI[] = [
    { value: 'random', label: 'random' },
    { value: 'price(desc)', label: 'price (desc)' },
    { value: 'price(asc)', label: 'price (asc)' },
    { value: 'hp(desc)', label: 'hp (desc)' },
    { value: 'hp(asc)', label: 'hp (asc)' },
    { value: 'name(desc)', label: 'name (decs)' },
    { value: 'name(asc)', label: 'name (asc)' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  getVehicles() {
    fetch('https://64652db89c09d77a62e63425.mockapi.io/vehicle')
      .then((res) => res.json())
      .then((res) => {
        this.vehicles = res;
        this.filterVehicle = res;
        this.setItemsForFilter(this.vehicles);
        this.setItemsForFuel(this.vehicles);
      })
      .catch((error) => console.log(error));
  }

  // eslint-disable-next-line class-methods-use-this
  addNewCar(dataOfCar: AddNewCarI) {
    return fetch('https://64652db89c09d77a62e63425.mockapi.io/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataOfCar),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log(error));
  }

  setImagesForGallery(images: string[]) {
    this.imagesForGallery = images;
  }

  setItemsForFilter(data: VehicleI[]) {
    this.filterItems = Array.from(new Set(data.map((car) => car.name))).map((name) => ({ value: name, label: name }));
    const filterItemsWithCount = this.filterItems.map((item) => {
      const count = data.filter((vehicle) => vehicle.name === item.value).length;
      return { ...item, count };
    });

    this.filterItems = filterItemsWithCount.map((item) => ({
      value: item.value,
      label: `${item.value} (${item.count})`,
    }));
  }

  setItemsForFuel(data: VehicleI[]) {
    this.fuelItems = Array.from(new Set(data.map((car: { fuel: any; }) => car.fuel))).map((fuel) => ({ value: fuel, label: fuel }));
    const fuelItemsWithCount = this.fuelItems.map((item: { value: string; }) => {
      const count = data.filter((vehicle) => vehicle.fuel === item.value).length;
      return { ...item, count };
    });

    this.fuelItems = fuelItemsWithCount.map((item: { value: any; count: any; }) => ({
      value: item.value,
      label: `${item.value} (${item.count})`,
    }));

    this.fuelItems.unshift({ value: 'all', label: 'all' });
  }

  setSelectedSort(selected: any) {
    this.selectedSort = selected;
  }

  setSelectedFuel(selected: any) {
    this.selectedFuel = selected;
  }

  sortByPrice(descOrAsc: string) {
    if (descOrAsc === 'desc') {
      this.filterVehicle = [...this.filterVehicle].sort((a, b) => b.price - a.price);
    } else {
      this.filterVehicle = [...this.filterVehicle].sort((a, b) => a.price - b.price);
    }
  }

  sortByName(descOrAsc: string) {
    if (descOrAsc === 'desc') {
      this.filterVehicle = [...this.filterVehicle].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.filterVehicle = [...this.filterVehicle].sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  sortByHP(descOrAsc: string) {
    if (descOrAsc === 'desc') {
      this.filterVehicle = [...this.filterVehicle].sort((a, b) => b.hp - a.hp);
    } else {
      this.filterVehicle = [...this.filterVehicle].sort((a, b) => a.hp - b.hp);
    }
  }

  sortRandom() {
    this.filterVehicle = [...this.filterVehicle].sort((a, b) => +a.id - +b.id);
  }

  getByBrands(selected: FilterAndSortI[]) {
    const newArray = this.vehicles.filter((vehicle) => selected.some((filterValue) => vehicle.name === filterValue.value));
    const sortedArray = newArray.sort((a, b) => {
      const indexA = selected.findIndex((filterValue) => filterValue.value === a.name);
      const indexB = selected.findIndex((filterValue) => filterValue.value === b.name);
      return indexA - indexB;
    });
    this.filterVehicle = sortedArray;

    if (this.selectedFuel && this.selectedFuel.value !== 'all') {
      this.filterVehicle = [...this.filterVehicle].filter((car) => car.fuel === this.selectedFuel?.value);
    } else {
      this.filterVehicle = [...this.filterVehicle];
    }

    const chechValue = this.filterVehicle.filter((vehicle) => vehicle.fuel === this.selectedFuel?.value);
    if (chechValue.length === 0) {
      this.setSelectedFuel({ value: 'all', label: 'all' });
      this.filterVehicle = [...this.filterVehicle];
    } else {
      this.setItemsForFuel(this.filterVehicle);
    }

    this.setItemsForFuel(this.filterVehicle);
  }

  getByFuel(selected: any) {
    if (this.selectedFilters.length !== 0) {
      const newArray = this.vehicles.filter((vehicle) => this.selectedFilters.some((filterValue: { value: string; }) => vehicle.name === filterValue.value));
      const sortedArray = newArray.sort((a, b) => {
        const indexA = this.selectedFilters.findIndex((filterValue: { value: string; }) => filterValue.value === a.name);
        const indexB = this.selectedFilters.findIndex((filterValue: { value: string; }) => filterValue.value === b.name);
        return indexA - indexB;
      });
      this.filterVehicle = [...sortedArray];
      this.setItemsForFuel(newArray);

      if (selected.value !== 'all') {
        this.filterVehicle = [...this.filterVehicle].filter((car) => car.fuel === selected.value);
      } else {
        this.filterVehicle = [...this.filterVehicle];
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (selected.value !== 'all') {
        this.filterVehicle = [...this.vehicles].filter((car) => car.fuel === selected.value);
        this.setItemsForFilter(this.filterVehicle);
        this.setItemsForFuel(this.vehicles);
      } else {
        this.filterVehicle = this.vehicles;
        this.setItemsForFilter(this.filterVehicle);
        this.setItemsForFuel(this.vehicles);
      }
    }
  }

  getAllCar() {
    if (this.selectedFuel) {
      if (this.selectedFuel.value === 'all') {
        this.filterVehicle = this.vehicles;
        this.setItemsForFuel(this.vehicles);
      } else {
        this.filterVehicle = [...this.vehicles].filter((car) => car.fuel === this.selectedFuel?.value);
        this.setItemsForFuel(this.vehicles);
        this.setSelectedFuel(this.fuelItems.filter((item) => item.value === this.selectedFuel?.value)[0]);
      }
    } else {
      this.filterVehicle = this.vehicles;
    }
  }

  setSelectedFilters(selected: any[]) {
    this.selectedFilters = selected;
  }

  deleteVehicles(id: string) {
    const apiUrl = 'https://64652db89c09d77a62e63425.mockapi.io/vehicle';
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => this.getVehicles())
      .catch((error) => console.log(error));
  }

  newPrice(newPrice: number, id: string) {
    const apiUrl = 'https://64652db89c09d77a62e63425.mockapi.io/vehicle';
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then(() => this.getVehicles())
      .catch((error) => console.log(error));
  }
}

const VehiclesContex = React.createContext<Vehicles>(null as unknown as Vehicles);

export const useVehiclesStore = () => useContext(VehiclesContex);

type Props = {
  children: React.ReactNode;
};

export function VehiclesProvider({ children }: Props) {
  const store = useRef(new Vehicles());
  store.current.getVehicles();

  return <VehiclesContex.Provider value={store.current}>{children}</VehiclesContex.Provider>;
}
