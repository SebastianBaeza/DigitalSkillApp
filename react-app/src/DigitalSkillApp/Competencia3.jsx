import * as React from "react";
import {useEffect, useState} from 'react';
import { Container, Typography, Grid, Button} from "@mui/material";

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
    <>
	<Container sx={{textAlign: "center", marginTop: "30px"}}>
		<Typography sx={{marginBottom: "50px"}} variant="h1" gutterBottom>CREACION DE CONTENIDO DIGITAL</Typography>
        {/* <Typography id="quien" sx={{marginTop: "20px"}} variant="h2" gutterBottom>HU's</Typography> */}
        <Button variant="contained" href="/">Volver al inicio</Button>
        <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital/3-1">3.1</Button>
        <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital/3-2">3.2</Button>
        <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital/3-3">3.3</Button>
        <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital/3-4">3.4</Button>

        {/* <Button variant="contained" href="/HUs/HU5">HU5</Button>
        <Button variant="contained" href="/HUs/HU6">HU6</Button>
        <Button variant="contained" href="/HUs/HU7">HU7</Button>
        <Button variant="contained" href="/HUs/HU8">HU8</Button>
        <Button variant="contained" href="/HUs/HU9">HU9</Button> */}
	</Container>
    </>
)}