import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components';

const RootLayout = () => {
  console.log('RootLayout')
  
  return (
    <div id='  RootLayout'>
      <Navbar />

      <section className="OutletRoot">
        <Outlet />
      </section>

      < Footer />
    </div>
  )
}

export default RootLayout