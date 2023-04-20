import React, { useState, useEffect, useCallback } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import './IntakeDetails.css';

const IntakeDetails = ({ medicineList, date }) => {
  const [medicineByTime, setMedicineByTime] = useState({});
  const [dataFromStorage, setDataFromStorage] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem(
        `medicineListByDateAndTime ${date.toISOString().split('T')[0]}`
      )
    ) {
      setDataFromStorage(
        JSON.parse(
          localStorage.getItem(
            `medicineListByDateAndTime ${date.toISOString().split('T')[0]}`
          )
        )
      );
    }
  }, [medicineByTime, date]);

  useEffect(() => {
    let initialMedicineByTime = medicineList.reduce((acc, medicine) => {
      medicine.intakeTime.forEach((time) => {
        if (!acc[time]) {
          acc[time] = [];
        }
        acc[time].push({
          ...medicine,
          checked: false,
          totalDose: medicine.totalDose,
          uniqueIdentifier: `${medicine.id}-${time}-${
            date.toISOString().split('T')[0]
          }`,
        });
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

    setMedicineByTime(initialMedicineByTime);
  }, [medicineList, date]);

  const handleCheck = (time, uniqueIdentifier) => {
    const updatedMedicineByTime = { ...(dataFromStorage || medicineByTime) };
    updatedMedicineByTime[time] = updatedMedicineByTime[time].map(
      (medicine) => {
        if (medicine.uniqueIdentifier === uniqueIdentifier) {
          return { ...medicine, checked: !medicine.checked };
        }
        return medicine;
      }
    );

    localStorage.setItem(
      `medicineListByDateAndTime ${date.toISOString().split('T')[0]}`,
      JSON.stringify(updatedMedicineByTime)
    );
    console.log('UPDATED', updatedMedicineByTime);
    setMedicineByTime(updatedMedicineByTime);
  };
  //localStorage.clear();
  const dataSrc = dataFromStorage ?? medicineByTime;
  return (
    <div className='outerContainer'>
      {Object.keys(dataSrc).map((time) => (
        <div key={`${time} + ${date.toISOString()}`} className='cardContainer'>
          <div className='timeDisplayContainer'>
            <p>{time}</p>
          </div>
          <div className='intakeDetailsContainer'>
            <ul id='medicineList'>
              {dataSrc[time].map((medicine) => (
                <li key={medicine.id}>
                  {medicine.medicine.medicineName} - {medicine.totalDose}{' '}
                  tablets per time
                </li>
              ))}
            </ul>
          </div>
          <div>
            {dataSrc[time].map((medicine) => (
              <div key={medicine.uniqueIdentifier}>
                {medicine.checked ? (
                  <CheckCircleIcon
                    className='checkedOrNotContainer'
                    onClick={() => {
                      handleCheck(time, medicine.uniqueIdentifier);
                    }}
                  />
                ) : (
                  <CircleOutlinedIcon
                    className='checkedOrNotContainer'
                    onClick={() => {
                      handleCheck(time, medicine.uniqueIdentifier);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntakeDetails;
