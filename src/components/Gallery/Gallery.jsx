import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Exhibit from './Exhibit';
import Title from './Title';

const Gallery = ({ products }) => {
  const gallery = JSON.parse(JSON.stringify(products));

  const getDimensions = (image) => {
    return [image.image_dimensions.height, image.image_dimensions.width];
  }

  const rescaleImage = (dimensionArray) => {
    let planeWidth = 1;
    let planeHeight = 1;
    const height = dimensionArray[0];
    const width = dimensionArray[1];

    if (height > width) {
      planeWidth = width / height;
    }
    if (height < width) {
      planeHeight = height / width;
    }
    return [planeWidth * 2, planeHeight * 2];
  }

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    if (array.length > 20) {
      return array.slice(0, 20);
    }
    return array;
  }

  const generateCarousel = (array) => {
    const carousel = [];
    for (let i = 0; i < array.length; i++) {
      const t = i / array.length * 2 * Math.PI;
      const x = Math.cos(t) * 4;
      const z = Math.sin(t) * 4;
  
      let rotation = -t + 1.5;
  
      carousel.push(
        <Exhibit
          key={i}
          position={[x, 0, z]}
          dimensions={rescaleImage(getDimensions(array[i].image))}
          // url below is a workaround for missing CORS headers... 😞
          image={'https://vast-earth-27464.herokuapp.com/' + array[i].image.url}
          rotation={[0, rotation, 0]}
        />
      )
    }
    return carousel;
  }

  return (
    <>
      <Canvas style={{ height: "25em" }} camera={{ position: [0, 0, -6] }}>
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <directionalLight position={[-10, 10, 5]} intensity={0.5} />
        <spotLight position={[1000, 0, 0]} intensity={0.5} />
        <Suspense fallback={null}>
          <Title />
          <group>
            {generateCarousel(shuffle(gallery))}
          </group>
        </Suspense>
        <OrbitControls autoRotate enableRotate={false} enableZoom={false} enablePan={false} />
      </Canvas>
    </>
  )
}

export default Gallery;