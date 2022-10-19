import React, { useState, useEffect } from 'react';
import { useCalendlyEventListener,InlineWidget } from 'react-calendly';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function appointmentsRoom() {

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
});
    

  return ( 
    <div className='Calendly'>
      <InlineWidget url="https://calendly.com/caro-gomez/30min" />
    </div>

  );
}
 