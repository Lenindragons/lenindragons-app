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
  gap: 0px;
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
    if (!challenges && challenges?.length) {
      return []
    }
    const decks = challenges.reduce(
      (
        acc: { name: any; icons: any[]; score: number }[],
        challenge: {
          challenge: { result: { deck: { name: string; icons: any[] } }[] }
        }
      ) => {
        challenge.challenge.result.forEach(
          ({ deck }: { deck: { name: string; icons: any[] } }) => {
            const deckIndex = acc.findIndex((d) => d.name === deck.name)
            if (deckIndex === -1) {
              acc.push({ name: deck.name, icons: deck.icons, score: 0 })
            } else {
              acc[deckIndex].score += 100 / challenges.length
            }
          }
        )
        return acc
      },
      []
    )

    return decks
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
        {challenges.length &&
          calculateScore(challenges)
            .sort(
              (acc: { score: number }, cur: { score: number }) =>
                cur.score - acc.score
            )
            .slice(0, 6)
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
                        score={deck?.score || 0}
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
