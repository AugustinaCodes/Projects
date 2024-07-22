import { Link } from "react-router-dom";
import './LaunchItem.module.css'

interface LaunchItemProps {
  launch: {
    id: string;
    name: string;
    date_utc: string;
    rocket: string;
  };
}

const LaunchItem: React.FC<LaunchItemProps> = ({ launch }) => {
  return (
    <div className="launch-item">
      <h3>{launch.name}</h3>
      <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>Rocket: {launch.rocket}</p>
      <Link to={`/launch/${launch.id}`}>View Details</Link>
    </div>
  );
};

export default LaunchItem;
