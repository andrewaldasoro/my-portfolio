import React, { useEffect, useState } from "react";
import "./ProfileImage.scss";
import popWav from "../assets/pop.wav";
import { getUrl } from "../services/api";
import Loader from "./Loader";

const ProfileImage: React.FC = () => {
  const [image, setImage] = useState("");
  useEffect(() => {
    getImage().then((image) => {
      setImage(image);
    });
  }, []);

  const [pop, setPop] = useState(false);

  const popSound = new Audio(popWav);

  if (image === "") {
    return (
      <div
        className={"frame " + (pop ? "pop" : "")}
        onAnimationEnd={() => setPop(false)}
        data-testid="ProfileImage"
      >
        <div className="profile-image">
          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={"frame " + (pop ? "pop" : "")}
        onAnimationEnd={() => setPop(false)}
      >
        <img
          onClick={() => {
            setPop(true);
            getImage().then((image) => {
              setImage(image);
            });
            popSound.play();
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
