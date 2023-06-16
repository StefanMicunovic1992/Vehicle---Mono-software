import React from 'react';
import './not-found.scss';
import Image from 'next/image';

function NotFound() {
  return (
    <section className="notFoundSection">
      <h2>Sorry... page not found</h2>
      <Image src="/not-found.png" alt="pageNotFound" width={500} height={500} />
    </section>
  );
}

export default NotFound;
