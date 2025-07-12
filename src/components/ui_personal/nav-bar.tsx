"use client";
import React, { useState } from 'react';
import Container from '../container';
import Image from 'next/image';
import { EbaNavbarLogo, NavLinkDivider, XCloseDropdownMenuIcon } from '@/assets/icons';
import Link from 'next/link';
import { Button } from '../ui/button';
import GreenOutlineButton from './green-outline-button';
import GreenButton from './green-button';

// type Props = {}

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* NAVBAR */}
      <section id="navbar" className="bg-white relative">
        <Container>
          <div className="py-4 px-10 md:pr-0 md:pl-20 lg:px-20">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center">
                <Image src={EbaNavbarLogo} alt="eba-logo" className="" />
              </div>
              </Link>

              {/* Desktop Navigation - hidden on medium tablet and smaller */}
              <nav className="hidden lg:flex items-center">
                <span className="flex gap-x-8">
                  <Link
                    href="/blog"
                    className="text-[rgba(31,41,55,1)] font-medium"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/career"
                    className="text-[rgba(31,41,55,1)] font-medium"
                  >
                    Career
                  </Link>
                </span>
                <Image src={NavLinkDivider} alt="" className="mr-8 ml-12" />
                <span className="flex gap-4">
                  <Button
                    variant={"green-outline"}
                    className="px-[20px] py-[14px] cursor-pointer"
                  >
                    Download the Brochure
                  </Button>
                  <Button
                    variant={"green"}
                    className="px-[20px] py-[14px] cursor-pointer"
                  >
                    Book a Consultation
                  </Button>
                </span>
              </nav>

              {/* Medium tablet navigation - shows only Blog and Career */}
              <nav className="hidden md:flex lg:hidden items-center">
                <span className="flex gap-x-8">
                  <Link
                    href="#"
                    className="text-[rgba(31,41,55,1)] font-medium"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="text-[rgba(31,41,55,1)] font-medium"
                  >
                    Career
                  </Link>
                </span>
              </nav>

              {/* Mobile hamburger menu */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="flex flex-col items-center justify-center w-8 h-8 space-y-1 cursor-pointer"
                >
                  <span className="block w-6 h-0.5 bg-black"></span>
                  <span className="block w-6 h-0.5 bg-black"></span>
                  <span className="block w-6 h-0.5 bg-black"></span>
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute top-full right-0 w-[375px] bg-white shadow-lg z-50 md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-4 py-2.5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Image src={EbaNavbarLogo} alt="eba-logo" />
              <button onClick={toggleMenu} className="cursor-pointer">
                <Image src={XCloseDropdownMenuIcon} alt="close-menu-icon" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col">
              <div className="flex flex-col space-y-4 mb-6">
                <Link
                  href="#"
                  className="text-[rgba(31,41,55,1)] font-medium text-lg"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-[rgba(31,41,55,1)] font-medium text-lg"
                  onClick={toggleMenu}
                >
                  Careers
                </Link>
              </div>

              <div className="flex space-x-2 mt-auto">
                <GreenOutlineButton
                  title="Download the Brochure"
                  className="px-[7.75px] py-[11px] cursor-pointer text-sm"
                  onClickFunction={toggleMenu}
                />
                <GreenButton
                  title="Book a Consultation"
                  className="px-[19.25px] py-[11px] cursor-pointer text-sm"
                  onClickFunction={toggleMenu}
                />
              </div>
            </nav>
          </div>
        </div>
      </section>
      </>
  )
}

export default NavBar;