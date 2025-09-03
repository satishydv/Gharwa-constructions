"use client"
import React, { useRef, useState } from 'react';
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

const ContactPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column - Contact Information */}
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <div className="space-y-8">
              
              {/* Call Us */}
              <div className="flex items-start space-x-4">
                <div className="text-orange-500 text-2xl mt-1">
                  <IoCall />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    CALL US
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +91 9939129921, +91 8877096309
                  </p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="text-orange-500 text-2xl mt-1">
                  <MdOutlineMail />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    EMAIL
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    gharwadevelopment@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="text-orange-500 text-2xl mt-1">
                  <FaLocationDot />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    LOCATION
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gharwa Development, Ranchi, Jharkhand, India
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="text-orange-500 text-2xl mt-1">
                  <IoIosTime />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    BUSINESS HOURS
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Mon - Fri...... 10 am - 8 pm<br />
                    Sat, Sun........ Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <div className="mt-12 pt-6 border-t border-gray-300 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gharwa Development, Ranchi, Jharkhand, India
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-200 dark:bg-gray-700 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
              CONTACT US
            </h2>
            
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Enter your Mobile Number"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Enter a valid email address"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject of your message"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                ></textarea>
              </div>
              
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center justify-center space-x-2 text-gray-800 dark:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>{selectedFile ? selectedFile.name : 'Upload Profile Image'}</span>
                </button>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
