import React from "react";
import { statuses, returnUnitType } from "../utilities/CommonUtilities";

const Highlight = ({ title, number, unit, icon, status }) => {
  return (
    <div className="bg-purple1f223a  mb-2 sm:w-1/3 p-4 text-white h-64 flex flex-col justify-between shadow-lg rounded-lg mr-3">
      <div className="font-bold">{title}</div>
      <div className="flex items-center">
        <div className="mr-2 md:text-4xl sm:text-2xl">{number}</div>
        <div className="text-2xl">{unit}</div>
      </div>
      <div className="flex items-center">
        {icon ? (
          <div className="mr-2 bg-purple110e1d items-center justify-center flex w-8 h-8 rounded-full windRotate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block rotate-180 windRotate"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        ) : null}

        <div className="text-lg">{status}</div>
      </div>
    </div>
  );
};

export default Highlight;
