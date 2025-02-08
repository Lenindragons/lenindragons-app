import { useState } from "react";
import { Grid, Pagination, Box } from "@mui/material";

export const PaginateItems = ({ items = [], itemsPerPage = 8, initialPage = 1 }) => {
  const [page, setPage] = useState(initialPage)

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ width: "100%", textAlign: "center", p: 2 }}>
      <Grid container spacing={2} sx={{ minHeight: "260px", alignContent: 'start' }}>
        {paginatedItems.map((item) => item)}
      </Grid>
      <Pagination
        count={Math.ceil(items.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
