import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import React from "react"
import PropTypes from "prop-types"

/**
 * A component that creates an animated marquee/ticker effect with text
 * 
 * The text scrolls horizontally in a continuous loop at a specified speed.
 * The animation pauses when the marquee is not visible in the viewport.
 * 
 * @component Marquee
 * @param {Object} props
 * @param {string} props.text - The text content to display in the marquee
 * @param {number} [props.speed=50] - The scrolling speed in pixels per second
 * @param {string} [props.gap="2rem"] - The spacing between repeated text elements
 * @returns {JSX.Element} A div containing the scrolling marquee text
 * 
 * @example
 * // Basic usage
 * <Marquee text="Scrolling text here" />
 * 
 * // Custom speed and gap
 * <Marquee 
 *   text="Custom marquee"
 *   speed={100}
 *   gap="3rem"
 * />
 */
const Marquee = ({ text, speed = 50, gap = "2rem" }) => {
  const marqueeRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return

    const marquee = marqueeRef.current
    const content = contentRef.current

    // Calculate the width of the content
    const contentWidth = content.offsetWidth

    // Clone the content multiple times to ensure seamless looping
    const totalClones = Math.ceil(marquee.offsetWidth / contentWidth) + 1

    for (let i = 0; i < totalClones; i++) {
      const clone = content.cloneNode(true)
      marquee.appendChild(clone)
    }

    // Set up GSAP animation
    gsap.set(marquee, { x: 0 })

    const tl = gsap.timeline({ repeat: -1 })

    tl.to(marquee, {
      x: -contentWidth,
      duration: contentWidth / speed,
      ease: "none",
      onComplete: () => {
        gsap.set(marquee, { x: 0 })
      },
    })

    // Pause animation when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play()
        } else {
          tl.pause()
        }
      },
      { threshold: 0 },
    )

    observer.observe(marquee)

    // Cleanup
    return () => {
      tl.kill()
      observer.disconnect()
    }
  }, [speed])

  return (
    <div className="overflow-hidden w-full">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        <div ref={contentRef}>
          <span style={{ paddingRight: gap }}>{text}</span>
        </div>
      </div>
    </div>
  )
}

Marquee.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  gap: PropTypes.string
}

export { Marquee }
