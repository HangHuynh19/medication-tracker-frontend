import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import './IntakeDetails.css';

const IntakeDetails = ({ medicineList }) => {
  const initialMedicineByTime = medicineList.reduce((acc, medicine) => {
    medicine.intakeTime.forEach((time) => {
      if (!acc[time]) {
        acc[time] = [];
      }
      acc[time].push(medicine);
    });
    const sorted = Object.keys(acc).sort((a, b) => {
      const timeA = a.split(':');
      const timeB = b.split(':');
      return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });
    const sortedObj = {};
    sorted.forEach((key) => {
      sortedObj[key] = acc[key];
    });

    return sortedObj;
  }, {});

  const [medicineByTime, setMedicineByTime] = useState(initialMedicineByTime);
  const handleCheck = (time) => {
    const updatedMedicineByTime = { ...initialMedicineByTime };
    updatedMedicineByTime[time] = updatedMedicineByTime[time].map(
      (medicine) => {
        if (!medicine.hasOwnProperty('checked')) {
          medicine.checked = false;
        }
        return { ...medicine, checked: !medicine.checked };
      }
    );
    setMedicineByTime(updatedMedicineByTime);
  };

  return (
    <div className='outerContainer'>
      {Object.keys(medicineByTime).map((time) => (
        <div key={time} className='cardContainer'>
          <div className='timeDisplayContainer'>
            <p>{time}</p>
          </div>
          <div className='intakeDetailsContainer'>
            <ul id='medicineList'>
              {medicineByTime[time].map((medicine) => (
                <li key={medicine.id}>
                  {medicine.medicine.medicineName} - {medicine.totalDose}{' '}
                  tablets per time
                </li>
              ))}
            </ul>
          </div>
          <div>
            {medicineByTime[time].every((medicine) => medicine.checked) ? (
              <CheckCircleIcon
                className='checkedOrNotContainer'
                onClick={() => {
                  handleCheck(time);
                }}
              />
            ) : (
              <CircleOutlinedIcon
                className='checkedOrNotContainer'
                onClick={() => {
                  handleCheck(time);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntakeDetails;
