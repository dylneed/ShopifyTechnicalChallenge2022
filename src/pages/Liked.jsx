import React from 'react';
import PhotoCards from './PhotoCards.jsx';

function Liked({likedImages, setLikedImages}) {
  return (
    <>
      <br/>
      {likedImages && likedImages.length === 0 ? (<p>You have not liked any photos yet</p>) : <br />}
      <PhotoCards 
        likedImages={likedImages}
        setLikedImages={setLikedImages}
        images={likedImages}
      />
    </>
  );
}

export default Liked;
