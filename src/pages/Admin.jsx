import React from "react";
import {Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Layout from "./layout";

const Admin = () => {
  return (
    <Layout>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Panel de Administración
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Gestión de Usuarios</Typography>
            <p>Aquí puedes ver y administrar usuarios.</p>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Gestión de Productos</Typography>
            <p>Administra la ropa disponible en el sistema.</p>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Admin;
