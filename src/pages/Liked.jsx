import React, { useEffect, useState } from 'react';
import {MediaCard, Layout, Spinner} from '@shopify/polaris';
import PhotoCards from './PhotoCards.jsx';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

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
