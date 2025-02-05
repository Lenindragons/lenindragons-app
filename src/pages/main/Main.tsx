/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { ProgressBar } from 'react-progressbar-fancy'
import { Box, Divider, keyframes, Paper, Typography } from '@mui/material'
import styled from 'styled-components'
import { Key, useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { Loading } from '@/components/commons/loading/Loading'
import PokemonCard from './components/pokemon-card'
import { getChallengeByDate } from '@/services/challenge'
import { getDeckById } from '@/services/decks'
import axios from 'axios'
import { Deck } from '@/services/decks/useDeckStore'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const DeckRankingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  margin-bottom: 10px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'icon name name '
    'progress progress progress';
  width: 100%;
  padding: 10px;
`

const DeckIconContainer = styled.div`
  grid-area: icon;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeckNameContainer = styled.div`
  grid-area: name;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeckScoreContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const DeckProgressContainer = styled.div`
  grid-area: progress;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainPage = () => {
  const [challenges, setChallenges] = useState([])
  const [decks, setDecks] = useState([])

  useEffect(() => {
    const fetchChallenges = async () => {
      const actualDate = Timestamp.now()
      getChallengeByDate(actualDate, setChallenges)
    }

    fetchChallenges()
  }, [])

  useEffect(() => {
    decksWithCards()
  }, [challenges])

  const getTimestampByWeek = (weeks: number) => {
    const actualDate = Timestamp.now()
    const secondsInAWeek = 604800

    const secondsInWeeks = weeks * secondsInAWeek
    return new Timestamp(
      actualDate.seconds - secondsInWeeks,
      actualDate.nanoseconds
    )
  }

  const calculateScore = (challenges: any) => {
    if (!challenges || !challenges.length) {
      return []
    }

    const initialTimestamp = getTimestampByWeek(2)

    const challengesFiltered = challenges
      .filter((challenge: any) => challenge.challenge)
      .filter(
        (challenge: any) => challenge.dates[0].startDate >= initialTimestamp
      )

    const challengeMapped = challengesFiltered.map(
      (challenge: { challenge: { result: any[] | any } }) => {
        return challenge.challenge.result.map((deck: { deck: any }) => ({
          id: deck.deck.id,
          name: deck.deck.name,
          icons: deck.deck.icons,
          card: deck.deck?.card,
        }))
      }
    )

    const testeDecks: any[] = []
    challengeMapped.forEach((challenge: any) => {
      testeDecks.push(...challenge)
    })

    const decksReduced = testeDecks
      .reduce((acc: any, cur: any) => {
        const index = acc.findIndex((item: any) => item.name === cur.name)
        if (index === -1) {
          acc.push({ ...cur, score: 1 })
        } else {
          acc[index].score += 1
        }
        return acc
      }, [])
      .sort((acc: any, cur: any) => cur.score - acc.score)
      .slice(0, 10)

    const totalScore = decksReduced.reduce(
      (acc: number, cur: any) => acc + cur.score,
      0
    )

    const mapped = decksReduced.map((deck: any) => {
      return { ...deck, score: (deck.score * 100) / totalScore }
    })

    return mapped
  }

  const getRandomColor = (score: number) => {
    if (score < 15) {
      return 'red'
    }
    if (score >= 15 && score < 20) {
      return 'blue'
    }
    if (score >= 20 && score < 50) {
      return 'green'
    }
    return 'purple'
  }

  const decksWithCards = async () => {
    const decksWithScore = calculateScore(challenges)
    const promises = decksWithScore?.map((deck: any) => getDeckById(deck.id))
    const allDecks = await axios.all<Deck>(promises)

    const newDecks = decksWithScore
      .map((deck: any) => ({
        ...deck,
        card: allDecks.find((d: any) => d.id === deck.id)?.card
      }))
    setDecks(newDecks)
  }

  if (!decks.length) {
    return (
      <WebPageTemplate>
        <div
          style={{
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loading />
        </div>
      </WebPageTemplate>
    )
  }

  return (
    <WebPageTemplate>
      <Box
        component={Paper}
        sx={{
          padding: 2,
          width: '100%',
          marginBottom: '20px',
          marginTop: '20px',
        }}
      >
        <Typography variant="h4">
          Meta {import.meta.env.VITE_SITE_NAME}
        </Typography>
      </Box>

      <Typography variant="body1">
        Nas ultimas <strong>duas semanas</strong> os <strong>10 decks</strong>{' '}
        mais jogados na loja foram:
      </Typography>

      <Divider />
      <br />

      <DeckScoreContainer>
        {decks
          ?.sort(
            (acc: { score: number }, cur: { score: number }) =>
              cur.score - acc.score
          )
          ?.map(
            (
              deck: {
                icons: any[]
                name: string
                score: number
                card: string
              },
              index: Key | null | undefined
            ) => (
              <PokemonCard
                key={index}
                index={index}
                fadeIn={fadeIn}
                card={deck.card}>
                <DeckRankingContainer>
                  <DeckIconContainer>
                    {deck.icons.splice(0, 2).map((icon, i) => (
                      <img key={i} src={icon.url} alt="icon" height={60} />
                    ))}
                  </DeckIconContainer>
                  <DeckNameContainer>
                    <Typography variant="h6">{deck.name}</Typography>
                  </DeckNameContainer>
                  <DeckProgressContainer>
                    <ProgressBar
                      score={deck?.score}
                      progressColor={getRandomColor(deck?.score)}
                    />
                  </DeckProgressContainer>
                  {/* <DeckPercentageContainer>
                    <Typography variant="h6">
                      {deck.score.toFixed(1)}%
                    </Typography>
                  </DeckPercentageContainer> */}
                </DeckRankingContainer>
              </PokemonCard>
            )
          )}
      </DeckScoreContainer>
    </WebPageTemplate>
  )
}
