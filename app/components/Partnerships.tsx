import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

const Partnerships = () => {
  const [partners] = useState([
    {
      img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80',
      height: 'h-64',
    },
    {
      img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80',
      height: 'h-96',
    },
    {
      img: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?auto=format&fit=crop&q=80',
      height: 'h-72',
    },
    {
      img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
      height: 'h-80',
    },
    {
      img: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80',
      height: 'h-64',
    },
    {
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
      height: 'h-96',
    },
    {
      img: 'https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&q=80',
      height: 'h-72',
    },
    {
      img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80',
      height: 'h-80',
    },
    {
      img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80',
      height: 'h-96',
    },
  ]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Facilities & Partners</h2>
          <p className="text-muted-foreground">
            State-of-the-art facilities and trusted partnerships worldwide
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`mb-4 ${partner.height} overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
            >
              <img
                src={partner.img}
                alt={`Facility ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Partnerships;