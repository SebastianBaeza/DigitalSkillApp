import {useEffect, useState} from 'react';
import { Container, Typography, Box, Button} from "@mui/material";

export default function Entrypoint() {
    const [user, setUser] = useState(null);
    const [loged, setLoged] = useState(false);
  
    useEffect(() => {
      if (sessionStorage.getItem("user")){ // Maybe you could create a view that sets the user in the sessionStorage O:
        setUser(sessionStorage.getItem("user"));
        setLoged(true); 
      }
    }, [user, loged]);
  
  return (
    <Container sx={{ textAlign: "center", marginTop: "30px" }}>
      <Typography sx={{ marginBottom: "50px" }} variant="h1" gutterBottom>Creación de Contenido Digital</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" href="/Seguridad/Basico/Pregunta_Alternativas/4-1">Nivel Basico</Button>
        <Button variant="contained" href="/Seguridad/Intermedio/Pregunta_Alternativas/4-1">Nivel Intermedio</Button>
        <Button variant="contained" href="/Seguridad/Avanzado/Pregunta_Alternativas/4-1">Nivel Avanzado</Button>
        <Button variant="contained" href="/">Volver al inicio</Button>
      </Box>
    </Container>
  )
}