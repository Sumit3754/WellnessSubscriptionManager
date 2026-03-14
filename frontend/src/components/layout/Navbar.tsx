import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';

type NavbarBaseProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarBase = ({ isOpen, setIsOpen }: NavbarBaseProps) => {
  const handleMissingClerk = () => {
    window.alert('Clerk is not configured. Create frontend/.env.local with VITE_CLERK_PUBLISHABLE_KEY=pk_... and restart the frontend dev server.');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">VitalCore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
              onClick={handleMissingClerk}
            >
              Sign In
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="w-full mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
              onClick={handleMissingClerk}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavbarWithClerk = ({ isOpen, setIsOpen }: NavbarBaseProps) => {
  const { isLoaded, isSignedIn } = useUser();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">VitalCore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {!isLoaded ? null : !isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </>
            ) : (
              <UserButton />
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-3">
              {!isLoaded ? null : !isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="flex-1 bg-white text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  if (!clerkEnabled) {
    return <NavbarBase isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return <NavbarWithClerk isOpen={isOpen} setIsOpen={setIsOpen} />;
};

export default Navbar;