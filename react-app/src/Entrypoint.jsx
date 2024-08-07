import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from "@mui/material";

export default function Entrypoint() {
    sessionStorage.setItem("resultado3", 0);
    sessionStorage.setItem("resultado4", 0);
    const [user, setUser] = useState(null);
    const [loged, setLoged] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setUser(sessionStorage.getItem("user"));
            setLoged(true);
        }
    }, [user, loged]);

    return (
        <Container sx={{ textAlign: "center", marginTop: "30px" }}>
            <Typography sx={{ marginBottom: "50px" }} variant="h1" gutterBottom>INICIO</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Button variant="contained" href="/Creacion_Contenido_Digital">Competencia 3: Creación de Contenido Digital</Button>
                <Button variant="contained" href="/Seguridad">Competencia 4: Seguridad</Button>
            </Box>
        </Container>
    );
}
