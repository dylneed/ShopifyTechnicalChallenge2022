import React from 'react';
import {MediaCard, Modal} from '@shopify/polaris';
let api_key = "qad1lSJeLRQHoMp2bhrgzAfBUJ6e6GbR2egkGlC5";

function PopupWindow({image, setImage}) {
  return (
    <Modal
      open={image != null}
      onClose={() => {setImage()}}
      title={image && image.image}
      large
    >
      <Modal.Section>
        <MediaCard
          title={image && image.caption}
          description={
            image && <>
              <p>
                Taken on {new Date(image.date).toLocaleString(
                  "en-US", {dateStyle:"full", timeStyle:"long"}
                )}
              </p>
              <p>Version: {image.version}</p>
              <br />
              <p>
                Centroid Coordinates (Latitude, Longitude): {" "}
                {image.centroid_coordinates.lat}, {image.centroid_coordinates.lon}
              </p>
              <p>
                DSCOVR J2000 Position (x, y, z): {image.dscovr_j2000_position.x}, {" "}
                {image.dscovr_j2000_position.y}, {image.dscovr_j2000_position.z} 
              </p>
              <p>
                Lunar J2000 Position (x, y, z): {image.lunar_j2000_position.x}, {" "}
                {image.lunar_j2000_position.y}, {image.lunar_j2000_position.z}
              </p>
              <p>
                Sun J2000 Position (x, y, z): {image.sun_j2000_position.x}, {" "}
                {image.sun_j2000_position.y}, {image.sun_j2000_position.z}
              </p>
              <p>
                Attitude Quaternions (q0, q1, q2, q3): {" "}
                {image.attitude_quaternions.q0}, {image.attitude_quaternions.q1}, {" "}
                {image.attitude_quaternions.q2}, {image.attitude_quaternions.q3}
              </p>
            </>
          }
        >
          <img
            src={
              image && 
              "https://api.nasa.gov/EPIC/archive/enhanced/" +
              //Date formatted for the api call
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
      </Modal.Section>
    </Modal>
  );
}

export default PopupWindow;