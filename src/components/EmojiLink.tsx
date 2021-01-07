import React from "react";
import PropTypes from "prop-types";
import "./EmojiLink.scss";

const EmojiLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children: string; onClick: () => void }
>(({ href, children, onClick }, ref) => {
  return (
    <a className="EmojiLink" ref={ref} {...{ href, onClick }}>
      {children}
    </a>
  );
});

EmojiLink.displayName = "EmojiLink";

EmojiLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.any,
};

export default EmojiLink;
