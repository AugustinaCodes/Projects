import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div>
        <img
          className={styles.logo}
          src="/src/assets/vetBeeLogo.png"
          alt="Vetbee Logo"
        />
      </div>
      <div className={styles.links}>
        <Link to={"/v1/pets"} className={styles.navLink}>
          Pets
        </Link>
        <Link to={"/v1/medications"} className={styles.navLink}>
          Medications
        </Link>
      </div>
    </nav>
  );
}
