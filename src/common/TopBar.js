import React from "react";
import { AppIcons } from "../svg";

const TopBar = ({ main, sub, button1, button2 }) => {
  return (
    <div className="top_bar">
      <div className="main">
        <p>{main}</p>
        <div className="bar_buttons">
          {button1 ? (
            <button className="filter_button">
              <AppIcons type="filter" />
              <p>Filter</p>
            </button>
          ) : null}
          {button2 ? (
            <button className="generate_link">
              <AppIcons type="generatelink" />
              <p>Generate link</p>
            </button>
          ) : null}
        </div>
      </div>
      <div className="sub">{sub}</div>
    </div>
  );
};

export default TopBar;
