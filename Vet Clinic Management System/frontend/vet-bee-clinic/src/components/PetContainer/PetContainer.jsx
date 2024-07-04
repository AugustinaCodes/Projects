import styles from "./PetContainer.module.css";

export default function PetContainer({ pet, onViewLog, onDelete }) {
  return (
    <div className={styles.petCard}>
      <h2>{pet.name}</h2>
      <p>Date of Birth: {pet.dob}</p>
      <p>Client Email: {pet.client_email}</p>
      <div className={styles.petButtons}>
        <button className={styles.viewLog} onClick={() => onViewLog(pet._id)}>
          View Log
        </button>
        <button className={styles.delete} onClick={() => onDelete(pet._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
