import React from 'react';
import { BusTimeHolder } from './BusTimeHolder';

export const BusTimes = ({ schedules }) => {
  return (
    <div>Scheduled:
      {schedules.map(item => (
        <BusTimeHolder times={item.ExpectedLeaveTime} key={item.ExpectedLeaveTime} />
      ))}

     
    </div>
  );
};
