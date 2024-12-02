'use client';

import React, { useEffect, useState } from 'react';
import NavbarCustomer from './NarbarCustomer';
import NavbarAdmin from './NavbarAdmin';

const NavbarMain: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Get the user type from localStorage
    const storedUserType = localStorage.getItem('user_type');
    setUserType(storedUserType);  
  }, []);

  return (
    <>
      {userType === 'ADMIN' ? <NavbarAdmin /> : <NavbarCustomer />}
    </>
  );
};

export default NavbarMain;
