import React from "react";
import PropTypes from "prop-types";

const EmojiLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children: string; onClick: () => void }
>(({ href, children, onClick }, ref) => (
  <a style={{ borderBottom: "none" }} ref={ref} {...{ href, onClick }}>
    {children}
  </a>
));

EmojiLink.displayName = "EmojiLink";

EmojiLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.any,
};

export default EmojiLink;
