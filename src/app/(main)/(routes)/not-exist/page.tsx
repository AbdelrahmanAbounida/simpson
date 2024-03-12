import React from "react";

const NotExist = () => {
  return (
    <body className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center ">
        <h1 className="text-[120px] font-extrabold mt-7 pt-9 text-gray-700">
          404
        </h1>
        <p className="text-xl font-medium text-gray-600 mb-6">
          This Quote is not currently public. please check it again later
        </p>
      </div>
    </body>
  );
};

export default NotExist;
