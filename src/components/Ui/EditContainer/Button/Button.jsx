import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from "./Button.module.css";

export default function ButtonSizes({allTasks, id}) {

  return (
    <Box sx={{ '& button': { m: 1 } }}> 
        <Button 
            variant="contained"
            onClick={() => allTasks(id)} 
            size="small">
            Все задачи
        </Button>      
    </Box>
  );
}