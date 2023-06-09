'use client';

import React, { useContext, useRef } from 'react';
import { makeAutoObservable } from 'mobx';
import VehicleI from '@/interface/Vehicle';

interface FilterItem {
  value: string;
  label: string;
}

export default class Vehicles {
  vehicles: VehicleI[] = [];

  filterVehicle: VehicleI[] = [];

  filterItems: FilterItem[] = [];

  imagesForGallery: string[] = [];

  filters: string = '';

  sort: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  getVehicles() {
    fetch('https://64652db89c09d77a62e63425.mockapi.io/vehicle')
      .then((res) => res.json())
      .then((res) => {
        this.vehicles = res;
        this.filterVehicle = res;
        this.setItemsForFilter();
        if (this.filters !== '') {
          this.getByBrands(this.filters);
        }
      })
      .catch((error) => console.log(error));
  }

  setImagesForGallery(images: string[]) {
    console.log(images);
    this.imagesForGallery = images;
  }

  setItemsForFilter() {
    this.filterItems = Array.from(new Set(this.vehicles.map((car) => car.name))).map((name) => ({ value: name, label: name }));
    this.filterItems.unshift({ value: 'allCars', label: 'All cars' });
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

  sortRandom() {
    this.filterVehicle = [...this.filterVehicle].sort((a, b) => +a.id - +b.id);
  }

  getByBrands(nameOfMark: string) {
    if (nameOfMark === 'allCars') {
      this.filterVehicle = this.vehicles;
    } else {
      const newArray = this.vehicles.filter((vehicle) => vehicle.name === nameOfMark);
      this.filterVehicle = newArray;
    }
  }

  setFiltersValue(nameOfMark: string) {
    this.filters = nameOfMark;
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
