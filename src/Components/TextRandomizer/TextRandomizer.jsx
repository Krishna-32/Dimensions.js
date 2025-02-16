import React, { useState } from "react";
import PropTypes from 'prop-types';

/**
 * TextRandomizer component that creates a text animation effect when hovered
 * Each character of the text is randomly changed before settling on the original text
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The text content to be animated
 * @returns {JSX.Element} Animated text component
 * 
 * @example
 * <TextRandomizer>Hello World</TextRandomizer>
 */
const TextRandomizer = ({ children }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const text = children?.toString() || '';
  const [displayedText, setDisplayedText] = useState(text);

  const handleMouseOver = (event) => {
    let iteration = 0;
    const originalText = text;
    const target = event.target;
    let interval;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      setDisplayedText((prevText) =>
        prevText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    // Clear the interval when mouse leaves
    target.onmouseleave = () => {
      clearInterval(interval);
      setDisplayedText(originalText); // Reset the text when mouse leaves
    };
  };

  return (
    <h1
      className="animated-text cursor-pointer inline-block uppercase"
      onMouseOver={handleMouseOver}
      data-value={text}
    >
      {displayedText}
    </h1>
  );
};

TextRandomizer.propTypes = {
  children: PropTypes.node.isRequired
};

export { TextRandomizer };