import React, { useEffect, useState } from 'react';
import {MediaCard, Layout, Spinner} from '@shopify/polaris';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

function Liked({likedImages, setLikedImages}) {
  return (
    <>
      <br/>
      {likedImages && likedImages.length === 0 ? (<p>You have not liked any photos yet</p>) : <br />}
      <Layout>
        {likedImages ? likedImages.map((image) => (
          <Layout.Section oneHalf>
            <MediaCard
              title={image.image}
              description={
                image.caption + ". Taken on "
                + new Date(image.date).toLocaleString("en-US", {dateStyle:"full", timeStyle:"long"})
              }
              primaryAction={{
                content: likedImages.some((i) => {return i.identifier === image.identifier}) 
                  ? 'Remove Like' : 'Like',
                onAction: () => {
                  if (likedImages.some((i) => {return i.identifier === image.identifier}) ) {
                    setLikedImages(likedImages.filter((i) => {return i.identifier !== image.identifier}))
                  } else {
                    setLikedImages(likedImages.concat(image))
                  }
                },
              }}
              portrait
            >
              <img
                src={
                  "https://api.nasa.gov/EPIC/archive/enhanced/" +
                  image.date.slice(0,4) + "/" +
                  image.date.slice(5,7) + "/" +
                  image.date.slice(8,10) + "/png/" +
                  image.image + ".png?api_key=" + api_key
                }
                alt=""
                width="100%"
                height="100%"
              />
            </MediaCard>
          </Layout.Section>
        )) : (
          <Spinner />
        )}
        <Layout.Section oneHalf />
        <Layout.Section oneHalf />
        <Layout.Section oneHalf />
      </Layout>
    </>
  );
}

export default Liked;
