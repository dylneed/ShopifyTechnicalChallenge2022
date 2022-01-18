import React, { useEffect, useState } from 'react';
import {DatePicker, Layout} from '@shopify/polaris';
import PhotoCards from './PhotoCards.jsx';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

function Home({selectedDate, setSelectedDate, likedImages, setLikedImages}) {
  const [images, setImages] = useState();

  const [{month, year}, setDisplayDate] = useState({
    month: selectedDate.start.getMonth(), 
    year: selectedDate.start.getFullYear(),
  })

  //Grabs the array of objects from nasa's EPIC API, and saves that to the images const 
  const fetchImages = async () => {
    try {
      //Clears images, so that loading screen appears
      setImages();
      //Creates the url needed for the API call
      let dateString = selectedDate.start.toISOString().split("T")[0]
      let url = "https://api.nasa.gov/EPIC/api/enhanced/date/" + dateString + "?api_key=" + api_key;
      //Makes the API call and sends the array to images
      fetch(url, {method:"GET"})
        .then(response => {return response.json();})
        .then(data => {setImages(data)})
    } catch (error) {
      console.error(error);
    }
  }

  //On app load, and whenever the selectedDate changes, make a new API call to get the images
  useEffect(() => fetchImages(), [,selectedDate]);

  return (
    <>
      <br />
      {images && images.length === 0 ? (<p>No data has been reported for this day</p>) : <br />}
      <Layout>
        <Layout.Section oneThird/>
        <Layout.Section oneThird>
          <DatePicker
            month={month}
            year={year}
            selected={selectedDate}
            onChange={(day) => setSelectedDate(day)}
            onMonthChange={(m, y) => setDisplayDate({month: m, year: y})}
          />
        </Layout.Section>
        <Layout.Section oneThird/>
      </Layout>
      <br />
      <PhotoCards 
        likedImages={likedImages}
        setLikedImages={setLikedImages}
        images={images}
      />
    </>
  );
}

export default Home;
