import React from "react";

const HorLine = ({ pad = 0 }) => {
  return (
    <div className="hor_line_cont" style={{ padding: `0px ${pad}px` }}>
      <div className="hor_line" />
    </div>
  );
};

export default HorLine;
