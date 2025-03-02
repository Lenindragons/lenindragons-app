import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

interface SquareProps {
  backgroundColor?: string;
  backgroundImage?: string;
  color?: string;
  spanMargin?: string;
}

// Estilização do quadrado
export const Square = styled.div<SquareProps>`
  opacity: 0;
  transform: scale(0.8);
  animation: ${fadeIn} 0.5s ease-out forwards;
  text-transform: capitalize;
  font-weight: bold;
  letter-spacing: 1px;
  background-color: ${(props) => props?.backgroundColor} !important;
  background-image: ${(props) => props?.backgroundImage};
  background-size: cover;
  color: ${(props) => props?.color};

  span {
    margin: ${(props) => props?.spanMargin};
    border: ${(props) => props?.spanMargin !== '0' ? '3px solid #fff' : 'none !important'};
    padding: 0 10px;
  }
`

// Grid para os quadrados
export const GridContainer = styled.li`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;

  div {
    background-color: transparent !important;
  }

  ${Square}:nth-child(1) { animation-delay: 0s; }
  ${Square}:nth-child(2) { animation-delay: 0.3s; }
  ${Square}:nth-child(3) { animation-delay: 0.6s; }
  ${Square}:nth-child(4) { animation-delay: 0.9s; }
  ${Square}:nth-child(5) { animation-delay: 1.2s; }
  ${Square}:nth-child(6) { animation-delay: 1.5s; }
  ${Square}:nth-child(7) { animation-delay: 1.8s; }
  ${Square}:nth-child(8) { animation-delay: 2.1s; }
  ${Square}:nth-child(9) { animation-delay: 2.4s; }
`;

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  font-size: 20px;
`

export const GridItem = styled.li`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;

  div {
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    background-color: #eee;
    font-size: 20px;
    border-radius: 5px;
    text-align: center;
  }

  ${Square}:nth-child(1) { animation-delay: 0s; }
  ${Square}:nth-child(2) { animation-delay: 0.3s; }
  ${Square}:nth-child(3) { animation-delay: 0.6s; }
  ${Square}:nth-child(4) { animation-delay: 0.9s; }
  ${Square}:nth-child(5) { animation-delay: 1.2s; }
  ${Square}:nth-child(6) { animation-delay: 1.5s; }
  ${Square}:nth-child(7) { animation-delay: 1.8s; }
  ${Square}:nth-child(8) { animation-delay: 2.1s; }
  ${Square}:nth-child(9) { animation-delay: 2.4s; }
`

export const GridItemLabel = styled(GridItem)`
  div {
    font-weight: bold;
    font-size: 50px;
  }
`