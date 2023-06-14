import React, { useState, useRef } from 'react';
import './Gallery.scss';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';

interface GalleryProps {
  setShowOrHideGallery: React.Dispatch<React.SetStateAction<boolean>>;
}

function Gallery({ setShowOrHideGallery }: GalleryProps) {
  const vehiclesStore = useVehiclesStore();
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageInArray, setImageInArray] = useState<number>(0);

  const forwardImage = () => {
    imageRef.current?.classList.add('moveRight');
    setTimeout(() => {
      setImageInArray((prev) => (prev === vehiclesStore.imagesForGallery.length - 1 ? 0 : prev + 1));
    }, 600);
  };

  const backwardImage = () => {
    imageRef.current?.classList.add('moveLeft');
    setTimeout(() => {
      setImageInArray((prev) => (prev === 0 ? 3 : prev - 1));
    }, 600);
  };

  const fadeInEffect = () => {
    imageRef.current?.classList.remove('moveLeft');
    imageRef.current?.classList.remove('moveRight');
  };

  const closeGallery = () => {
    setShowOrHideGallery(false);
  };

  return (
    <article className="carusel">
      <RiCloseCircleFill className="icons closeIcons" onClick={closeGallery} />
      <FaArrowCircleLeft className="icons" onClick={backwardImage} />
      <div className="wrapperImage">
        <Image className="imageGallery" ref={imageRef} src={vehiclesStore.imagesForGallery[imageInArray]} alt="vehicles" fill priority onLoad={fadeInEffect} />
      </div>
      <FaArrowCircleRight className="icons" onClick={forwardImage} />
    </article>
  );
}

export default observer(Gallery);
