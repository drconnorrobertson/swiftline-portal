'use client';
import { useState } from 'react';
import { FileText, Clock, User, Building2, MapPin, DollarSign, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { label: 'Borrower Info', icon: User },
  { label: 'Loan Details', icon: FileText },
  { label: 'Financial Info', icon: DollarSign },
];

export default function AddNewDealPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    eligibility: '',
    entityName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    creditScore: '',
    investmentAddress: '',
    loanType: '',
    loanAmount: '',
    purchasePrice: '',
    rehabBudget: '',
    arv: '',
    exitStrategy: '',
    propertyType: '',
    experience: '',
    hasInsurance: '',
    closingDate: '',
    scottLender: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add a new deal</h1>
            <p className="text-sm text-gray-500">Term Sheet Request - Application</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          Estimated 3 minutes
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-center gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const active = i === currentStep;
            const completed = i < currentStep;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-amber-500 text-white' : completed ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm ${active ? 'text-amber-600 font-medium' : 'text-gray-400'}`}>{step.label}</span>
                {i < steps.length - 1 && <div className={`w-16 h-0.5 ${completed ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Eligibility */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xs text-amber-600">!</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Eligibility Screening</h3>
                  <p className="text-xs text-gray-500">Please answer this question before proceeding</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">Do you have any history of foreclosure, bankruptcy, significant credit delinquencies, mortgage late payments, or any material legal issues (including felony convictions)? *</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="eligibility" value="yes" checked={formData.eligibility === 'yes'} onChange={() => updateField('eligibility', 'yes')} className="accent-amber-500" />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="eligibility" value="no" checked={formData.eligibility === 'no'} onChange={() => updateField('eligibility', 'no')} className="accent-amber-500" />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Business Information</h3>
                  <p className="text-xs text-gray-500">Enter the legal entity name for this loan</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Entity Name *</label>
                <input type="text" value={formData.entityName} onChange={e => updateField('entityName', e.target.value)} placeholder="Please enter the legal entity/business name of the borrower." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
              </div>
            </div>

            {/* Borrower Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Borrower Information</h3>
                  <p className="text-xs text-gray-500">Enter the borrower&apos;s contact details (not your own)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Borrower First Name *</label>
                  <input type="text" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} placeholder="Enter Borrower's First Name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Last Name</label>
                  <input type="text" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} placeholder="Enter Borrower's Last Name" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Phone Number *</label>
                  <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+1" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Email Address *</label>
                  <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="Enter Borrower's Email Address" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Estimated Credit Score *</label>
                  <input type="number" value={formData.creditScore} onChange={e => updateField('creditScore', e.target.value)} placeholder="Enter credit score (300-850)" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
                </div>
              </div>
            </div>

            {/* Investment Property */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-medium text-gray-900">Investment Property</h3>
                  <p className="text-xs text-gray-500">Address of the property you&apos;re seeking financing for</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Address *</label>
                <input type="text" value={formData.investmentAddress} onChange={e => updateField('investmentAddress', e.target.value)} placeholder="Search address ..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
            </div>

            {/* Scott Lender Toggle */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Scott Lender Access</h3>
                  <p className="text-xs text-gray-500">Enable file visibility for Scott Lender on this deal</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.scottLender} onChange={e => updateField('scottLender', e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-4">Loan Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type *</label>
                <select value={formData.loanType} onChange={e => updateField('loanType', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400">
                  <option value="">Select loan type</option>
                  <option value="Fix & Flip">Fix & Flip</option>
                  <option value="Bridge">Bridge</option>
                  <option value="DSCR">DSCR</option>
                  <option value="Ground Up">Ground Up Construction</option>
                  <option value="Stabilized Bridge">Stabilized Bridge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                <select value={formData.propertyType} onChange={e => updateField('propertyType', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400">
                  <option value="">Select property type</option>
                  <option value="SFR">Single Family</option>
                  <option value="Multi">Multi-Family (2-4)</option>
                  <option value="Multi5+">Multi-Family (5+)</option>
                  <option value="Mixed">Mixed Use</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount *</label>
                <input type="text" value={formData.loanAmount} onChange={e => updateField('loanAmount', e.target.value)} placeholder="$0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price *</label>
                <input type="text" value={formData.purchasePrice} onChange={e => updateField('purchasePrice', e.target.value)} placeholder="$0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rehab Budget</label>
                <input type="text" value={formData.rehabBudget} onChange={e => updateField('rehabBudget', e.target.value)} placeholder="$0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Value (ARV)</label>
                <input type="text" value={formData.arv} onChange={e => updateField('arv', e.target.value)} placeholder="$0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exit Strategy *</label>
                <select value={formData.exitStrategy} onChange={e => updateField('exitStrategy', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400">
                  <option value="">Select exit strategy</option>
                  <option value="sell">Sell</option>
                  <option value="refinance">Refinance</option>
                  <option value="hold">Hold as Rental</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desired Closing Date</label>
                <input type="date" value={formData.closingDate} onChange={e => updateField('closingDate', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-4">Financial Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fix & Flip Experience (# of projects)</label>
                <input type="number" value={formData.experience} onChange={e => updateField('experience', e.target.value)} placeholder="0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Do you have property insurance? *</label>
                <select value={formData.hasInsurance} onChange={e => updateField('hasInsurance', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6 text-center mt-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Ready to Submit</h3>
              <p className="text-sm text-gray-500">Review your information and submit your term sheet request</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center gap-1 disabled:opacity-30 hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600">
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
