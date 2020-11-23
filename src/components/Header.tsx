import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import ProfileImage from "./ProfileImage";
import { mailto } from "../services/shared";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current as Element,
        toggleActions: "play none none none",
        start: "top top",
        end: "+=1000",
        pin: true,
        onUpdate: (self) => {
          setProgress(parseFloat(self.progress.toFixed(4)));
        },
        markers: true,
        id: "header",
      },
    });
  }, []);

  return (
    <div ref={ref} id="Header" className="Header" data-testid="Header">
      <ProfileImage rotation={progress} />
      <h1>
        <a href={mailto}>{t("greeting")} Kev Aldasoro.</a>
        {/* TODO add typing effect */}
      </h1>
    </div>
  );
};

export default Header;
