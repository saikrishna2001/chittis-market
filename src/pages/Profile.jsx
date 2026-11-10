import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  User,
  MapPin,
  Plus,
  Trash2,
  CheckCircle,
  Shield,
  Phone,
  Mail,
  Award,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  selectCurrentUser,
  selectAddresses,
  updateProfile,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/redux/slices/authSlice';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const addresses = useSelector(selectAddresses);

  const [activeTab, setActiveTab] = useState('profile');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Profile Form state
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });

  // New Address Form state
  const [newAddr, setNewAddr] = useState({
    name: currentUser?.name || '',
    type: 'Home',
    street: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '',
    phone: currentUser?.phone || '',
    isDefault: false,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    toast.success('Profile details saved successfully! 🌱');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.pincode) {
      toast.error('Please enter street address and pincode');
      return;
    }
    dispatch(addAddress(newAddr));
    toast.success('New delivery address added!');
    setIsAddressModalOpen(false);
    setNewAddr({
      name: currentUser?.name || '',
      type: 'Home',
      street: '',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '',
      phone: currentUser?.phone || '',
      isDefault: false,
    });
  };

  return (
    <div className="min-h-screen py-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Account Settings' }]} />

        <div className="my-6 pb-4 border-b border-emerald-100">
          <h1 className="text-3xl font-extrabold text-brand-dark font-serif">
            Customer Account
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Manage your personal profile, delivery address book, and harvest loyalty points
          </p>
        </div>

        {/* 2-Column Layout: Sidebar Nav + Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Card & Tabs (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft-sm text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                  alt=""
                  className="w-full h-full rounded-full object-cover border-4 border-brand-light shadow-soft-sm"
                />
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-brand-fresh text-white flex items-center justify-center text-xs shadow-xs" title="Verified Customer">
                  ✓
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-brand-dark font-serif">
                  {currentUser?.name || 'Customer'}
                </h3>
                <p className="text-xs text-brand-muted">{currentUser?.email}</p>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-brand-primary px-3 py-1 rounded-full border border-emerald-200">
                  {currentUser?.role === 'admin' ? 'Store Administrator' : 'Gold Harvest Member'}
                </span>
              </div>

              {/* Loyalty Points Pill */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-orange" />
                  <span className="font-bold text-brand-dark">Fresh Reward Coins</span>
                </div>
                <span className="font-black text-brand-primary font-sans text-sm">
                  {currentUser?.loyaltyPoints || 340} pts
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white p-3 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-brand-primary text-white shadow-soft-sm'
                    : 'text-brand-dark hover:bg-brand-light'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile Information</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-brand-primary text-white shadow-soft-sm'
                    : 'text-brand-dark hover:bg-brand-light'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses ({addresses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-brand-primary text-white shadow-soft-sm'
                    : 'text-brand-dark hover:bg-brand-light'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Account Security & Preferences</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tab Panels (8 Cols) */}
          <div className="lg:col-span-8">
            {/* 1. Profile Information */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-6">
                <h3 className="font-bold text-xl text-brand-dark font-serif pb-3 border-b border-emerald-100">
                  Personal Information
                </h3>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Full Name
                      </label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1">
                        Phone Number
                      </label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1">
                      Email Address
                    </label>
                    <Input
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      type="email"
                    />
                  </div>

                  <Button type="submit" className="rounded-full px-6 font-bold shadow-fresh mt-2">
                    Save Changes
                  </Button>
                </form>
              </div>
            )}

            {/* 2. Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <div>
                    <h3 className="font-bold text-xl text-brand-dark font-serif">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-xs text-brand-muted">
                      Add and manage your primary residence, office, and family locations
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsAddressModalOpen(true)}
                    size="sm"
                    className="rounded-full gap-1.5 text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-2xl border border-emerald-100 bg-brand-surface space-y-3 relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-brand-dark">
                            {addr.name} ({addr.type})
                          </span>
                          {addr.isDefault ? (
                            <span className="text-[10px] font-bold bg-brand-primary text-white px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          ) : (
                            <button
                              onClick={() => dispatch(setDefaultAddress(addr.id))}
                              className="text-[10px] font-semibold text-brand-primary hover:underline"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-brand-muted leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs text-brand-dark font-semibold mt-2">
                          Phone: {addr.phone}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-emerald-100/60 flex justify-end">
                        <button
                          onClick={() => {
                            if (addresses.length <= 1) {
                              toast.error('You must keep at least one delivery address.');
                              return;
                            }
                            dispatch(deleteAddress(addr.id));
                            toast.info('Address removed');
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Account Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-soft-sm space-y-6">
                <h3 className="font-bold text-xl text-brand-dark font-serif pb-3 border-b border-emerald-100">
                  Account Preferences & Security
                </h3>

                <div className="space-y-4 text-xs text-brand-dark">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-bg border border-emerald-100">
                    <div>
                      <p className="font-bold text-sm">Harvest Morning Notifications</p>
                      <p className="text-brand-muted">Receive alerts when Alphonso mangoes and rare greens land.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-primary" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-brand-bg border border-emerald-100">
                    <div>
                      <p className="font-bold text-sm">WhatsApp Delivery Tracking</p>
                      <p className="text-brand-muted">Get automated driver location and OTP on WhatsApp.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-primary" />
                  </div>

                  <div className="pt-4 border-t border-emerald-100">
                    <Button variant="outline" className="rounded-full text-xs border-emerald-200">
                      Change Account Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Address Modal */}
        <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
          <DialogContent className="max-w-md p-6 rounded-3xl">
            <DialogHeader>
              <DialogTitle>Add Delivery Address</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAddress} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block font-semibold mb-1">Contact Name</label>
                <Input
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  placeholder="e.g. Sravan Kumar"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Address Label</label>
                  <select
                    value={newAddr.type}
                    onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value })}
                    className="w-full h-11 px-3 rounded-2xl border border-emerald-100 bg-white"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work / Office</option>
                    <option value="Parents">Parents' Home</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone Number</label>
                  <Input
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    placeholder="+91..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Street Address</label>
                <Input
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  placeholder="Flat/House No., Street Name"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <Input
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">State</label>
                  <Input
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Pincode</label>
                  <Input
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    placeholder="500034"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full mt-4 font-bold">
                Save & Add Address
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
