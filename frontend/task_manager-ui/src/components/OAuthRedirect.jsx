import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/';
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirect;