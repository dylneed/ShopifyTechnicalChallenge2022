//https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit#
//https://api.nasa.gov (I quite like EPIC)
//NASA API Key: qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5
import React, { useEffect, useState } from 'react';
import {DatePicker, Card, Button} from '@shopify/polaris';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

function Home() {
  const [images, setImages] = useState();
  const [selectedDate, setSelectedDate] = useState({
    start: new Date,
    end: new Date
  });
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
      <DatePicker
        month={month}
        year={year}
        selected={selectedDate}
        onChange={setSelectedDate}
        onMonthChange={(m, y) => setDisplayDate({month: m, year: y})}
      />
      {images ? images.map((image) => (
        <Card>
          <h2>{image.identifier}</h2>
          <p>{image.caption}</p>
          <img
            src={
              "https://api.nasa.gov/EPIC/archive/enhanced/" +
              image.date.split("-")[0] + "/" +
              image.date.split("-")[1] + "/" +
              image.date.split("-")[2].split(" ")[0] + "/png/" +
              image.image + ".png?api_key=" + api_key
            }
            alt="new"
            width="200"
          />
          <Button />
        </Card>
      )): <p>Loading</p> }
    </>
  );
}

export default Home;
