import React from 'react';
import { observer } from 'mobx-react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import './Pagination.scss';

interface PaginationProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  totalPage: number,
  pageNumber: number,
}

function PaginationPage({ setPageNumber, pageNumber, totalPage }: PaginationProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <article className="pagination">
      <Stack spacing={2}>
        <Pagination page={pageNumber} count={totalPage} color="primary" size="large" onChange={handleChange} />
      </Stack>
    </article>
  );
}

export default observer(PaginationPage);
