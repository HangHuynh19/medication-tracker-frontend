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
        const allMedicines = datePrescriptions.reduce((acc, prescription) => {
          return acc.concat(prescription.medicineList);
        }, []);
        const groupedMedicines = allMedicines.reduce((acc, medicine) => {
          const medicineId = medicine.id;
          if (!acc[medicineId]) {
            acc[medicineId] = {
              ...medicine,
              totalDose: parseInt(medicine.dosage),
            };
          } else {
            acc[medicineId].totalDose += parseInt(medicine.dosage);
          }
          return acc;
        }, {});
        const medicinesArray = Object.values(groupedMedicines);

        return (
          <div key={date.toISOString()}>
            <p>{date.toDateString()}</p>
            <IntakeDetails medicineList={medicinesArray} date={date} />
          </div>
        );
      })}
    </div>
  );
};

export default PrescriptionDisplay;
