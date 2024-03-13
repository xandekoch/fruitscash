import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components';

interface RootLayoutProps {
  isAuthenticated: boolean;
}

const RootLayout: React.FC<RootLayoutProps> = ({ isAuthenticated }) => {
  console.log('Root')
  
  return (
    <div id='RootLayout'>
      <Navbar isAuthenticated={isAuthenticated} />

      <section className="OutletRoot">
        <Outlet />
      </section>

      < Footer />
    </div>
  )
}

export default RootLayout