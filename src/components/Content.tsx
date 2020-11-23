import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./Content.scss";
import { Jumbotron } from "react-bootstrap";
import { gsap } from "gsap";
import { useRef } from "react";

interface ContentProps {
  title: string;
}

const Content: React.FC<ContentProps> = ({ title }) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: contentRef.current as Element,
        toggleActions: "play none none none",
        start: "center bottom",
        end: "+=100",
        id: title,
      },
      y: 50,
      ease: "power3.out",
      opacity: 0,
      duration: 3,
    });
  }, [title]);

  return (
    <Jumbotron
      ref={contentRef}
      id={title}
      className="content"
      data-testid="content"
    >
      <h2>{t(title + ".title")}</h2>
      <p>{t(title + ".content")}</p>
    </Jumbotron>
  );
};

Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
