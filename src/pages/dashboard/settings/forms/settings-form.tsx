import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper
} from "@mui/material";
import { SketchPicker } from "react-color";
import light from "@/styles/themes/light"
import dark from "@/styles/themes/dark"


const defaultThemes = {
  light,
  dark
};

const SettingsForm = ({ onSubmit }: any) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      siteName: "",
      siteLogo: null,
      siteUrl: "",
      siteRules: "",
      theme: "light",
      colors: defaultThemes.light.colors,
    },
  });

  // const selectedTheme = watch("theme");

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Configurações da Página
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid container spacing={3}>
            {/* Nome do Site */}
            <Grid item xs={12}>
              <Controller
                name="siteName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Nome do Site" fullWidth required />
                )}
              />
            </Grid>

            {/* Upload do Logotipo */}
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setValue("siteLogo", e.target.files[0])}
              />
            </Grid>

            {/* Endereço do Site */}
            <Grid item xs={12}>
              <Controller
                name="siteUrl"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Endereço do Site (URL)" fullWidth required type="url" />
                )}
              />
            </Grid>

            {/* Regras do Site */}
            <Grid item xs={12}>
              <Controller
                name="siteRules"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Regras do Site" fullWidth multiline rows={4} required />
                )}
              />
            </Grid>

            {/* Seleção do Tema */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Configuração do Tema</InputLabel>
                <Controller
                  name="theme"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="light">Claro</MenuItem>
                      <MenuItem value="dark">Escuro</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* Configuração de Cores */}
            {Object.keys(defaultThemes.light.colors).map((color) => (
              <Grid item xs={12} sm={6} md={4} key={color}>
                <Typography>{color}</Typography>
                <Controller
                  name={`colors.${color as keyof typeof defaultThemes.light.colors}`}
                  control={control}
                  render={({ field }) => (
                    <SketchPicker
                      color={field.value}
                      onChange={(color) =>
                        setValue(`colors.${color as unknown as keyof typeof defaultThemes.light.colors}`, color.hex)}
                    />
                  )}
                />
              </Grid>
            ))}

            {/* Botão de Submit */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Salvar Configurações
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SettingsForm;
