import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(true);
    setIsLoading(false);

    // const token = localStorage.getItem('jwtToken');
    // if (token) {
    //   setIsAuthenticated(true);
    // }
    // setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
}
