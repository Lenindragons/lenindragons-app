import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Select, MenuItem, FormControl, FormHelperText, InputLabel } from "@mui/material";
import DateRange from "@/components/commons/date-range/Daterage";
import { useEvents } from "@/context/EventContext";
import { EventStatus, getChallengeStatus } from "@/utils/getChallengeStatus";

interface Season {
  name: string;
  id: string;
}

interface FormData {
  name: string;
  points: number;
  description: string;
  dates: Date | null;
  type: string;
  season: Season;
}

const CreateAchievementsForm = ({ values, callback }: any) => {
  const { events } = useEvents()
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: values || {
      name: "",
      type: "",
      points: 0,
      description: "",
      dates: [{ startDate: "", endDate: "" }],
      season: { name: "", id: "" }
    },
  });

  const actualEvents = events.filter((events: any) => getChallengeStatus(
    events?.dates[0]?.startDate, events?.dates[0]?.endDate
  ) === EventStatus.IN_PROGRESS)


  const onSubmit = (data: FormData) => {
    callback(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "O nome é obrigatório" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Nome"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        rules={{ required: "O tipo é obrigatório" }}
        render={({ field, fieldState }) => (
          <FormControl>
            <InputLabel id="type-label">Tipo de operação</InputLabel>
            <Select
              {...field}
              labelId="type-label"
              label="Tipo de operação"
              variant="outlined"
              error={!!fieldState.error}
              fullWidth
            >

              <MenuItem value="remove">Remover</MenuItem>
              <MenuItem value="add">Adicionar</MenuItem>
              <MenuItem value="multiply">Multiplicar</MenuItem>
              <MenuItem value="divide">Dividir</MenuItem>
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="season"
        control={control}
        rules={{ required: "A temporada é obrigatória" }}
        render={({ field, fieldState }) => (
          <FormControl>
            <InputLabel id="season-label">Temporada</InputLabel>
            <Select
              {...field}
              labelId="season-label"
              label="Temporada"
              variant="outlined"
              error={!!fieldState.error}
              fullWidth
            >
              {actualEvents.map((event: any) => (
                <MenuItem key={event.id} value={event.id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )} />

      <DateRange name="dates" control={control} />

      <Controller
        name="points"
        control={control}
        rules={{
          required: "Os pontos são obrigatórios",
          min: { value: 0, message: "Os pontos devem ser positivos" },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Pontos"
            type="number"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "A descrição é obrigatória" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Descrição"
            variant="outlined"
            multiline
            rows={3}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <Box display="flex" justifyContent="space-between">
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={() => reset()}
        >
          Limpar
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAchievementsForm;
