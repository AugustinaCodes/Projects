import { Link } from 'react-router-dom'
import './Home.module.css'

const Home: React.FC = () => {
  return <div className='home'>
    <h1>Welcome to SpaceX Launches Viewer</h1>
    <p>Explore the past and upcoming SpaceX launches</p>
    <Link to="/launches">View Launches</Link>
  </div>
}

export default Home;
