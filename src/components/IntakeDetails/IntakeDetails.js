import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './IntakeDetails.css';

const IntakeDetails = ({ medicineList, issuedDate, expiryDate }) => {
  console.log({ medicineList, issuedDate, expiryDate });
  const medicineByTime = medicineList.reduce((acc, medicine) => {
    medicine.intakeTime.forEach((time) => {
      if (!acc[time]) {
        acc[time] = [];
      }
      acc[time].push(medicine);
    });
    return acc;
  }, {});

  const getDateArray = (end) => {
    const dates = [];
    let currentDate = new Date();

    while (currentDate <= end) {
      dates.push(currentDate);
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    return dates;
  };

  const dateArray = getDateArray(expiryDate);

  return (
    <div className='outerContainer'>
      {dateArray.map((date, index) => (
        <div key={index}>
          <p>{new Date(date).toLocaleDateString()}</p>
          {Object.keys(medicineByTime).map((time) => (
            <div key={time} className='cardContainer'>
              <div className='timeDisplayContainer'>
                <p>{time}</p>
              </div>
              <div className='intakeDetailsContainer'>
                <ul id='medicineList'>
                  {medicineByTime[time].map((medicine) => (
                    <li key={medicine.id}>
                      {medicine.medicine.medicineName} - {medicine.dosage}{' '}
                      tablets per time
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CheckCircleIcon className='checkedOrNotContainer' />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default IntakeDetails;
