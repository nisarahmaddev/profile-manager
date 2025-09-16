import './Navbar.css'
import { Link } from 'react-router-dom'
import { useTheme } from '../../Hooks/useTheme'
import modeIcon from '../../assets/mode-icon.svg'

export default function Navbar() {
  const { mode, changeMode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`navbar ${mode}`}>
      <nav>
        <Link to='/' className='brand'>
          <h1>Home</h1>
        </Link>
        <Link to='/AddUser' className='brand2'>
          <h1>Add Users</h1>
        </Link>
        
        <img
          onClick={toggleMode}
          src={modeIcon}
          className={`mode-icon ${mode}`}
          alt='changeMode'
        />
      </nav>
    </div>
  )
}
