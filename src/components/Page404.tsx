import React from "react";
import { useLocation } from "react-router-dom";

const Page404: React.FC = () => (
  <div>No encontramos la pagina {useLocation().pathname}</div>
);

export default Page404;
