import React, {useState} from 'react';
import {Layout, MediaCard, Spinner} from '@shopify/polaris';
import PopupWindow from './PopupWindow';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

function PhotoCards({likedImages, setLikedImages, images}) {
  //Variable to be used to give all the modals when the images are clicked on
  const [modalImage, setModalImage] = useState();

  return (
    <>
      <Layout>
        {images ? images.map((image) => (
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
                    //Uses filter to remove an object from likedImages
                    setLikedImages(
                      likedImages.filter((i) => {return i.identifier !== image.identifier;})
                    );
                  } else {
                    //Adds the selected image to the liked image array, sorted by date into place.
                    setLikedImages(
                      likedImages
                        .concat(image)
                        .sort((a, b) => {return b.identifier - a.identifier;})
                    )
                  }
                },
              }}
              portrait
            >
              <img
                src={
                  "https://api.nasa.gov/EPIC/archive/enhanced/" +
                  //Formats the date right for the image's link
                  image.date.slice(0,4) + "/" +
                  image.date.slice(5,7) + "/" +
                  image.date.slice(8,10) + "/png/" +
                  image.image + ".png?api_key=" + api_key
                }
                alt=""
                width="100%"
                height="100%"
                onClick={() => {setModalImage(image)}}
                //Has the cursor change when hovering over the image to show that things will happen when the image is clicked
                onMouseOver={() => {
                  document.body.style.cursor = "pointer";
                }}
                onMouseLeave={() => {
                  document.body.style.cursor = "default";
                }}
              />
            </MediaCard>
          </Layout.Section>
        )) : (
          //When the images are still waiting for the API call, this displays a Spinner to show that the app's loading
          <Spinner />
        )}
        <Layout.Section oneHalf />
        <Layout.Section oneHalf />
        <Layout.Section oneHalf />
      </Layout>
      <PopupWindow
        image={modalImage}
        setImage={setModalImage}
      />
    </>
  );
}

export default PhotoCards;
