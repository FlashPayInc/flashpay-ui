import React from "react";
import parse from "html-react-parser";
import { AppIcons, Illustrations } from "../svg";
import { NavLink } from "react-router-dom";

const EmptyStateContainer = ({ vector, text, link, type, buttonText }) => {
  return (
    <div className="empty_state">
      <div className="illustration_cover">
        <Illustrations type={vector} />
      </div>
      <div className={`text ${type === "comingsoon" ? "bold_text" : ""}`}>
        {parse(text, {
          replace: (domNode) => {
            if (domNode.attribs && domNode.attribs.id === "navlink") {
              return <NavLink to={link?.path}>{link?.text}</NavLink>;
            }
          },
        })}
      </div>
      {!!buttonText ? (
        <button>
          <AppIcons type="generatelink" />
          <p>{buttonText}</p>
        </button>
      ) : null}
    </div>
  );
};

export default EmptyStateContainer;
