
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { useNavigation } from '@/hooks/useNavigation';

const HorizontalNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navItems } = useNavigation();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-bottom shadow-lg">
      <nav className="flex justify-around items-center h-16 px-2" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.path)}
            onClick={() => handleNavigation(item.path)}
          />
        ))}
      </nav>
    </div>
  );
};

export default HorizontalNavBar;
