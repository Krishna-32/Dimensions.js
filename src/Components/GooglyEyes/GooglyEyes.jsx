import { useState, useEffect, useRef } from "react"
import React from "react"
import PropTypes from "prop-types"

/**
 * A component that renders a pair of googly eyes that track mouse movement
 * 
 * The eyes consist of white scleras with black pupils that follow the mouse cursor.
 * The pupils move realistically within the eye bounds based on mouse position.
 * 
 * @component GooglyEyes
 * @param {Object} props
 * @param {string} [props.eyeSize="150px"] - The width and height of each eye
 * @param {string} [props.eyeColor="white"] - The background color of the eye sclera
 * @param {string} [props.pupilSize="60px"] - The width and height of each pupil
 * @param {string} [props.pupilColor="black"] - The color of the pupils
 * @param {string} [props.borderWidth="2px"] - The width of the eye border
 * @param {string} [props.borderColor="black"] - The color of the eye border
 * @param {string} [props.eyeGap="2rem"] - The spacing between the two eyes
 * @returns {JSX.Element} A div containing two interactive googly eyes
 * 
 * @example
 * // Basic usage with default props
 * <GooglyEyes />
 * 
 * // Custom styling
 * <GooglyEyes 
 *   eyeSize="200px"
 *   eyeColor="lightblue"
 *   pupilSize="80px"
 *   pupilColor="darkblue"
 *   borderWidth="4px"
 *   borderColor="#000"
 *   eyeGap="3rem"
 * />
 */
const GooglyEyes = ({ 
  eyeSize = "150px",
  eyeColor = "white", 
  pupilSize = "60px",
  pupilColor = "black",
  borderWidth = "2px",
  borderColor = "black",
  eyeGap = "2rem"
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const eyesRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const calculatePupilPosition = (eyeRect) => {
    const eyeCenterX = eyeRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top + eyeRect.height / 2

    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX)
    const distance = Math.min(eyeRect.width / 4, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY))

    const pupilX = Math.cos(angle) * distance
    const pupilY = Math.sin(angle) * distance

    return { x: pupilX, y: pupilY }
  }

  const containerStyle = {
    display: "inline-flex",
    alignItems: "center",
  }

  const eyesStyle = {
    display: "flex",
    gap: eyeGap,
  }

  const eyeStyle = {
    position: "relative",
    width: eyeSize,
    height: eyeSize,
  }

  const scleraStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: eyeColor,
    border: `${borderWidth} solid ${borderColor}`,
    borderRadius: "50%",
  }

  const pupilStyle = {
    position: "absolute",
    width: pupilSize,
    height: pupilSize,
    backgroundColor: pupilColor,
    borderRadius: "50%",
    top: "50%",
    left: "50%",
  }

  return (
    <div style={containerStyle}>
      <div ref={eyesRef} style={eyesStyle}>
        {[0, 1].map((index) => (
          <div key={index} style={eyeStyle}>
            {/* Eye */}
            <div style={scleraStyle}></div>
            {/* Pupil */}
            <div
              style={{
                ...pupilStyle,
                transform: eyesRef.current
                  ? `translate(calc(-50% + ${calculatePupilPosition(eyesRef.current.children[index].getBoundingClientRect()).x}px), 
                     calc(-50% + ${calculatePupilPosition(eyesRef.current.children[index].getBoundingClientRect()).y}px))`
                  : "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

GooglyEyes.propTypes = {
  eyeSize: PropTypes.string,
  eyeColor: PropTypes.string,
  pupilSize: PropTypes.string,
  pupilColor: PropTypes.string,
  borderWidth: PropTypes.string,
  borderColor: PropTypes.string,
  eyeGap: PropTypes.string
}

export { GooglyEyes }
