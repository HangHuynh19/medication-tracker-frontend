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

  return (
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
                  issuedDate={issuedDate}
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
  );
};

export default PrescriptionDisplay;
