import React, { useEffect, useState } from "react";
import "./ProfileImage.scss";
import popWav from "../assets/pop.wav";
import { getUrl } from "../services/api";
import Loader from "./Loader";

let timeout: NodeJS.Timeout;
let realPop = false;

const ProfileImage: React.FC = () => {
  const [pop, setPop] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    getImage().then((image) => {
      setImage(image);
    });
  }, []);

  const popSound = new Audio(popWav);

  function setRealPop(value: boolean): void {
    setPop(value);
    realPop = value;
  }

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
            setRealPop(true);
            getImage().then((image) => {
              setImage(image);
            });

            timeout = setTimeout(() => {
              if (realPop) {
                setRealPop(false);
                popSound.play();
              }
            }, 500);
          }}
          onMouseUp={() => {
            if (pop) {
              clearTimeout(timeout);
              setRealPop(false);
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
