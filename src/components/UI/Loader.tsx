export const MainLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 flex justify-center items-center z-50">
      <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin-fast"></div>
    </div>
  );
};

export const MiniLoader = () => {
    return (
      <div>
        <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin-fast"></div>
      </div>
    );
  };

