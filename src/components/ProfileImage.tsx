import React, { useEffect, useState } from "react";
import "./ProfileImage.scss";
import popWav from "../assets/pop.wav";
import { getUrl } from "../services/api";
import Loader from "./Loader";

const ProfileImage: React.FC = () => {
  const [pop, setPop] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    getImage().then((image) => {
      setImage(image);
    });
  }, []);

  const popSound = new Audio(popWav);

  if (image === "") {
    return (
      <div
        className={"frame " + (pop ? "pop-down" : "pop-up")}
        data-testid="ProfileImage"
      >
        <div className="profile-image">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className={"frame " + (pop ? "pop-down" : "pop-up")}>
        <img
          onMouseDown={() => {
            setPop(true);
            getImage().then((image) => {
              setImage(image);
            });
          }}
          onMouseUp={() => {
            if (pop) {
              setPop(false);
              popSound.play();
            }
          }}
          onMouseLeave={() => {
            if (pop) {
              setPop(false);
              popSound.play();
            }
          }}
          onDragStart={(e) => {
            e.preventDefault();
          }}
          className="profile-image"
          data-testid="ProfileImage"
          src={image}
          alt="Bitmoji"
        />
      </div>
    );
  }
};

function getImage() {
  return fetch(getUrl("/bitmoji"))
    .then((res) => {
      if (res.status !== 200) {
        throw res;
      }
      return res.text();
    })
    .catch((e) => {
      throw e;
    });
}

export default ProfileImage;
