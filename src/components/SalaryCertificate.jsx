import React, { useState, useEffect, useRef } from 'react';
import { Printer, Briefcase, MapPin, Phone, User, Settings, Landmark, Search, ChevronDown, Plus } from 'lucide-react';
import { nationalities as nationalitiesList } from '../nationalities';

const SalaryCertificate = () => {
    const [formData, setFormData] = useState({
        date: new Date().toLocaleDateString('en-GB'),
        topTitle: 'BAKERIST', // Kept for reference, but we render the branded title
        salutation: 'Mr.',
        employeeName: 'Yerassyl Mukhan',
        nationality: 'Kazakhstan',
        emiratesId: '784200045786272',
        companyBranch: 'Bistro Garden By bakerist Restaurant & Cafe (Br of QAZAQ RESTAURANT L.L.C.)',
        startDate: '01-April-2024',
        jobTitle: 'Foreign Food Cook',
        salaryAmount: '6900',
        salaryWords: 'Six thousand nine hundred',
        signatoryName: 'Keya Pithva',
        signatoryTitle: 'HR Manager',
        groupName: 'Qazaq Restaurant Group',
        companyHeader: 'QAZAQ RESTAURANT LLC X ALOE',
        companyAddress: 'Dubai Hills Mall Unit DHM-GF-383',
        companyTel: '043436733',
        poBox: '451678'
    });

    const [nationalitySearch, setNationalitySearch] = useState('');
    const [isNationalityOpen, setIsNationalityOpen] = useState(false);
    const nationalityRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
                setIsNationalityOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helper function to convert number to words
    const numberToWords = (num) => {
        if (num === 0) return 'zero';
        const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const scales = ['', 'thousand', 'million', 'billion'];

        const convertChunk = (n) => {
            let str = '';
            if (n >= 100) {
                str += units[Math.floor(n / 100)] + ' hundred ';
                n %= 100;
            }
            if (n >= 10 && n <= 19) {
                str += teens[n - 10] + ' ';
            } else if (n >= 20) {
                str += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            }
            if (n > 0 && n < 10) {
                str += units[n] + ' ';
            }
            return str.trim();
        };

        let n = parseInt(num);
        if (isNaN(n)) return '';
        let result = '';
        let scaleIndex = 0;
        while (n > 0) {
            const chunk = n % 1000;
            if (chunk !== 0) {
                const chunkStr = convertChunk(chunk);
                result = chunkStr + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + (result ? ' ' + result : '');
            }
            n = Math.floor(n / 1000);
            scaleIndex++;
        }
        return result.trim();
    };

    useEffect(() => {
        const words = numberToWords(formData.salaryAmount);
        if (words) {
            const capitalizedWords = words.charAt(0).toUpperCase() + words.slice(1);
            setFormData(prev => ({ ...prev, salaryWords: capitalizedWords }));
        }
    }, [formData.salaryAmount]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const selectNationality = (nat) => {
        setFormData(prev => ({ ...prev, nationality: nat }));
        setIsNationalityOpen(false);
        setNationalitySearch('');
    };

    const filteredNationalities = nationalitiesList.filter(n =>
        n.toLowerCase().includes(nationalitySearch.toLowerCase())
    );

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col md:flex-row h-full print:h-auto print:block">
            {/* Sidebar Controls */}
            <div className="w-full md:w-[400px] p-6 bg-slate-50 border-r border-slate-200 overflow-y-auto print:hidden space-y-6 max-h-screen">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Briefcase className="text-white" size={20} />
                    </div>
                    <h1 className="text-xl font-bold text-slate-800">Certificate Panel</h1>
                </div>

                {/* BOX 1: EMPLOYEE DETAILS (Frequent Changes) */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                        <User size={16} className="text-blue-600" />
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">Employee & Salary Details</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Title</label>
                            <select
                                name="salutation"
                                value={formData.salutation}
                                onChange={handleInputChange}
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-sm focus:ring-1 focus:ring-blue-500"
                            >
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Employee Name</label>
                            <input type="text" name="employeeName" value={formData.employeeName} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded text-sm" />
                        </div>
                    </div>

                    {/* Nationality Dropdown */}
                    <div className="relative" ref={nationalityRef}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Nationality</label>
                        <div
                            onClick={() => setIsNationalityOpen(!isNationalityOpen)}
                            className="w-full p-2 border border-slate-200 rounded text-sm cursor-pointer flex justify-between items-center bg-white"
                        >
                            <span className={!formData.nationality ? "text-slate-400" : ""}>
                                {formData.nationality || "Select Nationality"}
                            </span>
                            <ChevronDown size={14} className={`transition-transform text-slate-400 ${isNationalityOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isNationalityOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
                                <div className="sticky top-0 bg-white p-2 border-b border-slate-100">
                                    <div className="flex items-center gap-2 bg-slate-50 px-2 rounded border border-slate-200">
                                        <Search size={14} className="text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full p-1 text-sm bg-transparent outline-none"
                                            value={nationalitySearch}
                                            onChange={(e) => setNationalitySearch(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && nationalitySearch) {
                                                    selectNationality(nationalitySearch);
                                                }
                                            }}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Custom input option */}
                                {nationalitySearch && !nationalitiesList.some(n => n.toLowerCase() === nationalitySearch.toLowerCase()) && (
                                    <div
                                        onClick={() => selectNationality(nationalitySearch)}
                                        className="p-2 text-sm hover:bg-blue-50 cursor-pointer text-blue-600 font-semibold border-b border-slate-50 flex items-center gap-2"
                                    >
                                        <Plus size={14} />
                                        Use "{nationalitySearch}"
                                    </div>
                                )}

                                {filteredNationalities.length > 0 ? (
                                    filteredNationalities.map(nat => (
                                        <div
                                            key={nat}
                                            onClick={() => selectNationality(nat)}
                                            className="p-2 text-sm hover:bg-blue-50 cursor-pointer text-slate-700"
                                        >
                                            {nat}
                                        </div>
                                    ))
                                ) : !nationalitySearch && (
                                    <div className="p-2 text-sm text-slate-400 italic">Start typing to search...</div>
                                )}

                                {nationalitySearch && filteredNationalities.length === 0 && !nationalitiesList.some(n => n.toLowerCase() === nationalitySearch.toLowerCase()) === false && (
                                    <div className="p-2 text-sm text-slate-400 italic">No matches found</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Emirates ID</label>
                        <input type="text" name="emiratesId" value={formData.emiratesId} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded text-sm" />
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Job Title</label>
                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded text-sm font-bold uppercase" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Joining Date</label>
                            <input type="text" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full p-2 border border-slate-200 rounded text-sm" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Salary (AED)</label>
                            <input type="number" name="salaryAmount" value={formData.salaryAmount} onChange={handleInputChange} className="w-full p-2 border border-blue-200 rounded text-sm font-bold text-blue-700 bg-blue-50" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 italic">Salary in Words (Automatic)</label>
                        <div className="p-2 bg-slate-50 border border-dashed border-slate-200 rounded text-xs text-slate-600">
                            {formData.salaryWords}
                        </div>
                    </div>
                </div>

                {/* BOX 2: COMPANY SETTINGS (Less Changes) */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 opacity-90 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                        <Settings size={16} className="text-slate-500" />
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">Company & Branding</h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Main Brand (Top)</label>
                            <div className="p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500 italic">
                                Logo is fixed to 'bakerist' style
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Company Group Header</label>
                            <input type="text" name="companyHeader" value={formData.companyHeader} onChange={handleInputChange} className="w-full p-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Full Branch Name</label>
                            <textarea name="companyBranch" value={formData.companyBranch} onChange={handleInputChange} className="w-full p-1.5 border border-slate-200 rounded text-xs h-12 leading-tight" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Address</label>
                                <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} className="w-full p-1.5 border border-slate-200 rounded text-xs" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Tel</label>
                                <input type="text" name="companyTel" value={formData.companyTel} onChange={handleInputChange} className="w-full p-1.5 border border-slate-200 rounded text-xs" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">P.O. Box</label>
                                <input type="text" name="poBox" value={formData.poBox} onChange={handleInputChange} className="w-full p-1.5 border border-slate-200 rounded text-xs" />
                            </div>
                        </div>

                        <div className="pt-2 border-t border-slate-50">
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Signatory & Group</label>
                            <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleInputChange} placeholder="Name" className="w-full p-1.5 border border-slate-200 rounded text-xs mb-1" />
                            <input type="text" name="signatoryTitle" value={formData.signatoryTitle} onChange={handleInputChange} placeholder="Title" className="w-full p-1.5 border border-slate-200 rounded text-xs mb-1" />
                            <input type="text" name="groupName" value={formData.groupName} onChange={handleInputChange} placeholder="Group Name" className="w-full p-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePrint}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                    <Printer size={20} />
                    GENERATE & PRINT PDF
                </button>
            </div>

            {/* Certificate Preview Area */}
            <div className="flex-1 flex justify-center p-4 md:p-12 overflow-y-auto bg-slate-200 print:bg-white print:p-0">
                <div className="bg-white shadow-2xl w-[210mm] min-h-[330mm] p-[25mm] pb-[60mm] box-border relative print:shadow-none print:m-0 print:border-none border border-slate-300">

                    {/* Header */}
                    <div className="text-center mb-10 border-b border-slate-100 pb-8">
                        <h1 className="text-6xl font-bold lowercase tracking-wide text-[#a65d3b] font-['Outfit'] mb-4">
                            bakerist
                        </h1>
                        <h2 className="text-xl font-bold text-gray-800 tracking-widest uppercase mb-1">
                            {formData.companyHeader}
                        </h2>
                        <h1 className="text-4xl font-serif text-black border-y-2 border-black py-4 my-6 uppercase tracking-wider">
                            Salary Certificate
                        </h1>
                        <div className="text-sm text-gray-700 flex flex-wrap justify-center gap-x-6">
                            <span className="flex items-center gap-1.5 font-medium"><MapPin size={14} /> {formData.companyAddress}</span>
                            <span className="flex items-center gap-1.5 font-medium"><Phone size={14} /> Tel: {formData.companyTel}</span>
                        </div>
                        <div className="text-[13px] text-gray-600 mt-2 italic max-w-xl mx-auto leading-tight font-serif">
                            {formData.companyBranch}
                        </div>
                        <div className="text-sm text-gray-700 font-medium mt-1">
                            P.O. Box {formData.poBox}
                        </div>
                    </div>

                    {/* Date & Subject */}
                    <div className="mb-12">
                        <p className="font-bold text-black text-lg">Date : {formData.date}</p>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold border-b-2 border-black inline-block uppercase tracking-tight pb-1">Subject: Salary Certificate</h3>
                    </div>

                    {/* Body Content */}
                    <div className="text-black leading-[2] text-justify space-y-8 text-[16px] font-serif">
                        <p>
                            This is to certify that <span className="font-bold underline">{formData.salutation} {formData.employeeName}</span>,
                            with <span className="font-bold">{formData.nationality}</span> nationality Emirates id No :
                            <span className="font-bold"> {formData.emiratesId}</span> is currently employed by
                            <span className="italic font-medium"> {formData.companyBranch}</span>, since <span className="font-bold">{formData.startDate}</span>.
                            {formData.salutation === 'Mr.' ? 'He' : 'She'} is currently employed in the capacity of
                            <span className="font-bold uppercase tracking-tight"> {formData.jobTitle}</span>.
                        </p>

                        <p>
                            {formData.salutation === 'Mr.' ? 'He' : 'She'} draws a total salary of
                            <span className="font-bold bg-slate-50 px-1 border border-slate-100 rounded"> AED {formData.salaryAmount}/- </span>
                            (<span className="font-bold italic">UAE {formData.salaryWords} only</span>)
                            per month, including {formData.salutation === 'Mr.' ? 'his' : 'her'} accommodation & transportation.
                        </p>

                        <p>
                            This certificate is being issued at the request of the above employee and is only valid in its original
                            form for a period of 30 days from the date of issue, without any responsibility from our side.
                        </p>
                    </div>

                    {/* Signatory Section */}
                    <div className="mt-12">
                        <div className="border-t-4 border-black w-72 mb-4"></div>
                        <div className="space-y-4">
                            <p className="font-bold text-black text-xl">{formData.signatoryName}</p>
                            <p className="text-gray-800 font-bold text-base">{formData.signatoryTitle}</p>
                            <p className="text-gray-700 italic font-medium">{formData.groupName}</p>
                        </div>
                    </div>

                    {/* Footer Contact Info Line */}
                    <div className="absolute bottom-12 left-[25mm] right-[25mm] border-t-2 border-slate-200 pt-5 text-[11px] text-gray-500 flex justify-between items-center uppercase font-bold tracking-widest">
                        <div className="flex items-center gap-2">
                            <MapPin size={11} className="text-slate-400" />
                            {formData.companyAddress}
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                                <Phone size={11} className="text-slate-400" />
                                {formData.companyTel}
                            </span>
                            <span>
                                P.O. BOX {formData.poBox}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryCertificate;
