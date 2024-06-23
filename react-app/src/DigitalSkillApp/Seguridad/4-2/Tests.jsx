// import * as React from "react";
// import {useEffect, useState} from 'react';
// import { Container, Typography, Grid, Button} from "@mui/material";

// export default function Entrypoint() {
//     const [user, setUser] = useState(null);
//     const [loged, setLoged] = useState(false);
  
//     useEffect(() => {
//       if (sessionStorage.getItem("user")){ // Maybe you could create a view that sets the user in the sessionStorage O:
//         setUser(sessionStorage.getItem("user"));
//         setLoged(true); 
//       }
//     }, [user, loged]);
  
// return (
//     <>
// 	<Container sx={{textAlign: "center", marginTop: "30px"}}>
// 		<Typography sx={{marginBottom: "50px"}} variant="h1" gutterBottom>MENU DE TESTS</Typography>
//         {/* <Typography id="quien" sx={{marginTop: "20px"}} variant="h2" gutterBottom>HU's</Typography> */}
//         <Button variant="contained" href="/">Inicio</Button>
//         <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-2/Basico/Pregunta_Desarrollo">Pregunta Desarrollo Basica</Button>
//         <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-2/Basico/Pregunta_Alternativa">Pregunta Alternativa Basica</Button>
//         {/* <Button variant="contained" href="/HUs/HU1">HU1</Button>
//         <Button variant="contained" href="/HUs/HU2">HU2</Button>
//         <Button variant="contained" href="/HUs/HU3">HU3</Button>
//         <Button variant="contained" href="/HUs/HU4">HU4</Button>
//         <Button variant="contained" href="/HUs/HU5">HU5</Button>
//         <Button variant="contained" href="/HUs/HU6">HU6</Button>
//         <Button variant="contained" href="/HUs/HU7">HU7</Button>
//         <Button variant="contained" href="/DigitalSkillApp/Creacion-Contenido-Digital/3-1/Pregunta_Desarrollo">HU8</Button>
//         <Button variant="contained" href="/HUs/HU9">HU9</Button> */}
// 	</Container>
//     </>
// )}

import * as React from "react";
import { useEffect, useState } from 'react';
import { Container, Typography, Button } from "@mui/material";
import './Ayuda.css';  // Asegúrate de importar el archivo CSS

export default function Entrypoint() {
    const [user, setUser] = useState(null);
    const [loged, setLoged] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setUser(sessionStorage.getItem("user"));
            setLoged(true);
        }
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closePopup = (e) => {
        if (e.target.className === 'popup-overlay') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            // No cierres la ventana emergente si el clic proviene del botón o de la ventana emergente misma
            if (isOpen && !document.getElementById('popup').contains(e.target) && e.target.id !== 'help-button') {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <Container sx={{ textAlign: "center", marginTop: "30px" }}>
                <Typography sx={{ marginBottom: "50px" }} variant="h1" gutterBottom>MENU DE TESTS</Typography>
                <Button variant="contained" href="/">Inicio</Button>
                <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-2/Basico/Pregunta_Desarrollo">Pregunta Desarrollo Basica</Button>
                <Button variant="contained" href="/DigitalSkillApp/Seguridad/4-2/Basico/Pregunta_Alternativa">Pregunta Alternativa Basica</Button>
                <Button variant="contained" id="help-button" onClick={togglePopup}>Ayuda</Button>
            </Container>
            {isOpen && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div id="popup" className="popup-content">
                        <iframe
                            src="https://npy5yesnxt173mlnc905e.chat.copilot.live/"
                            title="Help"
                            width="600"
                            height="400"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}

