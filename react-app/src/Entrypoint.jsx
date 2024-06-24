import {useEffect, useState} from 'react';
import { Container, Typography, Button} from "@mui/material";

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
        <Typography sx={{marginBottom: "50px"}} variant="h1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            <Typography id="quien" sx={{marginTop: "20px"}} variant="h2" gutterBottom>HU</Typography>
            <Button variant="contained" href="/">Entrypoint</Button>
            <Button variant="contained" href="/HU01">HU1</Button>
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