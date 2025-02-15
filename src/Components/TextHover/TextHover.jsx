import React from "react";
import "./TextHover.css"; // Import the external CSS file

const TextHover = (props) => {
  return (
    <div className="container">
      <div className="item item-1">
        <div className="word w1">{props.t1}</div>
        <div className="img">
          <img
            src={props.img}
            alt={props.t1 + " " + props.t2}
          />
        </div>
        <div className="word w2">{props.t2}</div>
      </div>
    </div>
  );
};

export { TextHover };
