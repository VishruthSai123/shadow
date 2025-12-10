"use client";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[60px]">
      <div 
        className="w-12 h-12 border-4 border-primary-500/20 border-l-primary-500 rounded-full animate-spin"
      />
    </div>
  );
};

export default Loader;
  