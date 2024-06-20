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
		<Typography sx={{marginBottom: "50px"}} variant="h1" gutterBottom>MENU DE TESTS</Typography>
        <Typography id="quien" sx={{marginTop: "20px"}} variant="h2" gutterBottom>HU's</Typography>
        <Button variant="contained" href="/">Entrypoint</Button>
        <Button variant="contained" href="/HUs/HU1">HU1</Button>
        <Button variant="contained" href="/HUs/HU2">HU2</Button>
        <Button variant="contained" href="/HUs/HU3">HU3</Button>
        <Button variant="contained" href="/HUs/HU4">HU4</Button>
        <Button variant="contained" href="/HUs/HU5">HU5</Button>
        <Button variant="contained" href="/HUs/HU6">HU6</Button>
        <Button variant="contained" href="/HUs/HU7">HU7</Button>
        <Button variant="contained" href="/HUs/HU8">HU8</Button>
        <Button variant="contained" href="/HUs/HU9">HU9</Button>
	</Container>
    </>
)}