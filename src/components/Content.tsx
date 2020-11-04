import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./Content.scss";
import { Jumbotron } from "react-bootstrap";

interface ContentProps {
  title: string;
}

const Content: React.FC<ContentProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <Jumbotron id={title} className="content" data-testid="content">
      <h1>{t(title + ".title")}</h1>
      <p>{t(title + ".content")}</p>
    </Jumbotron>
  );
};
Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
