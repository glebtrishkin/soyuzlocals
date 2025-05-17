import React from 'react';

function Logo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src="/ASSETS/1.png" 
        alt="СAЮЗ" 
        className="max-h-full max-w-full md:max-w-[80%] lg:max-w-full object-contain filter brightness-0 invert"
      />
    </div>
  );
}

export default Logo;