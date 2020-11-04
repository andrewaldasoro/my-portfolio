import React from "react";
import { HashLink } from "react-router-hash-link";
import { Nav, Navbar as BNavbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Navbar.scss";
import Emoji from "./Emoji";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="Navbar" data-testid="Navbar">
      <BNavbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
        <BNavbar.Brand as={HashLink} to={{ pathname: "/" }}>
          {new Emoji("🏡", t("home")).render()}
        </BNavbar.Brand>
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
              <NavDropdown.Item as={HashLink} smooth to={{ pathname: "/map" }}>
                {t("map")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link
              eventKey={1}
              as={HashLink}
              to={{ pathname: "/", hash: "#bottom" }}
            >
              {new Emoji("👇", t("bottom")).render()}
            </Nav.Link>
          </Nav>
        </BNavbar.Collapse>
      </BNavbar>
    </div>
  );
};

export default Navbar;
