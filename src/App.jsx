import React, { useState } from 'react';
import OfferLetter from './components/OfferLetter';
import SalaryCertificate from './components/SalaryCertificate';
import { FileText, FileBadge } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('offer-letter');

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b shadow-sm z-10 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-['Outfit'] font-bold text-2xl text-[#a65d3b]">keya</div>
          <div className="text-gray-400 text-xs px-2 border-l ml-2">Human Resource Tool</div>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('offer-letter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'offer-letter'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <FileText size={16} />
            Offer Letter
          </button>
          <button
            onClick={() => setActiveTab('salary-certificate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'salary-certificate'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <FileBadge size={16} />
            Salary Certificate
          </button>
        </div>

        <div className="w-[100px]"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'offer-letter' && <OfferLetter />}
        {activeTab === 'salary-certificate' && <SalaryCertificate />}
      </div>
    </div>
  );
};

export default App;
