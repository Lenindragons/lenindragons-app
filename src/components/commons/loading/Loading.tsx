import ReactLoading from 'react-loading'
import { styled, useTheme } from 'styled-components'

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
`

export const Loading = () => {
  const theme = useTheme()
  return (
    <LoadingContainer>
      <ReactLoading type="spin" color={theme.primary} width={80} />
    </LoadingContainer>
  )
}
