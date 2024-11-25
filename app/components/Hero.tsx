import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/db/mock';
import { Link } from '@remix-run/react';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = Object.values(placeholderImages);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 h-full w-full bg-center bg-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl font-bold text-center">Welcome to Our Site</h1>
        <p className="mt-4 text-xl text-center">Discover amazing content</p>
        <Link to="/products">
          <Button className="mt-6">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

