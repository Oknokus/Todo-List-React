import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function ButtonSizes({selectTasks}) {
       
  return (
    <Box sx={{ '& button': { m: 1 } }}> 
        <Button 
            variant="contained"
            onClick={() => selectTasks()} 
            size="small">
            Все задачи
        </Button>      
    </Box>
  );
}