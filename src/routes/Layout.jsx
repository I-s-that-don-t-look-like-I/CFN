import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from 'src/components/templates/landing/NavBar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
