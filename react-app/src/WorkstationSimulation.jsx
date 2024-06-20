import React, { useState, useEffect } from 'react';
import { Slider, Typography, Button, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import './WorkstationSimulation.css';

// Estilizar los sliders utilizando la función styled de @mui/material
const CustomSlider = styled(Slider)({
  color: '#3a8589',
  height: 8,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#3a8589',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
});

const WorkstationSimulation = () => {
  const initialChairHeight = 0;
  const initialScreenDistance = 0;
  const totalPostureImages = 16;

  const [chairHeight, setChairHeight] = useState(initialChairHeight);
  const [screenDistance, setScreenDistance] = useState(initialScreenDistance);
  const [screenAngle, setScreenAngle] = useState(0);
  const [posture, setPosture] = useState(0);
  const [personImage, setPersonImage] = useState(1);
  const [showPopup, setShowPopup] = useState(true);
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showFinishPopup, setShowFinishPopup] = useState(false);

  useEffect(() => {
    let timer = null;
    if (showCounter) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000); // Avanza el contador cada segundo
    } else {
      clearInterval(timer); // Detiene el contador si showCounter es false
    }

    return () => {
      clearInterval(timer); // Limpia el intervalo al desmontar el componente
    };
  }, [showCounter]);

  const handleChairHeightChange = (e, newValue) => {
    setChairHeight(newValue);
  };

  const handleScreenDistanceChange = (e, newValue) => {
    setScreenDistance(newValue);
  };

  const handleScreenAngleChange = (e, newValue) => {
    setScreenAngle(newValue);
  };

  const handlePostureChange = (e, newValue) => {
    setPosture(newValue);
    const imageIndex = Math.ceil((newValue + 50) / (100 / totalPostureImages));
    setPersonImage(imageIndex);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowCounter(true);
  };

  const handleCloseFinishPopup = () => {
    setShowFinishPopup(false);
    setShowCounter(false);
  };

  const handleFinishTest = () => {
    setShowFinishPopup(true);
    setShowCounter(false); // Detiene el contador al finalizar
  };

  const convertScreenDistanceToReal = (value) => {
    const minReal = 90;
    const maxReal = 30;
    const minValue = -55;
    const maxValue = 55;
    const realValue = ((value - minValue) * (maxReal - minReal)) / (maxValue - minValue) + minReal;
    return realValue.toFixed(0);
  };

  const convertChairHeightToReal = (value) => {
    const minReal = -10;
    const maxReal = 20;
    const minValue = 0;
    const maxValue = 40;
    const realValue = ((value - minValue) * (maxReal - minReal)) / (maxValue - minValue) + minReal;
    return realValue.toFixed(0);
  };

  const convertScreenAngleToReal = (value) => {
    return value;
  };

  const convertPostureToReal = (value) => {
    return value;
  };

  return (
    <div className="simulation">
      <Modal
        open={showPopup}
        onClose={handleClosePopup}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ bgcolor: 'background.paper', p: 4, minWidth: 300, borderRadius: 4 }}>
          <Typography variant="h5" id="modal-title" gutterBottom>
            ¡Prepárate para el siguiente test!
          </Typography>
          <Typography variant="body1" id="modal-description">
            Haz clic en OK para comenzar.
          </Typography>
          <Button
            variant="contained"
            onClick={handleClosePopup}
            sx={{
              mt: 2,
              mx: 'auto',
              display: 'block',
              backgroundColor: '#3a8589', // Color de fondo del botón OK
              '&:hover': {
                backgroundColor: '#2e6f72', // Color de fondo al pasar el ratón
              },
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>

      {showCounter && (
        <Box sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'rgba(255, 255, 255, 0.8)', p: 2, borderRadius: 4 }}>
          <Typography variant="body2" gutterBottom>
            Tiempo transcurrido: {counter} segundos
          </Typography>
        </Box>
      )}

      <Modal
        open={showFinishPopup}
        onClose={handleCloseFinishPopup}
        aria-labelledby="finish-modal-title"
        aria-describedby="finish-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ bgcolor: 'background.paper', p: 4, minWidth: 300, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" id="finish-modal-title" gutterBottom>
            ¡Test Finalizado!
          </Typography>
          <Typography variant="body1" id="finish-modal-description">
            Tu tiempo fue de {counter} segundos.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseFinishPopup}
            sx={{
              mt: 2,
              backgroundColor: '#3a8589', // Color de fondo del botón Cerrar
              '&:hover': {
                backgroundColor: '#2e6f72', // Color de fondo al pasar el ratón
              },
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      <div className="controls">
        <Typography gutterBottom>Altura silla (cm)</Typography>
        <CustomSlider
          value={chairHeight}
          onChange={handleChairHeightChange}
          aria-labelledby="chair-height"
          min={0}
          max={40}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={convertChairHeightToReal}
        />

        <Typography gutterBottom>Distancia de la Pantalla (cm)</Typography>
        <CustomSlider
          value={screenDistance}
          onChange={handleScreenDistanceChange}
          aria-labelledby="screen-distance"
          min={-55}
          max={55}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={convertScreenDistanceToReal}
        />

        <Typography gutterBottom>Ángulo Pantalla (grados)</Typography>
        <CustomSlider
          value={screenAngle}
          onChange={handleScreenAngleChange}
          aria-labelledby="screen-angle"
          min={-25}
          max={25}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={convertScreenAngleToReal}
        />

        <Typography gutterBottom>Curvatura de la Espalda</Typography>
        <CustomSlider
          value={posture}
          onChange={handlePostureChange}
          aria-labelledby="posture"
          min={-50}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={convertPostureToReal}
        />
      </div>

      <Button
        variant="contained"
        onClick={handleFinishTest}
        sx={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: '#3a8589', '&:hover': { backgroundColor: '#2e6f72' } }}
      >
        Finalizar Test
      </Button>

      <div className="simulation-view">
        <div className="workspace">
          <div className="person" style={{ transform: `translateY(-${chairHeight}px) translateX(${screenDistance}px)` }}>
            <img src={`/person${personImage}.png`} alt={`person${personImage}`} />
          </div>
          <div className="chair-bottom" style={{ transform: `translateX(${screenDistance}px)` }}>
            <img src="/chair-bottom.png" alt="chair-bottom" />
          </div>
          <div className="chair-top" style={{ transform: `translateX(${screenDistance}px) translateY(-${chairHeight}px)` }}>
            <img src="/chair-top.png" alt="chair-top" />
          </div>
          <div className="desk">
            <img src="/desk.png" alt="desk" />
            <div className="screen" style={{ transform: `rotate(${screenAngle}deg)` }}>
              <img src="/screen.png" alt="screen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkstationSimulation;
