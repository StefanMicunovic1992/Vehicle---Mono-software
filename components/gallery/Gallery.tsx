import React, { useState, useRef } from 'react';
import { useVehiclesStore } from '@/store/store';
import { observer } from 'mobx-react';
import Image from 'next/image';
import './Gallery.scss';
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
    imageRef.current?.classList.add('effectRight');
    setTimeout(() => {
      setImageInArray((prev) => (prev === vehiclesStore.imagesForGallery.length - 1 ? 0 : prev + 1));
    }, 600);
    setTimeout(() => {
      imageRef.current?.classList.remove('effectRight');
    }, 1000);
  };

  const backwardImage = () => {
    imageRef.current?.classList.add('effectLeft');
    setTimeout(() => {
      setImageInArray((prev) => (prev === 0 ? 3 : prev - 1));
    }, 600);
    setTimeout(() => {
      imageRef.current?.classList.remove('effectLeft');
    }, 1000);
  };

  const closeGallery = () => {
    setShowOrHideGallery(false);
  };

  return (
    <article className="carusel">
      <RiCloseCircleFill className="icons closeIcons" onClick={closeGallery} />
      <FaArrowCircleLeft className="icons" onClick={backwardImage} />
      <Image className="imageGallery" ref={imageRef} src={vehiclesStore.imagesForGallery[imageInArray]} alt="vehicles" width={1000} height={1000} />
      <FaArrowCircleRight className="icons" onClick={forwardImage} />
    </article>
  );
}

export default observer(Gallery);
