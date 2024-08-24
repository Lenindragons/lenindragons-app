/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { ProgressBar } from 'react-progressbar-fancy'
import { Box, Paper, Typography } from '@mui/material'
import styled from 'styled-components'
import { Key, useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { getChallengeByDate } from '@/services/challenge'

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
    const challengeMapped = challenges.map(
      (challenge: { challenge: { result: any[] } }) => {
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

  const getRandomColor = () => {
    const colors = ['purple', 'red', 'green', 'blue']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex] || 'red'
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

      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr ',
          gap: 5,
        }}
      >
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
              <Box key={index} component={Paper}>
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
                      progressColor={
                        getRandomColor() as
                        | 'purple'
                        | 'red'
                        | 'green'
                        | 'blue'
                        | undefined
                      }
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
      </div>
    </WebPageTemplate>
  )
}
