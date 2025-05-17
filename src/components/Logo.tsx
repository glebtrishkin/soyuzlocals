import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center h-full">
      <div className="flex items-center space-x-2">
        <Hexagon className="w-8 h-8" />
        <span className="text-2xl font-bold tracking-wider uppercase">Союз</span>
      </div>
    </Link>
  );
};

export default Logo;