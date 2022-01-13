import React, { useEffect, useState } from 'react';
import {DatePicker, MediaCard, Layout, Spinner} from '@shopify/polaris';
import PhotoCards from './PhotoCards.jsx';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

function Home({selectedDate, setSelectedDate, likedImages, setLikedImages}) {
  const [images, setImages] = useState();

  const [{month, year}, setDisplayDate] = useState({
    month: selectedDate.start.getMonth(), 
    year: selectedDate.start.getFullYear(),
  })

  const fetchImages = async () => {
    try {
      setImages();
      let dateString = selectedDate.start.toISOString().split("T")[0]
      let url = "https://api.nasa.gov/EPIC/api/enhanced/date/" + dateString + "?api_key=" + api_key;
      fetch(url, {method:"GET"})
        .then(response => {return response.json();})
        .then(data => {setImages(data)})
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => fetchImages(), [,selectedDate]);
  useEffect(() => console.log(images),[,images]);

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
