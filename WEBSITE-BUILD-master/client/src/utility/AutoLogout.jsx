// useAuthCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/state';
import { isTokenExpired } from './CheckToken';

const LogoutIfTokenInvalid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const model = useSelector((state) => state.modelType);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.log("Token expired");
      dispatch(setLogin({
        user: null,
        token: null,
        modelType: null
      }));
      console.log('Session expired. Please log in again.');
      model=="host" ? navigate('/host_login') : navigate('/login');
      return true;
    }
  }, [token, dispatch, navigate]);
};

export default LogoutIfTokenInvalid;
