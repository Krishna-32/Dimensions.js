import React, { useEffect } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

/**
 * A component that creates an infinite scrolling text menu with smooth animations
 * 
 * The menu displays a list of titles and subtitles that can be scrolled infinitely.
 * Items scale and rotate based on scroll speed for a dynamic effect.
 * Supports both mouse wheel and touch/drag interactions.
 * 
 * @component InfiniteTextMenu
 * @param {Object} props
 * @param {string[]} [props.subtitle=[]] - Array of subtitle texts to display
 * @param {string[]} [props.title=[]] - Array of title texts to display
 * @param {string} [props.bgImage=""] - URL of the background image
 * @param {string} [props.subtitleColor="#999"] - Color of the subtitle text
 * @param {string} [props.titleColor="#fff"] - Color of the title text
 * @param {string} [props.width="100vw"] - Width of the menu container
 * @param {string} [props.height="100vh"] - Height of the menu container
 * @param {string} [props.borderRadius="0"] - Border radius of the menu container
 * @param {string} [props.subtitleFontSize="10px"] - Font size for subtitles with responsive scaling
 * @param {string} [props.titleFontSize="20px"] - Font size for titles with responsive scaling
 * @returns {JSX.Element} A div containing the infinite scrolling menu
 * 
 * @example
 * // Basic usage
 * <InfiniteTextMenu 
 *   subtitle={["01", "02", "03"]}
 *   title={["First", "Second", "Third"]}
 *   bgImage="/background.jpg"
 *   subtitleColor="#999"
 *   titleColor="#fff"
 *   width="100vw"
 *   height="100vh"
 *   subtitleFontSize="10px"
 *   titleFontSize="20px"
 * />
 */
const InfiniteTextMenu = ({
  subtitle = [],
  title = [],
  bgImage = "",
  subtitleColor = "#999",
  titleColor = "#fff", 
  width = "100vw",
  height = "100vh",
  subtitleFontSize = "",
  titleFontSize = ""
}) => {
  useEffect(() => {
    const menuElement = document.querySelector(".menu");
    const menuItemElements = document.querySelectorAll(".menu-item");

    if (!menuElement || menuItemElements.length === 0) return;

    let menuItemHeight = menuItemElements[0].clientHeight;
    let totalMenuHeight = menuItemElements.length * menuItemHeight;
    let currentScrollPosition = 0;
    let lastScrollY = 0;
    let smoothScrollY = 0;

    const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

    const adjustMenuItemsPosition = (scroll) => {
      gsap.set(menuItemElements, {
        y: (index) => index * menuItemHeight + scroll,
        modifiers: {
          y: (y) => {
            const wrapperY = gsap.utils.wrap(
              -menuItemHeight,
              totalMenuHeight - menuItemHeight,
              parseInt(y)
            );
            return `${wrapperY}px`;
          },
        },
      });
    };
    adjustMenuItemsPosition(0);

    const onWheelScroll = (event) => {
      currentScrollPosition -= event.deltaY;
    };

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const onDragStart = (event) => {
      startY = event.type.includes("touch")
        ? event.touches[0].clientY
        : event.clientY;
      isDragging = true;
      menuElement.classList.add("is-dragging");
    };

    const onDragMove = (event) => {
      if (!isDragging) return;
      currentY = event.type.includes("touch")
        ? event.touches[0].clientY
        : event.clientY;
      currentScrollPosition += currentY - startY;
      startY = currentY;
    };

    const onDragEnd = () => {
      isDragging = false;
      menuElement.classList.remove("is-dragging");
    };

    const animate = () => {
      requestAnimationFrame(animate);
      smoothScrollY = lerp(smoothScrollY, currentScrollPosition, 0.1);
      adjustMenuItemsPosition(smoothScrollY);

      const scrollSpeed = smoothScrollY - lastScrollY;
      lastScrollY = smoothScrollY;

      gsap.to(menuItemElements, {
        scale: 1 - Math.min(100, Math.abs(scrollSpeed) * 0.0075),
        rotate: scrollSpeed * 0.2,
      });
    };
    animate();

    menuElement.addEventListener("wheel", onWheelScroll);
    menuElement.addEventListener("touchstart", onDragStart);
    menuElement.addEventListener("touchmove", onDragMove);
    menuElement.addEventListener("touchend", onDragEnd);
    menuElement.addEventListener("mousedown", onDragStart);
    menuElement.addEventListener("mousemove", onDragMove);
    menuElement.addEventListener("mouseleave", onDragEnd);
    menuElement.addEventListener("mouseup", onDragEnd);

    window.addEventListener("resize", () => {
      menuItemHeight = menuItemElements[0].clientHeight;
      totalMenuHeight = menuItemElements.length * menuItemHeight;
    });
  }, []);

  return (
    <div className="menu-container">
      <style>
        {`
          .menu-container {
            width: ${width};
            height: ${height};
            overflow: hidden;
            background: #000;
            color: #fff;
            position: relative;
          }
          .menu-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            user-select: none;
          }
          .menu-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .menu-img::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
              circle,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.75) 50%,
              rgba(0, 0, 0, 1) 100%
            );
            z-index: 1;
          }
          .menu {
            width: 100%;
            height: 100%;
            cursor: grab;
          }
          .menu.is-dragging {
            cursor: grabbing;
          }
          .menu-wrapper {
            list-style: none;
          }
          .menu-item {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 4em 0;
            display: flex;
            gap: 2em;
          }
          .item-category {
            flex: 2;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
          }
          .item-name {
            flex: 4;
            display: flex;
            align-items: flex-end;
          }
          .item-category p {
            text-transform: uppercase;
            user-select: none;
          }
          .item-name p {
            line-height: 90%;
            user-select: none;
          }
        `}
      </style>
      <div className="menu">
        <div className="menu-img">
          <img src={bgImage} alt="bg" />
        </div>
        <ul className="menu-wrapper">
          {title.map((titleItem, index) => (
            <li key={index} className="menu-item">
              <div className="item-category">
                <p style={{ color: subtitleColor, fontSize: subtitleFontSize }}>{subtitle[index]}</p>
              </div>
              <div className="item-name">
                <p style={{ color: titleColor, fontSize: titleFontSize }}>{titleItem}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

InfiniteTextMenu.propTypes = {
  subtitle: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.arrayOf(PropTypes.string),
  bgImage: PropTypes.string,
  subtitleColor: PropTypes.string,
  titleColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  subtitleFontSize: PropTypes.string,
  titleFontSize: PropTypes.string,
};

export { InfiniteTextMenu };
