import React, { useState } from 'react';
import {
  Store,
  Plus,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Search,
  Filter,
  Sparkles,
  X,
  Send,
} from 'lucide-react';

interface Listing {
  id: string;
  farmerName: string;
  crop: string;
  quantity: string;
  grade: string;
  price: string;
  location: string;
  phone: string;
  image: string;
  verifiedOrganic: boolean;
  harvestDate: string;
}

export const Marketplace: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');

  const [listings, setListings] = useState<Listing[]>([
    {
      id: 'LST-101',
      farmerName: 'Annamol A Abraham (Kuttanad Estate)',
      crop: 'Organic Jyothi Rice Paddy',
      quantity: '3.2 Tons',
      grade: 'Grade A Premium',
      price: '₹34 / kg',
      location: 'Kuttanad, Alappuzha, Kerala',
      phone: '+91 98470 12345',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
      verifiedOrganic: true,
      harvestDate: 'Harvested 2 days ago',
    },
    {
      id: 'LST-102',
      farmerName: 'Amith U Pillai',
      crop: 'Hybrid Yellow Maize (Corn)',
      quantity: '1.9 Tons',
      grade: 'Grade B Export Quality',
      price: '₹28 / kg',
      location: 'Palakkad Agro Belt, Kerala',
      phone: '+91 97451 67890',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
      verifiedOrganic: false,
      harvestDate: 'Ready for Dispatch',
    },
    {
      id: 'LST-103',
      farmerName: 'Josh Abraham Jacob',
      crop: 'Fresh Field Tomatoes',
      quantity: '1.5 Tons',
      grade: 'Grade A Fresh Pick',
      price: '₹32 / kg',
      location: 'Wayanad High Ranges, Kerala',
      phone: '+91 94472 88990',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop',
      verifiedOrganic: true,
      harvestDate: 'Harvested Today',
    },
  ]);

  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    grade: 'Grade A Premium',
    price: '',
    location: 'Kuttanad, Alappuzha',
    phone: '+91 98470 12345',
  });

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.crop || !formData.quantity || !formData.price) return;

    const newListing: Listing = {
      id: `LST-${Date.now().toString().slice(-3)}`,
      farmerName: 'Annamol A Abraham (Team Lead)',
      crop: formData.crop,
      quantity: formData.quantity,
      grade: formData.grade,
      price: formData.price,
      location: formData.location,
      phone: formData.phone,
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop',
      verifiedOrganic: true,
      harvestDate: 'Just Listed',
    };

    setListings([newListing, ...listings]);
    setShowModal(false);
    setFormData({ crop: '', quantity: '', grade: 'Grade A Premium', price: '', location: 'Kuttanad, Alappuzha', phone: '+91 98470 12345' });
  };

  const filtered = listings.filter((l) =>
    l.crop.toLowerCase().includes(filter.toLowerCase()) || l.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-[28px] border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span>Direct Farmer-to-Buyer Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Direct Produce Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Zero middlemen commission. Connect directly with verified buyers & local wholesalers.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#8CE854] hover:bg-[#78d641] text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-md transition-all text-sm shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Post Produce for Sale</span>
        </button>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search crops, rice, wheat, corn or location..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-50 border border-emerald-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-600"
          />
        </div>
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
          {filtered.length} Active Produce Listings
        </span>
      </div>

      {/* PRODUCE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white/80 backdrop-blur-md rounded-[28px] overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* IMAGE HEADER */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.crop}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[#8CE854] border border-[#8CE854]/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                  {item.grade}
                </span>

                {item.verifiedOrganic && (
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Organic Certified</span>
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span>{item.harvestDate}</span>
                  <span className="text-emerald-300 font-mono">{item.id}</span>
                </div>
              </div>

              {/* DETAILS CONTENT */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-black text-slate-900">{item.crop}</h3>

                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-emerald-50/80 p-3 rounded-xl text-xs font-mono font-bold">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Quantity</span>
                    <span className="text-slate-900 text-sm">{item.quantity}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Asking Price</span>
                    <span className="text-emerald-900 text-sm font-black">{item.price}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-medium">
                  Farmer: <strong className="text-slate-800">{item.farmerName}</strong>
                </p>
              </div>
            </div>

            {/* DIRECT ACTION BUTTONS */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <a
                href={`tel:${item.phone}`}
                className="py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Farmer</span>
              </a>

              <a
                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD PRODUCE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Post Farmer Produce</h3>
                <p className="text-xs text-slate-500">Sell directly to wholesalers with zero commission</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddListing} className="space-y-4 text-xs font-medium text-slate-700">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Crop Name & Variety</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Matta Rice / Sweet Corn"
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Quantity</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2.5 Tons / 500 kg"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Expected Price</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹35 / kg"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Quality Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full bg-slate-50 border border-emerald-200 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-600"
                >
                  <option value="Grade A Premium">Grade A Premium Organic</option>
                  <option value="Grade B Standard">Grade B Standard</option>
                  <option value="Grade C Processing">Grade C Processing</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#8CE854] hover:bg-[#78d641] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Publish Listing Now</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
