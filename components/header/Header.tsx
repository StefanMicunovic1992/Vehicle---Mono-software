import Image from 'next/image';
import React from 'react';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <Image src="/autoworld.png" quality={100} alt="logo" width={250} height={70} priority />
    </header>
  );
}

export default Header;
