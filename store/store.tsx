'use client';

import React, { useContext, useRef } from 'react';
import { makeAutoObservable } from 'mobx';
import VehicleInterface from '@/interface/VehicleInterface';

export default class Vehicles {
  vehicles: VehicleInterface[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getVehicles() {
    fetch('https://64652db89c09d77a62e63425.mockapi.io/vehicle')
      .then((res) => res.json())
      .then((res) => (this.vehicles = res))
      .catch((error) => console.log(error));
  }

  sortVehicle() {
    this.vehicles.sort((a, b) => a.price - b.price);
  }

  getByName(nameOfMark: string) {
    const newArray = this.vehicles.filter(
      (vehicle) => vehicle.name === nameOfMark,
    );
    this.vehicles = newArray;
  }
}

const VehiclesContex = React.createContext<Vehicles>(
  null as unknown as Vehicles,
);

export const useVehiclesStore = () => useContext(VehiclesContex);

type Props = {
  children: React.ReactNode;
};

export function VehiclesProvider({ children }: Props) {
  const store = useRef(new Vehicles());
  store.current.getVehicles();

  return (
    <VehiclesContex.Provider value={store.current}>
      {children}
    </VehiclesContex.Provider>
  );
}
