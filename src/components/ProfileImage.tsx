import React, { useEffect, useRef, useState } from "react";
import "./ProfileImage.scss";
import popWav from "../assets/pop.wav";
import { getUrl } from "../services/api";
import Loader from "./Loader";

const ProfileImage: React.FC<{ rotation: number }> = (props) => {
  const ref = useRef<HTMLImageElement>(null);
  const [pop, setPop] = useState(false);
  const [image, setImage] = useState("");

  const popSound = new Audio(popWav);

  useEffect(() => {
    getImage().then((image) => {
      setImage(image);
    });
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform =
        "rotate(" + props.rotation + "turn) scale(1.2)";
    }
  }, [props.rotation]);

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
          ref={ref}
          onDragStart={(ev) => {
            ev.preventDefault();
          }}
          onPointerDown={() => {
            setPop(true);
            getImage().then((image) => {
              setImage(image);
            });
          }}
          onPointerUp={() => {
            if (pop) {
              setPop(false);
              popSound.play();
            }
          }}
          onPointerLeave={() => {
            if (pop) {
              setPop(false);
              popSound.play();
            }
          }}
          onContextMenu={(ev) => {
            ev.preventDefault();
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
