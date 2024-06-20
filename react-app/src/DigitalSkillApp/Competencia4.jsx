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
		<Typography sx={{marginBottom: "50px"}} variant="h1" gutterBottom>SEGURIDAD</Typography>
        {/* <Typography id="quien" sx={{marginTop: "20px"}} variant="h2" gutterBottom>HU's</Typography> */}
        <Button variant="contained" href="/">Volver al inicio</Button>
        <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-1">4.1</Button>
        <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-2">4.2</Button>
        <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-3">4.3</Button>
        <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-4">4.4</Button>
	</Container>
    </>
)}