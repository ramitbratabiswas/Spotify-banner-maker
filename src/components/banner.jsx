// Banner.js
import { useEffect, forwardRef, useContext } from 'react';
import { useFetchUniqueImages } from '../utils/fetchUniqueImages';
import { AppContext } from '../utils/appContext';

const Banner = forwardRef(({ setImagesLoaded, onAlbumClick }, ref) => {
  const { data, covers, setCovers } = useContext(AppContext);
  const { rows, columns } = data;
  const numImagesToShow = rows * columns;
  const albums = useFetchUniqueImages();

  useEffect(() => {
    if (albums.length > 0) {
      setCovers(albums);
    }
  }, [albums, setCovers]);

  useEffect(() => {
    const images = ref.current.querySelectorAll('img');
    const totalImages = covers.length;
    let loadedImages = 0;

    const checkImagesLoaded = () => {
      loadedImages += 1;
      if (loadedImages === totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkImagesLoaded();
      } else {
        img.onload = checkImagesLoaded;
        img.onerror = checkImagesLoaded;
      }
    });

    if (totalImages === 0) {
      setImagesLoaded(true);
    }
  }, [covers, ref, setImagesLoaded]);

  useEffect(() => {
    ref.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }, [columns, ref]);

  return (
    <div ref={ref} className='banner'>
      {covers.slice(0, numImagesToShow).map((album, index) => (
        <div className='banner-image-container' key={index} onClick={() => onAlbumClick(album)}>
          <img className='image' src={album.link} alt={`album-${index}`} />
        </div>
      ))}
    </div>
  );
});

Banner.displayName = 'Banner';
export default Banner;
