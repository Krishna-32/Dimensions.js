import React from "react";
import PropTypes from "prop-types";

/**
 * TextHover component that displays two text elements with a hoverable image between them
 * @param {Object} props - Component props
 * @param {string} props.t1 - Text to display on the left side
 * @param {string} props.t2 - Text to display on the right side
 * @param {string} props.img - URL of the image to display in the center
 * @param {string} [props.textColor="#000000"] - Color of the text
 * @param {string} [props.borderColor="#000000"] - Color of the bottom border
 * @returns {JSX.Element} TextHover component
 * @example
 * // Basic usage
 * <TextHover 
 *   t1="Hello"
 *   t2="World"
 *   img="/path/to/image.jpg"
 * />
 * 
 * // With custom colors
 * <TextHover
 *   t1="Left Text"
 *   t2="Right Text"
 *   img="/path/to/image.jpg"
 *   textColor="#FF0000"
 *   borderColor="#0000FF"
 * />
 */
const TextHover = (props) => {
  return (
    <>
      <style>
        {`
.body {
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}

.container {
 width: 90%;
 max-width: 1200px;
 padding: 0 2em;
 color: ${props.textColor};
}

.container .item {
 width: 100%;
 padding: 1vh 0;
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 0.5vw;
 font-size: 5vw;
 border-bottom: 2px solid ${props.borderColor};
 cursor: pointer;
 transition: all 0.3s ease-in-out;
}

.img {
 height: 12vw;
 background-color: black;
 transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
 overflow: hidden;
 flex: 0;
 display: flex;
 justify-content: center;
 align-items: center;
}

img {
 width: 100%;
 height: 100%;
 object-fit: cover;
}

.item:hover {
 gap: 1vw;
}

.item:hover .img {
 flex: 0.25;
 height: 12vw;
}

.w1 {
 text-align: right;
}

@media (max-width: 768px) {

 .container .item {
   font-size: 6vw;
   gap: 0.5vw;
 }
  .container .item:hover {
   gap: 1vw;
 }
 .img {
   height: 13vw;
 }
 .item:hover .img {
   flex: 0.3;
   height: 13vw;
 }
}

@media (max-width: 480px) {

 .container .item {
   font-size: 6vw;
   gap: 0.5vw;
 }
  .container .item:hover {
   gap: 1vw;
 }
 .img {
   height: 15vw;
 }
 .item:hover .img {
   flex: 0.4;
   height: 15vw;
 }
}
      `}
      </style>
      <div className="body">
        <div className="container">
          <div className="item item-1">
            <div className="word w1">{props.t1}</div>
            <div className="img">
              <img src={props.img} alt={props.t1 + " " + props.t2} />
            </div>
            <div className="word w2">{props.t2}</div>
          </div>
        </div>
      </div>
    </>
  );
};

TextHover.propTypes = {
  t1: PropTypes.string,
  t2: PropTypes.string,
  img: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  borderColor: PropTypes.string
};

TextHover.defaultProps = {
  textColor: "#000000",
  borderColor: "#000000",
  t1: "",
  t2: ""
};

export { TextHover };
