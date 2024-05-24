import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../components';

const AuthLayout = () => {
  console.log('AuthLayout')

  return (
    <div id="AuthLayout">
      <Navbar />
      <section className='OutletAuth'>
        <Outlet  />
      </section>
      <Footer />
    </div>
  )
}

export default AuthLayout