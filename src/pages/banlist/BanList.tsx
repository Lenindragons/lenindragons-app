import { WebPageTemplate } from "@/templates/webpage/WebPage"
import { Alert, Box, Paper, Typography } from "@mui/material"
import BanListImage from '../../assets/banlist-22-jan-25.png'

export const BanListPage = () => {
  return (
    <WebPageTemplate>
      <Box component={Paper} m={2} p={2}>
        <Typography variant="h4" m={3} >Lista de Cartas Banidas</Typography>
        <Alert severity="info" variant="outlined" sx={{ width: '100%', mb: 2 }}>
          <strong>Cartas banidas</strong>
          <p style={{ marginBottom: '20px' }}>
            A lista de carta faz referência apenas ao torneio <strong>off-meta</strong>.
            Essa não é uma lista oficial da <strong>Play! Pokémon</strong>.
          </p>
        </Alert>

        Criada com base na <a href="https://limitlesstcg.com/decks?format=BRS-SSP&time=all&page=1" target="_blank">lista de meta de 22 de Janeiro de 2025</a>.
      </Box>
      <img src={BanListImage} alt="Lista de cartas banidas" />
    </WebPageTemplate>
  )
}