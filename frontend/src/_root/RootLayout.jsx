import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components';

const RootLayout = ({ showNavbarAndFooter }) => {
  return (
    <div id='  RootLayout'>
      {showNavbarAndFooter && <Navbar />}

      <section className="OutletRoot">
        <Outlet />
      </section>

      {showNavbarAndFooter && <Footer />}
    </div>
  )
}

export default RootLayout