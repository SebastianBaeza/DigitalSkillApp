import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function Title ({ name, evaluateTest }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    
    const action = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
    );
    

    return (
        <div className="ppt-title">
            <div>
                <Button sx={{
                    backgroundColor: '#128e0e',
                    color: 'white',
                    borderRadius: '6px',
                    '&:hover': {
                    backgroundColor: '#128e0e',
                    },
                    padding: '5px 15px 5px 15px',
                    height: '28.4px',
                    fontSize: '16px',
                    border: 'none',
                    textTransform: 'none',
                    fontFamily: 'Arial'
                }} onClick={handleClick}>Instrucción</Button>
                <Snackbar sx={{
                    color: 'blue' 
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Realice una presentación que contenga texto"
                    action={action}
                />
            </div>
            {name}
            <button className="ppt-title-finished" onClick={evaluateTest}>Finalizar test</button>
        </div>
        
    )
}



export default function SimpleSnackbar() {
  

  
  

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
    </div>
  );
}