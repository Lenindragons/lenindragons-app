import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

interface FormData {
  name: string;
  points: number;
  description: string;
  dates: Date | null;
}

const CreateAchievementsForm = ({ values, callback }: any) => {
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: values || {
      name: "",
      points: 0,
      description: "",
      dates: null,
    },
  });

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
