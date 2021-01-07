import React, { ReactElement, useEffect } from "react";
import PropTypes from "prop-types";
import "./Content.scss";
import { gsap } from "gsap";
import { useRef } from "react";

interface ContentProps {
  title: string;
  children: ReactElement;
}

const Content: React.FC<ContentProps> = ({ title, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.from(ref.current, {
  //     scrollTrigger: {
  //       trigger: ref.current as Element,
  //       toggleActions: "play none none none",
  //       start: "-50px",
  //       end: "+=100",
  //       pin: true,
  //       id: title,
  //     },
  //   });
  // }, [title]);

  return (
    <div ref={ref} id={title} className="content" data-testid="content">
      {children}
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Content;
