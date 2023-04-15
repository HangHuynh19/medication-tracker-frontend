import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './IntakeDetails.css';

const IntakeDetails = () => {
  return (
    <div className='outerContainer'>
      <div className='timeDisplayContainer'>
        <p>9.00</p>
      </div>
      <div className='intakeDetailsContainer'>
        <ul id='medicineList'>
          <li id='medicine'>Item 1 jhdjfghdfjghjdhgjdhgjfdhgsgijfsdjg</li>
          <li>Item 2 sjhfjsdhgjsdghsjhgdhgjdfhgierotieort</li>
          <li>
            Item 3
            kjerkjweitruwvitn4tuveirtunieuyiotrnybioyunirobutybyntyurionbui
            iyttriuyirutyhrhiryuopmhuimyuiruirtumyhiruy kfgjfdgjdn
            vnvnrotinnxceojbnhfghjfdhgfdhjkghdfjkghdfhgj
          </li>
        </ul>
      </div>
      <div>
        <CheckCircleIcon className='checkedOrNotContainer' />
      </div>
    </div>
  );
};

export default IntakeDetails;
