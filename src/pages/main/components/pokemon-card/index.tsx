import { Card, CardContent, Box } from "@mui/material";

const PokemonCard = ({ children, fadeIn, key, card }: any) => {

  const image = card || "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/tpci/OBF/OBF_125_R_PT.png"
  return (
    <Box
      key={key}
      sx={{
        opacity: 0,
        animation: `${fadeIn} 0.5s forwards`,
        animationDelay: `${(key as number) * 0.1}s`,
      }}
    >
      <Card
        sx={{
          position: "relative",
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "0px -100px",
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Card
          sx={{
            width: "95%",
            height: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </Card>
    </Box>
  );
};

export default PokemonCard;

