import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/index'

const ImageStyles = cva([
  "break-inside-avoid",
  "mb-4",
  "overflow-hidden",
  "cursor-pointer"
],{
  variants:{
    shadow:{
      sm:"shadow-md",
      lg:"shadow-xl", 
      xl:"shadow-2xl",
      none:""
    },
    rounded:{
      sm:"rounded-md",
      lg:"rounded-lg",
      xl:"rounded-2xl",
      full:"rounded-full",
      none:""
    },
    transition:{
      hover:"hover:opacity-80 transition-all duration-300",
      zoom:"hover:scale-105 transition-all duration-300",
      all:"hover:opacity-80 hover:scale-105 transition-all duration-300",
      none:""
    }
  },
  defaultVariants:{
    shadow:"sm",
    rounded:"sm",
    transition:"hover"
  }
});

/**
 * A Pinterest-style masonry layout component that arranges child elements in a responsive grid.
 * The grid adjusts its column count based on screen size:
 * - Mobile (default): 1 column
 * - Small screens (sm): 2 columns  
 * - Medium screens (md): 3 columns
 * - Large screens (lg): 4 columns
 * - Extra large screens (xl): 5 columns
 *
 * Each item is separated by a gap and has padding around the grid.
 * Items avoid breaking across columns and maintain their aspect ratio.
 *
 * @component PintrestLayout
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to arrange in the grid
 * @param {string} [props.className=''] - Additional CSS classes for each grid item
 * @param {'sm'|'lg'|'xl'|'none'} [props.shadow='sm'] - Shadow size variant for grid items
 * @param {'sm'|'lg'|'xl'|'full'|'none'} [props.rounded='sm'] - Border radius variant for grid items
 * @param {'hover'|'zoom'|'all'|'none'} [props.transition='hover'] - Hover animation variant for grid items
 * @returns {JSX.Element} Responsive masonry grid layout
 *
 * @example
 * // Basic usage with images
 * <PintrestLayout>
 *   <img src="/image1.jpg" alt="Image 1" />
 *   <img src="/image2.jpg" alt="Image 2" />
 * </PintrestLayout>
 *
 * @example
 * // With custom styling variants
 * <PintrestLayout 
 *   className="custom-class"
 *   shadow="lg"
 *   rounded="xl"
 *   transition="zoom"
 * >
 *   <img src="/image1.jpg" alt="Image 1" />
 *   <img src="/image2.jpg" alt="Image 2" />
 * </PintrestLayout>
 */
const PintrestLayout = ({ shadow, rounded, transition, children, className }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 p-4">
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(ImageStyles({shadow, rounded, transition}), className)}
          key={index}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Prop validation
PintrestLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow: PropTypes.oneOf(['sm', 'lg', 'xl', 'none']),
  rounded: PropTypes.oneOf(['sm', 'lg', 'xl', 'full', 'none']),
  transition: PropTypes.oneOf(['hover', 'zoom', 'all', 'none'])
};

export { PintrestLayout };
