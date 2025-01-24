import React from "react";
// import { PintrestLayout } from "dimensions-js";
import { TextRandomizer } from "dimensions-js";
// ... existing code ...
import "dimensions-js/styles";

const App = () => {
  // const images = [
  //   "/1.jpg",
  //   "/2.jpg",
  //   "/3.jpg",
  //   "/4.jpg",
  //   "/5.jpg",
  //   "/6.jpg",
  //   "/7.jpg",
  // ];

  return (
    <>
      {/* <PintrestLayout shadow="sm" rounded="xl" transition="all" className="border-2 border-black ">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Pinterest Item ${index}`}
            // className="h-auto w-full rounded-lg shadow-md"
          />
        ))}
      </PintrestLayout> */}
      <div className="text-center">
        <TextRandomizer>Hello</TextRandomizer>
      </div>
    </>
  );
};

export default App;
