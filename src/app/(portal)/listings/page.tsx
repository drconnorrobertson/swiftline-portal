'use client';
import { Building2, Plus, MapPin, DollarSign, Calendar, Eye, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/data';

const listings = [
  { id: 'l1', title: '3BR Colonial', address: '245 Oak Lane, Pittsburgh, PA 15213', price: 385000, type: 'Fix & Flip', status: 'Active', beds: 3, baths: 2, sqft: 1850, listedDate: '2026-04-28', views: 124 },
  { id: 'l2', title: '4-Unit Apartment Building', address: '892 Maple Dr, Tampa, FL 33602', price: 675000, type: 'Rental', status: 'Active', beds: 8, baths: 4, sqft: 3200, listedDate: '2026-05-01', views: 87 },
  { id: 'l3', title: 'Warehouse Conversion', address: '1204 Pine St, Denver, CO 80203', price: 1200000, type: 'Ground Up', status: 'Pending', beds: 0, baths: 0, sqft: 8500, listedDate: '2026-05-03', views: 56 },
];

const statusColors: Record<string, string> = { Active: 'bg-emerald-100 text-emerald-700', Pending: 'bg-amber-100 text-amber-700', Sold: 'bg-blue-100 text-blue-700' };

export default function ListingsPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><Building2 className="w-5 h-5 text-amber-600" /></div>
          <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Listings</h1><p className="text-xs sm:text-sm text-gray-500">Manage your property listings</p></div>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600 self-start"><Plus className="w-4 h-4" /> Add Listing</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(l => (
          <div key={l.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <Building2 className="w-12 h-12 text-gray-300" />
              <span className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full ${statusColors[l.status]}`}>{l.status}</span>
              <div className="absolute bottom-3 left-3 flex gap-1">
                <span className="text-[10px] bg-white/90 backdrop-blur px-1.5 py-0.5 rounded">{l.beds} bd</span>
                <span className="text-[10px] bg-white/90 backdrop-blur px-1.5 py-0.5 rounded">{l.baths} ba</span>
                <span className="text-[10px] bg-white/90 backdrop-blur px-1.5 py-0.5 rounded">{l.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{l.title}</h3>
                <p className="text-sm font-bold text-amber-600 flex-shrink-0">{formatCurrency(l.price)}</p>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{l.address}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{l.listedDate}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Eye className="w-3 h-3" />{l.views}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded"><Edit2 className="w-3 h-3 text-gray-400" /></button>
                  <button className="p-1 hover:bg-gray-100 rounded"><Trash2 className="w-3 h-3 text-gray-400" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
