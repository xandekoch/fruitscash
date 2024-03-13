import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../components';

interface AuthLayoutProps {
  isAuthenticated: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ isAuthenticated }) => {
  console.log('Auth')

  return (
    <div id="AuthLayout">
      <Navbar isAuthenticated={isAuthenticated} />
      <section className='OutletAuth'>
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default AuthLayout