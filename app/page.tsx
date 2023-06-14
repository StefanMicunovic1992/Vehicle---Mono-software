'use client';

import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Vehicle from '@/components/vehicle/Vehicle';
import Filters from '@/components/filters/Filters';
import Sort from '@/components/sort/Sort';
import PaginationPage from '@/components/pagination/Pagination';
import Gallery from '@/components/gallery/Gallery';
import AddCar from '@/components/add-car/AddCar';
import VehicleI from '@/interface/Vehicle';

function Home() {
  const vehiclesStore = useVehiclesStore();
  const carsPerPage = 9;

  const [carForRender, setCarForRender] = useState<VehicleI[]>(vehiclesStore.filterVehicle);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [showOrHideGallery, setShowOrHideGallery] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageNumber === 1) {
      setCarForRender(vehiclesStore.filterVehicle.slice(pageNumber - 1, carsPerPage));
    } else {
      setCarForRender(vehiclesStore.filterVehicle.slice((pageNumber - 1) * carsPerPage, pageNumber * carsPerPage));
    }

    setTotalPage(Math.ceil(vehiclesStore.filterVehicle.length / carsPerPage));
  }, [pageNumber, vehiclesStore.filterVehicle]);

  return (
    <main>
      <section className="filtersAndSortSection">
        <Filters />
        <Sort setPageNumber={setPageNumber} />
        <AddCar />
      </section>
      <section className="carsSection">
        {carForRender.map((car) => (
          <Vehicle key={car.id} car={car} setShowOrHideGallery={setShowOrHideGallery} />
        ))}
      </section>
      <section className="paginationSection">
        <PaginationPage setPageNumber={setPageNumber} pageNumber={pageNumber} totalPage={totalPage} />
      </section>
      <section>{showOrHideGallery && <Gallery setShowOrHideGallery={setShowOrHideGallery} />}</section>
    </main>
  );
}

export default observer(Home);
