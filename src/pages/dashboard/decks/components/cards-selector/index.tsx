import { useState } from "react"
import { Controller } from "react-hook-form"
import { TextField, Grid, Card, CardMedia, CardActionArea, Typography, Box, Paper, IconButton, Alert } from "@mui/material"
import { getCardsByName } from "@/services/tcgdex"
import SearchIcon from '@mui/icons-material/Search';
import { WarningOutlined } from "@mui/icons-material";

export const CardSelector = ({ name, control }: any) => {
  const [cards, setCards] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const fetchCards = async (searchTerm: string) => {
    setLoading(true)
    try {
      const results = await getCardsByName(searchTerm)
      setCards(results)
    } catch (error: any) {
      console.error("Erro ao buscar cartas:", error.message)
      setCards([])
    }
    setLoading(false)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}
          >
            <TextField
              label="Buscar carta"
              fullWidth
              sx={{ ml: 1, flex: 1 }}
              value={value || ""}
              variant="outlined"
              margin="normal"
              onChange={(e) => onChange(e.target.value)}
            />
            <IconButton
              onClick={() => {
                fetchCards(value)
              }}
              type="button"
              sx={{ p: '10px' }}
              aria-label="buscar cartas pokemon">
              <SearchIcon />
            </IconButton>
          </Paper>
          {loading && <Alert variant="outlined" color="warning" icon={<WarningOutlined />}><Typography>Buscando cartas, isso pode demorar um pouco...</Typography></Alert>}
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {cards.map((card: any) => (
              <Grid item xs={6} sm={4} md={3} key={card.id}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      onChange(`${card?.image}`)
                      setCards([])
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`${card?.image}` || ""}
                      alt={card?.name}
                      title={card?.name}
                    />
                    <Typography variant="subtitle1" align="center">
                      {card.name}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    />
  )
}