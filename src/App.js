//https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit#
//https://api.nasa.gov (I quite like EPIC)
//NASA API Key: qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5
import Home from './pages/Home.jsx';
import Liked from './pages/Liked.jsx';
import React, {useState, useEffect} from 'react';
import {Page, Tabs} from '@shopify/polaris';

function App() {
  const [selected, setSelected] = useState(0);

  const [likedImages, setLikedImages] = useState([]);

  const [selectedDate, setSelectedDate] = useState({
    start: new Date(),
    end: new Date()
  });

  
  useEffect(() => console.log(likedImages), [,likedImages]);

  const tabs = [
    {
      id: "Home",
      content: "Home",
      accesibilityLabel: "Home",
      panelId: "Home",
    },
    {
      id: "Liked",
      content: "Liked Images",
      accesibilityLabel: "Liked",
      panelId: "Liked",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <Page
          fullWidth
          title="Images from EPIC"
          subtitle="These images were captured by DSCOVR's Earth Polychromatic Imaging Camera"
        >
          <Tabs tabs={tabs} selected={selected} onSelect={setSelected}>
            {tabs[selected].id === "Home" && (
              <Home
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                likedImages={likedImages}
                setLikedImages={setLikedImages}
              />
            )}
            {tabs[selected].id === "Liked" && (
              <Liked
                likedImages={likedImages}
                setLikedImages={setLikedImages}
              />
            )}
          </Tabs>
        </Page>
      </header>
    </div>
  );
}

export default App;