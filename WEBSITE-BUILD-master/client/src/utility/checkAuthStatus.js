const CheckAuthStatus = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  };
  
export default CheckAuthStatus;