/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { ProgressBar } from 'react-progressbar-fancy'
import { Box, keyframes, Paper, Typography } from '@mui/material'
import styled from 'styled-components'
import { Key, useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { getChallengeByDate } from '@/services/challenge'
import { Loading } from '@/components/commons/loading/Loading'

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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
  margin-bottom: 10px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'icon name name percentage'
    'progress progress progress percentage';
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
  gap: 5px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const DeckPercentageContainer = styled.div`
  grid-area: percentage;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeckProgressContainer = styled.div`
  grid-area: progress;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainPage = () => {
  const [challenges, setChallenges] = useState([])

  useEffect(() => {
    const fetchChallenges = async () => {
      const actualDate = Timestamp.now()
      getChallengeByDate(actualDate, setChallenges)
    }

    fetchChallenges()
  }, [])

  const calculateScore = (challenges: any) => {
    if (!challenges || !challenges.length) {
      return []
    }

    const challengesFiltered = challenges.filter(
      (challenge: any) => challenge.challenge
    )

    const challengeMapped = challengesFiltered.map(
      (challenge: { challenge: { result: any[] | any } }) => {
        return challenge.challenge.result.map((deck: { deck: any }) => ({
          name: deck.deck.name,
          icons: deck.deck.icons,
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
    if (score < 20) {
      return 'red'
    }
    if (score >= 20 && score < 40) {
      return 'blue'
    }
    if (score >= 40 && score < 60) {
      return 'green'
    }
    return 'purple'
  }

  if (!challenges.length) {
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
        <Typography variant="h4">Meta Fantasia Geek Store</Typography>
      </Box>

      <DeckScoreContainer>
        {calculateScore(challenges)
          .sort(
            (acc: { score: number }, cur: { score: number }) =>
              cur.score - acc.score
          )
          .map(
            (
              deck: {
                icons: any[]
                name: string
                score: number
              },
              index: Key | null | undefined
            ) => (
              <Box
                key={index}
                component={Paper}
                sx={{
                  opacity: 0,
                  animation: `${fadeIn} 0.5s forwards`,
                  animationDelay: `${(index as number) * 0.1}s`,
                }}
              >
                <DeckRankingContainer>
                  <DeckIconContainer>
                    {deck.icons.map((icon, i) => (
                      <img key={i} src={icon.url} alt="icon" height={60} />
                    ))}
                  </DeckIconContainer>
                  <DeckNameContainer>
                    <Typography variant="h6">{deck.name}</Typography>
                  </DeckNameContainer>
                  <DeckProgressContainer>
                    <ProgressBar
                      hideText
                      score={deck?.score}
                      progressColor={getRandomColor(deck?.score)}
                    />
                  </DeckProgressContainer>
                  <DeckPercentageContainer>
                    <Typography variant="h4">
                      {deck.score.toFixed(1)}%
                    </Typography>
                  </DeckPercentageContainer>
                </DeckRankingContainer>
              </Box>
            )
          )}
      </DeckScoreContainer>
    </WebPageTemplate>
  )
}
