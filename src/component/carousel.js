import React, { useState, useEffect } from "react";
import Logo1 from "../assets/Coffee 1.jpg";
import Logo2 from "../assets/Coffee 2.webp";
import Logo3 from "../assets/Coffee 3.jpg";
import Logo4 from "../assets/Coffee 4.jpg";
import Logo5 from "../assets/Coffee 5.webp";
import Logo6 from "../assets/Coffee 6.webp";
import Logo7 from "../assets/Coffee 7.webp";
import Logo8 from "../assets/Coffee 8.webp";

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const slides = [
    {
      id: 1,
      image: Logo1,
      caption: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      id: 2,
      image: Logo2,
      caption: "Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      image: Logo3,
      caption: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      id: 4,
      image: Logo4,
      caption: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      id: 5,
      image: Logo5,
      caption: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      id: 6,
      image: Logo6,
      caption: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      id: 7,
      image: Logo7,
      caption: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      id: 8,
      image: Logo8,
      caption: "Third slide label",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Trigger fade-out animation
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setFadeOut(false); // Reset fade-out for next image
      }, 500); // Wait for fade-out animation (0.5s) to complete
    }, 2000); // Change slide every 1.3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel">
      <img
        className={`carousel-image d-block w-100 w-[100%] h-[400px] ${
          fadeOut ? "fade-out" : ""
        }`}
        src={slides[index].image}
        alt={`Slide ${index + 1}`}
      />
    </div>
  );
};

export default CarouselComponent;
