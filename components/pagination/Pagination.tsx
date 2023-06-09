import React from 'react';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import './Pagination.scss';

interface PaginationProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  pageNumber: number,
  totalPage: number
}

function Pagination({ setPageNumber, pageNumber, totalPage }: PaginationProps) {
  const vehiclesStore = useVehiclesStore();
  console.log(vehiclesStore.filterVehicle.length);
  return (
    <article className="pagination">
      {pageNumber > 1 ? <button type="button" onClick={() => setPageNumber((prev) => prev - 1)}>back</button> : <button type="button" disabled>back</button>}
      <h4>
        {pageNumber}
        /
        {totalPage}
      </h4>
      {pageNumber < totalPage ? <button type="button" onClick={() => setPageNumber((prev) => prev + 1)}>forward</button> : <button type="button" disabled>forward</button>}
    </article>
  );
}

export default observer(Pagination);
