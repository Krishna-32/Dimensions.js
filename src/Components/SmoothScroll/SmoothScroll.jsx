import React, { useEffect } from 'react'
import LocomotiveScroll from "locomotive-scroll";
import PropTypes from 'prop-types';

/**
 * A component that adds smooth scrolling functionality using Locomotive Scroll
 * 
 * @component SmoothScroll
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to enable smooth scrolling on
 * @returns {JSX.Element} A wrapper component with smooth scrolling enabled
 * 
 * @example
 * // Basic usage
 * <SmoothScroll>
 *   <div>
 *     <h1>My Content</h1>
 *     <p>This content will have smooth scrolling</p>
 *   </div>
 * </SmoothScroll>
 */
function SmoothScroll({ children }) {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    
    return () => {
      locomotiveScroll.destroy();
    }
  }, []);

  return (
    <div data-scroll-container>
      {children}
    </div>
  );
}

SmoothScroll.propTypes = {
  children: PropTypes.node.isRequired
};

export { SmoothScroll }