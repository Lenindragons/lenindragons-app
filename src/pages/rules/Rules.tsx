import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { WebPageTemplate } from '../../templates/webpage/WebPage'

export const RulesPage = () => {
  return (
    <WebPageTemplate>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Torneios da Fantasia
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Modelo STANDARD
          </Typography>
          <Typography variant="body1" gutterBottom>
            Horário: 19h
          </Typography>
          <Typography variant="body1" gutterBottom>
            Formato: Suiço md3 (md1 por votação)
          </Typography>
          <Typography variant="body1" gutterBottom>
            Tempo: 45min/Rodada
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Para permissão de proxy leia as regras" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Para permissão de coleções novas leia as regras" />
            </ListItem>
          </List>
          <Typography variant="h5" component="h3" gutterBottom>
            Regras:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Votações: Sempre será feita previamente no grupo do whatsapp, e só
            será contabilizado os votos dos que estiverem presentes no torneio.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Coleções novas:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Permitido coleções novas, desde que a coleção tenha sido lançada no Brasil." />
            </ListItem>
          </List>
          <Typography variant="body1" gutterBottom>
            Proxy:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Esta liberadas (use-as com Bom senso)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Deve ser impressa a replica da carta e suas informações devem estar legíveis." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Cartas de coleções novas podem ser usadas como proxy respeitando a data de lançamento da coleção." />
            </ListItem>
          </List>
        </Box>
      </Container>
    </WebPageTemplate>
  )
}
