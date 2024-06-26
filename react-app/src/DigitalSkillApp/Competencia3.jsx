import * as React from "react";
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
  //   <>
	// <Container sx={{textAlign: "center", marginTop: "30px"}}>
	// 	<Typography sx={{marginBottom: "50px"}} variant="h1" gutterBottom>CREACION DE CONTENIDO DIGITAL</Typography>
  //       {/* <Typography id="quien" sx={{marginTop: "20px"}} variant="h2" gutterBottom>HU's</Typography> */}
  //       <Button variant="contained" href="/">Volver al inicio</Button>
  //       <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital">Basico</Button>
  //       <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital">Intermedio</Button>
  //       <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital">Avanzado</Button>
  //       {/* <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital/3-4">3.4</Button> */}

	// </Container>
  //   </>
        <>
            <Container sx={{ textAlign: "center", marginTop: "30px" }}>
                <Typography sx={{ marginBottom: "50px" }} variant="h1" gutterBottom>
                    Creación de Contenido Digital
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Button variant="contained" href="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-1">
                        Nivel Basico
                    </Button>
                    <Button variant="contained" href="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Alternativas/3-1">
                        Nivel Intermedio
                    </Button>
                    <Button variant="contained" href="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Alternativas/3-1">
                        Nivel Avanzado
                    </Button>
                    <Button variant="contained" href="/">
                        Volver al inicio
                    </Button>
                </Box>
            </Container>
        </>
)}