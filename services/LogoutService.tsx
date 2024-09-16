'use client';

import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/'); 
  };

  return logout;
};

export default useLogout;
