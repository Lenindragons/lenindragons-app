import { styled } from "styled-components"

const ResultContainer = styled.div`
  text-align: center;

  h2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 20px;
  }

  img { border: 1px solid #ccc; }
`

export const Result = ({ pokemon, isRevealed }: any) => {
  return (
    <ResultContainer>
      {!isRevealed && <h2>Parabéns! Você acertou!</h2>}
      <h3>{pokemon.text}</h3>
      <img src={pokemon.image} alt={pokemon.name} />
    </ResultContainer>
  )
}