const getAllPrescriptions = `query Prescriptions {
  prescriptions {
    id
    issuedDate
    issuedBy {
      id
      username
      email
      avatar
      token
    }
    expiryDate
    medicineList {
      id
      medicine {
        id
        medicineName
        purpose
        sideEffects
      }
      dosage
      intakeTime
    }
    patientId {
      id
      username
      email
      avatar
      token
    }
  }
}`;

export { getAllPrescriptions };
