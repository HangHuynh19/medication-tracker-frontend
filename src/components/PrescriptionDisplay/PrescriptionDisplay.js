import React, { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../../utils/fetch';
import { getAllPrescriptions } from '../../utils/queries';
import IntakeDetails from '../IntakeDetails/IntakeDetails';

const PrescriptionDisplay = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();

  useEffect(() => {
    const fetchAllPrescriptions = async () => {
      try {
        const response = await doGraphQLFetch(
          'http://localhost:3000/graphql',
          getAllPrescriptions,
          {}
        );
        setPrescriptions(response.prescriptions);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPrescriptions();
  }, []);

  /* return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        prescriptions.map((prescription) => {
          const issuedDate = new Date(prescription.issuedDate);
          const expiryDate = new Date(prescription.expiryDate);

          if (issuedDate <= currentDate && expiryDate >= currentDate) {
            return (
              <div key={prescription.id}>
                <IntakeDetails
                  medicineList={prescription.medicineList}
                  expiryDate={expiryDate}
                />
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  ); */

  const getUniqueDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      new Date(prescription.issuedDate) <= currentDate &&
      new Date(prescription.expiryDate) >= currentDate
  );

  const uniqueDates = getUniqueDates(
    currentDate,
    new Date(
      Math.max.apply(
        null,
        filteredPrescriptions.map((p) => new Date(p.expiryDate))
      )
    )
  );

  return (
    <div>
      {uniqueDates.map((date) => {
        const datePrescriptions = filteredPrescriptions.filter(
          (p) =>
            new Date(p.issuedDate) <= date && new Date(p.expiryDate) >= date
        );
        console.log(datePrescriptions);
        return (
          <div key={date.toISOString()}>
            <p>{date.toDateString()}</p>
            {datePrescriptions.map((prescription) => (
              <IntakeDetails
                key={prescription.id}
                medicineList={prescription.medicineList}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PrescriptionDisplay;
