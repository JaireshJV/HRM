import { Fragment, useLayoutEffect } from 'react';
import Routers from './routes';
import GlobalStyle from './theme/GlobalStyle';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './routes/Auth/authSlice';

function App() {

  const location = useLocation()
  
  const token = useSelector(selectCurrentToken);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Fragment>
      <GlobalStyle />
      <Routers token={token}/>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
