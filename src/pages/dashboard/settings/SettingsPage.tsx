import { Box } from "@mui/material"
import SettingsForm from "./forms/settings-form";

export const SettingsPage = () => {
  const handleFormSubmit = (data: any) => {
    console.log("Configurações Salvas:", data);
  };

  return (
    <Box sx={{ margin: '16px', padding: '16px' }}>
      <SettingsForm onSubmit={handleFormSubmit} />
    </Box>
  )
}
