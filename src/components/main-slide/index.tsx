import { motion } from "framer-motion";
import backgroundSlide from "../../assets/pokemon/background-slide-3.jpg";
import pokemon from "../../assets/pokemon/sylveon.png";
import { Box, Grid, Typography } from "@mui/material";

export const MainSlide = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "450px",
        overflow: "hidden",
      }}
    >
      {/* Background image with zoom effect */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${backgroundSlide}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{ scale: [1, 1.1] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />

      <Grid container sx={{ position: "relative", height: "100%" }}>
        {/* Left text section */}
        <Grid
          item
          xs={12} md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(160, 116, 148, 0.5)",
            height: "450px"
          }}
        >
          <Box textAlign="center" px={4} color="#395083">
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Liga Pokémon das Gurias
            </Typography>
            <Typography variant="h3" gutterBottom>
              de 01 Abril à 31 Julho
            </Typography>
            <Typography variant="h4">
              Todos os meses um desafio!
            </Typography>
          </Box>
        </Grid>

        {/* Right image section */}
        <Grid
          item
          xs={12} md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "450px",
          }}
        >
          <motion.img
            src={pokemon}
            alt="Lua Estrondo"
            style={{
              width: "100%",
              height: "450px",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
            whileHover={{ rotateY: 15, rotateX: -15 }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};