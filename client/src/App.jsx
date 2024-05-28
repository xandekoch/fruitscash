import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/SignupForm';
import SigninForm from './_auth/Signinform';
import RecoverPassword from './_auth/RecoverPassword';
import Home from './_auth/Home';
import Terms from './_auth/Terms';
import RootLayout from './_root/RootLayout';
import Play from './_root/Play';
import Affiliate from './_root/Affiliate';
import Payout from './_root/Payout';
import PayoutAffiliate from './_root/PayoutAffiliate';
import Deposit from './_root/Deposit';
import '/public/assets/page.css';
import { useAuth } from './context/AuthProvider';
import Game from './_root/Game';
import { useState } from 'react';
import Admin from './_root/admin/Admin';

const App = () => {
  console.log('App')
  const { isAuthenticated, user: {isAdmin} } = useAuth();
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(true);
  const code = new URLSearchParams(window.location.search).get('code');
  if(code) localStorage.setItem('code', code);

  return (
    <main className='App'>
      <Routes>
        {!isAuthenticated ? (
          // Rotas públicas - login/cadastro
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path='/sign-up' element={<SignupForm />} />
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/recover-password' element={<RecoverPassword />} />
          </Route>
        ) : (
          // Rotas privadas - apenas quando estiver logado
          <>
          <Route path='/' element={<RootLayout showNavbarAndFooter={showNavbarAndFooter} />}>
            <Route index element={<Play setShowNavbarAndFooter={setShowNavbarAndFooter} />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/affiliate' element={<Affiliate />} />
            <Route path='/payout' element={<Payout />} />
            <Route path='/payout-affiliate' element={<PayoutAffiliate />} />
            <Route path='/terms' element={<Terms />} />
            <Route element={<Game betAmount={5} mode={"default"} />} />
          </Route>
            {isAdmin && 
            <Route path='/admin' element={<Admin />}>

            </Route>}
          </>
        )}
        {/* Rota de redirecionamento */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </main>
  );
};

export default App;