import { useState } from 'react'
import styled from 'styled-components'

type SliderImage = {
  length: number
}

type SliderProps = {
  images: SliderImage[]
}

const ImageSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100%;

  img {
    max-width: 100% !important;
    width: 100% !important;
    display: block;
    max-height: 500px; /* Defina a altura máxima desejada */
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px 15px;
    font-size: 20px;
  }

  button:first-child {
    left: 10px;
  }

  button:last-child {
    right: 10px;
  }
`

const ImageSlider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  if (images.length === 0) return null

  return (
    <ImageSliderContainer>
      <button type="button" onClick={prevSlide}>
        &lt;
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button type="button" onClick={nextSlide}>
        &gt;
      </button>
    </ImageSliderContainer>
  )
}

export default ImageSlider
