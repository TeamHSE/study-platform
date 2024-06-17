import React from "react";
import { Button } from "react-bootstrap";
import { DASHBOARD_PAGE } from "@/constants/pages-url.constants";

const CallToActionSection = () => {
  return (
    <div className="call-to-action bg-secondary text-white text-center py-5 landing-section">
      <h2 className="py-5">Готовы приступить?</h2>
      <Button href={ DASHBOARD_PAGE } className="btn btn-primary">Давайте начнем!</Button>
    </div>
  );
};

export default CallToActionSection;
