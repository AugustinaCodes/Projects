import styles from "./MedicationContainer.module.css";

export default function MedicationContainer({ medication }) {
  return (
    <div className={styles.medicationCard}>
      <h2>{medication.name}</h2>
      <p>{medication.description}</p>
    </div>
  );
}
