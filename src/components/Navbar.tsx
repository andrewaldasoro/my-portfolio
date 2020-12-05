import React, { CSSProperties } from "react";
import { HashLink } from "react-router-hash-link";
import { Nav, Navbar as BNavbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Navbar.scss";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = React.forwardRef<HTMLDivElement, { style?: CSSProperties }>(
  (props, ref) => {
    const { t } = useTranslation();

    return (
      <div style={{ position: "relative" }}>
        <BNavbar
          style={{ ...props.style, zIndex: 10 }}
          collapseOnSelect
          className="Navbar"
          expand="lg"
          bg="blue"
          variant="dark"
          data-testid="Navbar"
        >
          <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
          <BNavbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                as={HashLink}
                smooth
                to={{ pathname: "/", hash: "#summary" }}
              >
                {t("summary.title")}
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                smooth
                to={{ pathname: "/", hash: "#skills" }}
              >
                {t("skills.title")}
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                smooth
                to={{ pathname: "/", hash: "#employment" }}
              >
                {t("employment.title")}
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                smooth
                to={{ pathname: "/", hash: "#education" }}
              >
                {t("education.title")}
              </Nav.Link>
              <NavDropdown title={t("projects")} id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to={{ pathname: "/map" }}>
                  {t("map")} {new Emoji("😷", "COVID").render()}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={1} as={HashLink} to={{ hash: "#bottom" }}>
                {new Emoji("👇", t("bottom")).render()}
              </Nav.Link>
            </Nav>
          </BNavbar.Collapse>
        </BNavbar>
        <div ref={ref} className="Navbar"></div>
      </div>
    );
  }
);

Navbar.displayName = "Navbar";

Navbar.propTypes = {
  style: PropTypes.any,
};

export default Navbar;
