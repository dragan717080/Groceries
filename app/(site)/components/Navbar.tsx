'use client';

import { FC } from 'react';
import NavbarMenuItem from './NavbarMenuItem';
import { LocationsToolbar, CareersToolbar, NewsToolbar } from './navbar-toolbars';

const Navbar: FC = () => {

  const toolbarComponents = [LocationsToolbar, CareersToolbar, NewsToolbar];

  return (
    <nav className="hidden md:flex h-30 px-14 md:pl-1 md:pr-2 lg:px-4">
      {toolbarComponents.map((toolbarComponent, index: number) => (
        <NavbarMenuItem ComponentToRender={toolbarComponent} index={index} key={index} />
      ))}
    </nav >
  );
};

export default Navbar;
