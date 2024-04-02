import React from 'react';

const AboutUsFooter: React.FC = () => {
  return (
    <footer className=" bg-customGray text-customLightGray py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, turpis sed
              bibendum fermentum, elit quam euismod arcu, quis mattis eros quam quis lacus.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-600 my-6" />
        <div className="text-center">
          <p>&copy; 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AboutUsFooter;
