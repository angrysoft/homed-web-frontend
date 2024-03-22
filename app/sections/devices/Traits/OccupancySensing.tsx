import { SensorOccupied } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import React from 'react';


interface IOccupancySensingProps {
  sid: string;
  occupancy: boolean;
}


const OccupancySensing:React.FC<IOccupancySensingProps> = (props:IOccupancySensingProps) => {

  return (
    <Paper sx={{
      display:"flex",
      gap: "1rem",
      justifyContent: "space-between",
      padding: "2rem"
    }}>
      <Typography>Obecność</Typography>
      <SensorOccupied color={props.occupancy ? 'secondary': 'primary'}/>
    </Paper>
  );
};

export { OccupancySensing };

