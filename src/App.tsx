import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/SignupForm';
import SigninForm from './_auth/Signinform';
import RootLayout from './_root/RootLayout';
import Home from './_auth/Home';
import Terms from './_auth/Terms';
import Play from './_root/Play';
import Affiliate from './_root/Affiliate';
import Payout from './_root/Payout';
import Deposit from './_root/Deposit';
import '/public/assets/page.css';
import { useState } from 'react';
import RecoverPassword from './_auth/RecoverPassword';

const App = () => {
  console.log('App')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated)

  return (
    <main className='App'>
      <Routes>     
        {!isAuthenticated ? (
          // Rotas públicas - login/cadastro
          <Route path='/' element={<AuthLayout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Home />} />
          <Route path='/sign-up' element={<SignupForm />} />
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/recover-password' element={<RecoverPassword />} />
        </Route>
        ) : (
          // Rotas privadas - apenas quando estiver logado
          <Route path='/' element={<RootLayout isAuthenticated={isAuthenticated} />}>
            <Route index element={<Play />} />
            <Route path='/deposit' element={<Deposit />} />
            <Route path='/affiliate' element={<Affiliate />} />
            <Route path='/payout' element={<Payout />} />
            <Route path='/terms' element={<Terms />} />
          </Route>
        )}
      </Routes>
    </main>
  );
};

export default App;