import React, { useEffect } from 'react'
import gsap from 'gsap'

function AnimatedLoader() {

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const wrapperWidth = 180;
    const finalPosition = windowWidth - wrapperWidth;
    const stepDistance = finalPosition / 6;

    const tl = gsap.timeline();

    // Initial animation
    tl.to(".count", {
      x: -900,
      duration: 0.85,
      delay: 0.5,
      ease: 'power4.inOut',
    })

    // Sequence of animations
    for (let i = 0; i <= 6; i++) {
      const xPos = -900 + i * 180;
      tl.to(".count", {
        x: xPos,
        duration: 0.85,
        ease: 'power4.inOut',
        onStart: () => {
          gsap.to(".count-wrapper", {
            x: stepDistance * i,
            duration: 0.85,
            ease: 'power4.inOut',
          })
        },
      })
    }
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className='main-loader'>
      <div className='loader fixed top-0 left-0 w-full h-full bg-black text-white flex items-end overflow-hidden'>
        <div className="count-wrapper" style={{
          position: 'relative',
          width: '180px',
          height: '360px',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          willChange: 'transform'
        }}>
          <div className="count" style={{
            position: 'relative',
            width: '1080px',
            height: '360px',
            display: 'flex',
            transform: 'translateX(-1080px)',
            willChange: 'transform'
          }}>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>9</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>8</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>7</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>4</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>2</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>0</h1></div>
          </div>
        </div>

        <div className="count-wrapper" style={{
          position: 'relative',
          width: '180px',
          height: '360px',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          willChange: 'transform'
        }}>
          <div className="count" style={{
              position: 'relative',
              width: '1080px',
              height: '360px',
              display: 'flex',
              transform: 'translateX(-1080px)',
              willChange: 'transform'
            }}>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>9</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>5</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>9</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>7</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>4</h1></div>
            <div className="digit relative w-[180px] h-[360px]"><h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-[360px] font-light leading-none'>0</h1></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AnimatedLoader };