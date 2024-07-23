import { Link } from "react-router-dom";
import styles from './LaunchItem.module.css'
import { Launch } from '../../services/spacexService'

interface LaunchItemProps {
  launch: Launch;
}

const LaunchItem = ({ launch } : LaunchItemProps) => {
  return (
    <div className={styles.launchItem}>
      <h3>{launch.name}</h3>
      <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>Rocket: {launch.rocket}</p>
      <Link to={`/launch/${launch.id}`}>View Details</Link>
    </div>
  );
};

export default LaunchItem;
