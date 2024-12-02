import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Alert,
  AlertTitle,
} from '@mui/material'
import { WebPageTemplate } from '../../templates/webpage/WebPage'

export const RulesPage = () => {
  return (
    <WebPageTemplate>
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Regras Gerais
          </Typography>
          <Alert severity="warning">
            <AlertTitle>Atenção</AlertTitle> Todas as regras propostas aqui são
            de uso exclusivo da loja em torneios não oficiais. Para os torneios
            <strong> OFICIAIS</strong> (challenges e cups) realizados na loja,
            continuam a valer as regras OFICIAIS definidas pela Pokémon Company
            e COPAG.
          </Alert>
          <br />
          <Typography variant="h5" component="h2" gutterBottom>
            Modelos
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="tabela de regras de torneio">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Modelo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Tempo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Formato</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Marcas Regulamentadas</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Idiomas Permitidos</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>STANDARD</TableCell>
                  <TableCell>45 min/Rodada</TableCell>
                  <TableCell>Suíço md3 (md1 por votação)</TableCell>
                  <TableCell>F, G e H</TableCell>
                  <TableCell>Português, Espanhol e Inglês</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pré Release</TableCell>
                  <TableCell>45 min/Rodada</TableCell>
                  <TableCell>Suíço md3</TableCell>
                  <TableCell>
                    Não applicável, cartas de coleções novas
                  </TableCell>
                  <TableCell>Português</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Off-meta</TableCell>
                  <TableCell>45 min/Rodada</TableCell>
                  <TableCell>Suíço md3</TableCell>
                  <TableCell>
                    F, G e H , respeitando a lista de cartas banidas
                  </TableCell>
                  <TableCell>Português, Espanhol e Inglês</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Baby</TableCell>
                  <TableCell>45 min/Rodada</TableCell>
                  <TableCell>Suíço md3</TableCell>
                  <TableCell>
                    F, G e H , permitido apenas cartas sem caixa de regras
                  </TableCell>
                  <TableCell>Português, Espanhol e Inglês</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <Typography variant="h5" component="h2" gutterBottom>
            Sobre Votação
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sempre que houver interesse em modificar o formato do torneio entre
            md3 e md1 (melhor de 3 ou melhor de 1), será feita uma votação via
            enquete no grupo da loja. Somente os votos dos presentes no torneio
            serão contabilizados, para respeitar o interesse exclusivo dos
            participantes.
          </Typography>
          <br />
          <Typography variant="h5" component="h2" gutterBottom>
            Sobre Cartas de Novas Coleções
          </Typography>
          <Typography variant="body1" gutterBottom>
            Será permitido o uso de cartas de novas coleções em torneios NÃO
            OFICIAIS a partir do momento em que forem lançadas no Brasil.
          </Typography>
          <br />
          <Typography variant="h5" component="h2" gutterBottom>
            Sobre Proxies
          </Typography>
          <Typography variant="body1" gutterBottom>
            Para utilização de proxies nos decks, é solicitado que sigam as
            seguintes diretrizes:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>Uso do bom senso:</strong> As proxies são para
                    ajustes de lista de baralho. Um baralho não deve ser nem
                    completo e nem em maioria construído com proxies. Em caso de
                    dúvida, procure um Juiz da loja para validar sua lista.
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <blockquote>
                "A carta original da Pokémon será sempre a melhor opção para
                utilização em torneios."
                <br />– Sandro Miranda (Organizador)
              </blockquote>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>Impressas e legíveis:</strong> As proxies devem ser
                    réplicas impressas das cartas verdadeiras, com todas as
                    informações pertinentes à carta presentes e legíveis.
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>Coleções novas:</strong> Podem ser feitas proxies de
                    coleções novas desde que já tenham sido lançadas no Brasil.
                  </>
                }
              />
            </ListItem>
          </List>

          <p>
            <strong>
              Este documento pode sofrer atualizações, mas sua essência
              permanecerá a mesma.
            </strong>
          </p>
        </Box>
      </Container>
    </WebPageTemplate>
  )
}
