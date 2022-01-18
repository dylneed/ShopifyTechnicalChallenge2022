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

  useEffect(() => {
    localStorage.getItem("likedImages") && setLikedImages(
      JSON.parse(localStorage.getItem("likedImages"))
    )
  }, []);
  useEffect(() => {
    localStorage.setItem("likedImages", JSON.stringify(likedImages))
  }, [likedImages]);

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
          subtitle={
            <>
              <p>
                These images were captured by DSCOVR's Earth Polychromatic Imaging Camera.
                The link for the GitHub Repo can be found {" "}
                <a
                  href="https://github.com/dylneed/ShopifyTechnicalChallenge2022"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  here
                </a>.
              </p>
            </>
          }
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