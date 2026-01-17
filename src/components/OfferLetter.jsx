import React, { useState, useRef } from 'react';
import {
    Printer,
    Download,
    FileText,
    User,
    Briefcase,
    DollarSign,
    Calendar,
    Building2,
    Trash2,
    Plus
} from 'lucide-react';

import { nationalities } from '../nationalities';

const OfferLetter = () => {
    // State for all editable fields
    const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowNationalityDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [formData, setFormData] = useState({
        companyName: "QAZAQ RESTAURANT LLC x ALOE",
        candidateName: "AHMED BADIS BOUKHMIS",
        salutation: "Mr.",
        nationality: "ALGERIENNE",
        passport: "197741608",
        offerDate: "2026-01-15",
        joiningDate: "2026-01-25",
        jobTitle: "SENIOR SOUS CHEF",
        reportingTo: "HEAD CHEF",
        showReportingLine: true,
        basicSalary: 4000,
        mobileNumber: "+971 ____________________",
        accommodation: 2500,
        transportation: 1500,
        telephoneAllowance: 0,
        otherAllowance: 0,
        insuranceCategory: "Category B",
        leaveDays: 30,
        probationMonths: 6,
        trainingCost: 5000,
        noticePeriod: 30,
        signatoryName: "Heorhii Bieloborodko",
        signatoryTitle: "General Manager"
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const totalSalary =
        Number(formData.basicSalary) +
        Number(formData.accommodation) +
        Number(formData.transportation) +
        Number(formData.telephoneAllowance) +
        Number(formData.otherAllowance);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="h-full bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar Editor - Hidden during print */}
            <div className="w-full md:w-1/3 bg-white p-6 shadow-xl overflow-y-auto h-full print:hidden">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <FileText className="text-blue-600" />
                    <h1 className="text-xl font-bold text-gray-800">Offer Letter Editor</h1>
                </div>

                <div className="space-y-6">
                    {/* Candidate Info */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <User size={16} /> Candidate Information
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="block text-xs font-medium text-gray-700">Letter Date</label>
                                <input
                                    type="date"
                                    name="offerDate"
                                    value={formData.offerDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-medium text-gray-700">Salutation</label>
                                <select
                                    name="salutation"
                                    value={formData.salutation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border bg-white"
                                >
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>
                                    <option value="Mrs.">Mrs.</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="candidateName"
                                    value={formData.candidateName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div className="col-span-1 relative" ref={dropdownRef}>
                                <label className="block text-xs font-medium text-gray-700">Nationality</label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setShowNationalityDropdown(true);
                                    }}
                                    onFocus={() => setShowNationalityDropdown(true)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                    autoComplete="off"
                                />
                                {showNationalityDropdown && (
                                    <div className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm mt-1">
                                        {nationalities
                                            .filter(n => n.toLowerCase().includes(formData.nationality.toLowerCase()))
                                            .map((nation, index) => (
                                                <div
                                                    key={index}
                                                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 text-gray-900"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, nationality: nation }));
                                                        setShowNationalityDropdown(false);
                                                    }}
                                                >
                                                    {nation}
                                                </div>
                                            ))}
                                        {nationalities.filter(n => n.toLowerCase().includes(formData.nationality.toLowerCase())).length === 0 && (
                                            <div className="cursor-default select-none relative py-2 pl-3 pr-9 text-gray-500">
                                                No matches found
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-medium text-gray-700">Passport #</label>
                                <input
                                    type="text"
                                    name="passport"
                                    value={formData.passport}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Job Details */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Briefcase size={16} /> Employment Details
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Position Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Reporting To</label>
                                    <input
                                        type="text"
                                        name="reportingTo"
                                        value={formData.reportingTo}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                    />
                                    <div className="mt-2 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="showReportingLine"
                                            checked={formData.showReportingLine}
                                            onChange={handleChange}
                                            id="showReportingLine"
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                        <label htmlFor="showReportingLine" className="text-xs text-gray-600 select-none cursor-pointer">
                                            Include Reporting Line
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700">Joining Date</label>
                                    <input
                                        type="date"
                                        name="joiningDate"
                                        value={formData.joiningDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Annual Leave Days</label>
                                <input
                                    type="number"
                                    name="leaveDays"
                                    value={formData.leaveDays}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Compensation */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <DollarSign size={16} /> Compensation (Monthly)
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Basic Salary</label>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    value={formData.basicSalary}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Accommodation</label>
                                <input
                                    type="number"
                                    name="accommodation"
                                    value={formData.accommodation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Transportation</label>
                                <input
                                    type="number"
                                    name="transportation"
                                    value={formData.transportation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Telephone Allowance</label>
                                <input
                                    type="number"
                                    name="telephoneAllowance"
                                    value={formData.telephoneAllowance}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Other Allowances</label>
                                <input
                                    type="number"
                                    name="otherAllowance"
                                    value={formData.otherAllowance}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Company Signatory */}
                    <section>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Building2 size={16} /> Signatory Info
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Manager Name</label>
                                <input
                                    type="text"
                                    name="signatoryName"
                                    value={formData.signatoryName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Manager Title</label>
                                <input
                                    type="text"
                                    name="signatoryTitle"
                                    value={formData.signatoryTitle}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>
                    </section>

                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                        <Printer size={20} /> Print / Save as PDF
                    </button>
                </div>
            </div>

            {/* Letter Preview */}
            <div className="flex-1 overflow-y-auto bg-gray-200 p-4 md:p-12 print:p-0 print:bg-white">
                <div className="bg-white mx-auto shadow-2xl p-8 md:p-16 min-h-[1100px] max-w-[850px] print:shadow-none print:max-w-none print:w-full font-serif text-gray-900 leading-relaxed">

                    {/* Header */}
                    <div className="text-center mb-10 border-b pb-6">
                        <h1 className="text-5xl font-bold lowercase tracking-wide text-[#a65d3b] font-['Outfit']">bakerist</h1>
                        <p className="text-[#a65d3b] text-sm mt-1 font-['Outfit'] font-medium">In bread We trust</p>
                        <div className="mt-6 font-bold uppercase text-sm border-t border-b py-2 tracking-tighter">
                            {formData.companyName} EMPLOYMENT OFFER LETTER
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="text-right mb-6 text-xs font-bold uppercase">
                        PRIVATE AND CONFIDENTIAL
                    </div>

                    {/* Date and Passport Info */}
                    <div className="mb-8 text-sm grid grid-cols-2">
                        <div className="space-y-1">
                            <p><span className="font-bold">Date :</span> {new Date(formData.offerDate).toLocaleDateString('en-GB')}</p>
                            <p><span className="font-bold">Nationality :</span> {formData.nationality}</p>
                            <p><span className="font-bold">Passport :</span> {formData.passport}</p>
                        </div>
                    </div>

                    {/* Salutation */}
                    <div className="mb-6">
                        <p className="font-bold">Dear {formData.salutation} {formData.candidateName},</p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-6 text-sm">
                        <p className="font-bold mb-4">Offer of Employment between ({formData.companyName}) and {formData.candidateName}.</p>
                        <p>
                            ({formData.companyName}) is pleased to offer you employment on the following terms and conditions should you wish to accept:
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-6 text-sm text-justify">

                        <section>
                            <p><span className="font-bold underline">1. Job Description:</span> You will be employed in the United Arab Emirates ("UAE") in the position of <span className="font-bold uppercase">{formData.jobTitle}</span>.</p>
                            <p className="mt-2">
                                ({formData.companyName}) currently own and in future will operate more outlets and reserves the right to assign you in either of the outlets as well as change your responsibility areas and reporting lines based on the requirements of the parent company.
                            </p>
                            {formData.showReportingLine && (
                                <p className="mt-2">
                                    You will be reporting to the <span className="font-bold">{formData.reportingTo}</span>. You should follow the uniform standard provided by the company uniform book.
                                </p>
                            )}
                        </section>

                        <section>
                            <p><span className="font-bold underline">2. Joining Date:</span> {new Date(formData.joiningDate).toLocaleDateString('en-GB')}.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">3. Compensation:</span></p>
                            <div className="mt-2 border rounded-md p-4 bg-gray-50 print:bg-transparent">
                                <div className="grid grid-cols-2 gap-y-1">
                                    <p>Basic Salary:</p> <p className="font-bold">AED {formData.basicSalary} /- per month</p>
                                    <p>Accommodation:</p> <p className="font-bold">AED {formData.accommodation} /- per month</p>
                                    <p>Transportation:</p> <p className="font-bold">AED {formData.transportation} /- per month</p>
                                    <p>Telephone Allowance:</p> <p className="font-bold">AED {formData.telephoneAllowance} /-</p>
                                    <p>Other Allowance:</p> <p className="font-bold">AED {formData.otherAllowance} /-</p>
                                    <p>Insurance:</p> <p className="font-bold">{formData.insuranceCategory} insurance as per company policy</p>

                                    <div className="col-span-2 border-t mt-2 pt-2 flex justify-between items-center">
                                        <span className="font-black uppercase tracking-tight">Gross Salary Inclusive of above:</span>
                                        <span className="text-lg font-black underline">AED {totalSalary} /-</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-2 text-xs italic">Note: This information is highly confidential. Unauthorized sharing will result in strict action.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">4. Working Hours:</span> Your working hours will be set by Management in due course, based on the requirements of the business unit and you shall be notified accordingly. The timings may vary from time to time as your employment demands. The schedule may vary depending on the event and special occasions, which will be communicated by upper management.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">5. Annual Leave:</span> You shall be entitled to <span className="font-bold">{formData.leaveDays} days</span> of leave per year. All annual leave shall be taken as mutually agreed upon with the Department Heads.</p>
                            <div className="mt-2 text-xs border-l-4 border-gray-400 pl-4 py-1 italic bg-gray-50 print:bg-transparent">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><span className="font-bold">Unemployment Insurance Responsibility : ILOE : Job security insurance</span></li>
                                    <li>Employees are solely responsible for obtaining and renewing unemployment insurance.</li>
                                    <li>Failure to do so may result in a fine deducted from salary.</li>
                                    <li>Staff must ensure timely application and renewal without relying on company notifications.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <p><span className="font-bold underline">6. Probation Period:</span> During the first six ({formData.probationMonths}) months of your employment you will be on probation during which time the normal terms and conditions (such as eligibility for sick leave and annual) will not apply but which will then apply in the normal way after the expiry of the probation period of service ({formData.probationMonths} month). During the probation period, your conduct, demeanor, abilities, and performance will be monitored and evaluated by the discretion of the company and your appointment will be continued. Should you wish to resign during the probation period, you will have to give 4 weeks' notice and cover training cost as per article 12/4. However, the company resumes the right to terminate the employment during probation without notice according to UAE labor law.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">7. Medical Insurance:</span> During your employment you shall be provided with group medical insurance as applicable. (There will be no extra additional coverage provided, if initially the existing conditions are not shared by employee to employer)</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">8. Sick Leave:</span> No sick leave should be granted during the probation period. After {formData.probationMonths} months of continuous service, you will be entitled to sick leave in respect to every year of service (15 days paid in full) - any sick leave must be proven by the medical certificate attested by the clinic.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">9. Deductions:</span> As per ({formData.companyName}) Circular, you agreed as being late or not coming to the duty as per following schedule, you will have a deduction which will base on your daily salary from the basic. Any type of deduction as per “({formData.companyName}) Circular Policy" will be signed and approved by the general manager.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">10. End of Service Gratuity:</span> If you decide to leave within one year of employment, you will be required to pay <span className="font-bold">AED {formData.trainingCost}</span> for the training and knowledge provided to you during your tenure at {formData.companyName}. The end-of-service gratuity is calculated on the last basic salary received by the second party, as follows: (21) days basic salary for each year of the first five years, and (30) days basic salary for years in excess of the above-mentioned period. The fractions of the last year are calculated in proportion to the amount spent by the second party at work, provided that the total gratuity should not exceed two years' salaries. The first party shall bear the expenses of the second party's return to his country, or any other place approved by the first party.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">11. Separation Policy:</span></p>
                            <div className="pl-4 mt-2 space-y-2">
                                <p><span className="font-bold">1. Termination:</span> Employment may be terminated under the following conditions as per UAE labor law: Mutual agreement between both parties, Expiry of the contract, Employer-initiated termination as per Article 44, which includes cases such as fraud, submission of false documents, impersonation, gross negligence, repeated failure to perform duties, workplace misconduct, intoxication, safety violations, unauthorized absences exceeding 7 consecutive or 20 intermittent days, unauthorized employment elsewhere, or misuse of position.</p>
                                <p><span className="font-bold">2. Resignation:</span> Employees may resign at their discretion with a written notice as per Article 43. The resignation must comply with the agreed notice period in the contract.</p>
                                <p><span className="font-bold">3. Notice Period:</span> As per Article 43 and 53, the standard notice period is {formData.noticePeriod} days unless otherwise stated in the contract. If the employee fails to serve the full notice period, compensation equivalent to the unserved duration will be required.</p>
                            </div>
                        </section>

                        <section>
                            <p><span className="font-bold underline">12. Restrictive Covenant:</span> During the term of your employment and for a period of twelve (24) months after termination or expiry of your employment with ({formData.companyName}) You shall not join any competitor in the UAE without the prior written consent of ({formData.companyName}), which may be withheld by ({formData.companyName}) in its sole discretion. You shall not visit any of the outlets as a guest unless authorized.</p>
                        </section>

                        <section className="print:pt-10">
                            <p><span className="font-bold underline">13. Confidentiality:</span> By accepting the offer of employment with ({formData.companyName}), you irrevocably agree that during your employment, you will not communicate any information that might be of a confidential or proprietary nature regarding the operation of "({formData.companyName})," Restaurants in the UAE, to any person(s) including, without limitation, information regarding financial performance, business practices, client base and suppliers thereof.</p>
                            <p className="mt-2">Without prejudice to your obligations of good faith, except as required for the proper performance of your duties under your employment or as may be expressly authorized in writing by ({formData.companyName}) both during your employment and for a period of twelve (12) months after its end (for whatever reason), directly or indirectly, you agree. Not to communicate or divulge to any person, concern, undertaking, firm or corporate body or make use of any confidential information. To use your best endeavors to prevent the publication, disclosure, or unauthorized use of any confidential information. This clause 13 shall apply to confidential information whether it is marked as being confidential and whether you were specifically notified of its confidential status at the time it was shown to you. The above obligations shall not apply to any confidential information that comes into the public domain. Other than by reason of or as a direct or indirect result of the disclosure by you of any confidential information. In accordance with an order of a court of competent jurisdiction and solely in accordance with the term of that order. As required to be disclosed by law.</p>
                            <p className="mt-2">You will have training courses which the company will provide during your employment. When you decide to leave the company, you should be paid for the training which was provided by the company. When you finish the contract, you will be free from this payment.</p>
                            <p className="mt-2">For clarification purposes “Confidential Information" shall mean; information concerning the business and/or finances of ({formData.companyName}) in the UAE or any customers, clients or suppliers of ({formData.companyName}) in the UAE which you may have received or obtained at any time by reason of or in connection with your employment including, without limitation: trade secrets; customer/client lists, contact details of clients, customers and suppliers and individuals within those organizations; technical information, know-how, research and development; financial projections, target details and accounts; fee levels, margins, pricing policies, commission charges, budgets, forecasts, reports, interpretations, records and corporate and business plans; products and services; marketing and advertising plans, marketing surveys and research reports; market share and pricing statistics; and computer software and passwords.</p>
                            <p className="mt-2">At the end of your employment, all property relating to ({formData.companyName}) including any research material, data, records, files, equipment (laptop/mobile telephone) and all other Confidential Information must be returned to ({formData.companyName}).</p>
                            <p className="mt-2">The disclosure and misuse of ({formData.companyName}) Confidential Information would constitute a criminal offence in the United Arab Emirates, punishable by imprisonment and/or by a fine.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">14. Rules and Regulations:</span> In addition to the terms and conditions set forth in this letter of employment, by accepting this offer of employment you expressly and irrevocably agree that you shall follow and abide by the applicable rules and regulations issued from time to time by ({formData.companyName}), the Government of Dubai or the Government of the United Arab Emirates.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">15. Labor and Immigration Formalities:</span> Your employment shall be governed by the UAE Labor Laws as applicable in the UAE.</p>
                            <p className="mt-2">You expressly agree that your employment hereunder is contingent on the successful completion of all labor, immigration medical and security clearance formalities set by the UAE government and authorities and the ability to obtain for you the appropriate residence and employment visa. If for any reason you do not pass the above requirements, this offer of employment shall be null and void.</p>
                        </section>

                        <section>
                            <p><span className="font-bold underline">16. Acknowledgement:</span> The Executive acknowledges that during his employment with the ({formData.companyName}) (prior to and during the Employment Term) he has and will occupy a position of trust and confidence. The Executive shall hold in a fiduciary capacity for the benefit of the ({formData.companyName}) and shall not disclose to others or use, whether directly or indirectly, any Confidential Information regarding the Company, except (i) when required to do so by a court of law, by any governmental agency having supervisory authority over the business of the Company or by any administrative or legislative body (including a committee thereof) with jurisdiction to order him to divulge, disclose or make accessible such information, provided that the Executive shall give prompt written notice to the Company of such requirement, disclose no more information than is so required, and cooperate with any attempts by the Company to obtain a protective order or similar treatment. The Executive shall take all reasonable steps to safeguard the Confidential Information and to protect it against disclosure, misuse, espionage, loss, and theft. The Executive understands and agrees that the Executive shall acquire no rights to any such Confidential Information. "Confidential Information" shall mean information about the Company, its subsidiaries and affiliates, and their respective clients and customers that is not disclosed by the Company and that was learned by the Executive in the course of his employment by the Company, including, but not limited to, any proprietary knowledge, food recipes, trade secrets, data.</p>
                        </section>

                        <div className="my-8">
                            <p>We look forward to you joining us and sincerely hope that you find your employment with us both challenging and rewarding.</p>
                            <p className="mt-4">Please arrange to sign and return one copy of this letter to the HR department or General Manager.</p>
                        </div>
                    </div>

                    {/* Signature Area */}
                    <div className="mt-12 flex justify-between gap-12 text-sm">
                        <div className="w-1/2">
                            <p className="font-bold mb-12">Yours faithfully,</p>
                            <div className="border-t border-gray-400 pt-2">
                                <p className="font-bold uppercase">{formData.signatoryName}</p>
                                <p>{formData.signatoryTitle}</p>
                                <p className="text-[10px] text-gray-500 uppercase mt-1">On behalf of {formData.companyName}</p>
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-col items-end">
                            <div className="w-full max-w-[250px]">
                                <p className="font-bold mb-12 text-left">Acknowledged By,</p>
                                <div className="border-t border-gray-400 pt-2 text-left">
                                    <p className="font-bold uppercase italic text-gray-400 h-[20px]">Candidate Signature</p>
                                    <p className="font-bold uppercase">{formData.candidateName}</p>
                                    <p className="text-xs">Date: ____/____/________</p>
                                    <p className="text-xs mt-1">Mobile: {formData.mobileNumber}</p>
                                </div>
                            </div>
                            <div className="mt-6 text-[10px] space-y-2 text-gray-600 text-left w-full max-w-[250px]">
                                <p>I, {formData.candidateName} my agreement and acceptance to the above terms and conditions of employment with ({formData.companyName})</p>
                                <p>I, {formData.candidateName}, agreed to provide all the required documents as per the company policy.</p>
                                <p>I, {formData.candidateName}, agreed to follow ({formData.companyName}) Circular policy.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="mt-12 pt-8 border-t text-[10px] text-gray-400 text-center uppercase tracking-widest">
                        {formData.companyName} • Confidential Offer Document • Valid for 5 days
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferLetter;
