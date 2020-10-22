import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./Content.scss";

interface ContentProps {
  title: string;
}

const Content: React.FC<ContentProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t(title + ".title")}</h1>
      <div id={title} className="content" data-testid="content">
        {t(title + ".content")}
      </div>
    </div>
  );
};
Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
