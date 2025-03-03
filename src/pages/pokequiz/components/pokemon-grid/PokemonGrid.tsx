import { getBackgroundImage, getPortugueseType, getSpanMargin } from "../../game/game";
import { GridTesteProps, Pokemon } from "../../game/constants/interfaces";
import {
  Container,
  GridContainer,
  GridItem,
  GridItemLabel,
  Square
} from "../../game/styles";
import { PokemonStats } from "../../game/constants/enum";
import { HabitatDictionary, PokemonColors } from "../../game/constants/constants";

export const PokemonGrid = (
  { actualItem, labels = [], items = [] }: GridTesteProps
) => {

  const hasItems = items.length

  const getResult = <K extends keyof Pokemon>(value: any, key: K) => {

    const style = {
      backgroundImage: getBackgroundImage(actualItem as Pokemon, value, key),
      spanMargin: getSpanMargin(actualItem as Pokemon, value, key)
    }

    if (actualItem) {
      return actualItem[key] === value
        ? { backgroundColor: '#0f0', color: '#000', ...style }
        : { backgroundColor: '#f00', color: '#fff', ...style }
    }
    return {
      backgroundColor: '#eee',
      color: '#000'
    }
  }

  return (
    <Container>
      <GridContainer>
        {labels.map((item, i) => (
          <Square key={i}>{item}</Square>
        ))}
      </GridContainer>

      {!hasItems &&
        (<GridItemLabel>
          {labels.map((_, i) => (
            <Square key={i}>?</Square>
          ))}
        </GridItemLabel>)}

      {items?.map((item: any, i) => (
        <GridItem key={i}>
          <Square><img src={item.sprite} /></Square>
          <Square {...getResult(item.type1, PokemonStats.TYPE1)}>
            {getPortugueseType(item.type1)}
          </Square>
          <Square {...getResult(item.type2, PokemonStats.TYPE2)}>
            {getPortugueseType(item.type2) || '-'}
          </Square>
          <Square {...getResult(item.habitat, PokemonStats.HABITAT)}>
            {HabitatDictionary[item.habitat] || item.habitat}
          </Square>
          <Square {...getResult(item.color, PokemonStats.COLOR)}>
            {PokemonColors[item.color] || item.color}
          </Square>
          <Square {...getResult(item.height, PokemonStats.HEIGHT)}>
            <span>{item.height}m</span>
          </Square>
          <Square {...getResult(item.weight, PokemonStats.WEIGHT)}>
            <span>{item.weight}kg</span>
          </Square>
        </GridItem>
      ))}
    </Container>
  );
};
