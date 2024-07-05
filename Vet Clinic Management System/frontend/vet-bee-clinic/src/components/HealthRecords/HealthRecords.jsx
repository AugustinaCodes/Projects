import { useLocation, useNavigate } from "react-router-dom";
import styles from "./HealthRecords.module.css";

export default function HealthRecords() {
  const navigate = useNavigate();
  const location = useLocation();
  const { petName } = location.state;

  function handleBackButton() {
    navigate(-1);
  }

  function handleAddPrescription(id) {
    navigate(`/v1/health-records/${id}/add-prescription`);
  }

  return (
    <div className={styles.healthRecordsPage}>
      <button className={styles.backButton} onClick={handleBackButton}>
        Back
      </button>
      <div className={styles.topBit}>
        <h1>{petName}: Health Records</h1>
        <div className={styles.topButtons}>
          <button
            className={styles.addPrescription}
            onClick={handleAddPrescription}
          >
            Add Prescription
          </button>
          <button className={styles.addLog}>Add Log</button>
        </div>
      </div>
      <div className={styles.displayBit}>
        <h2>Display:</h2>
        <div className={styles.displayButtons}>
          <button className={styles.displayButton}>Logs</button>
          <button className={styles.displayButton}>Prescriptions</button>
        </div>
      </div>
    </div>
  );
}
