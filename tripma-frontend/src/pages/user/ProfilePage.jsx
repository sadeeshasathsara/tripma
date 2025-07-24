import React, { useState } from 'react';
import {
    User,
    Settings,
    Shield,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Users,
    Luggage,
    Camera,
    Edit3,
    Save,
    X,
    Bell,
    Key,
    Globe,
    Heart,
    CreditCard,
    Plane,
    ChevronRight,
    Building2,
    LogOut
} from 'lucide-react';
import Navbar from '../../components/user/landingPage/navbar/Navbar';
import TripmaFooter from '../../components/user/landingPage/footer/Footer';
import { FullUserAPI } from '../../api/UserAPI';
import { BACKEND_URL, userAccount } from '../../tools/Tools';
import { logoutUser } from '../../tools/Logout';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [editingSection, setEditingSection] = useState('');

    // Mock data - this would come from your backend
    const [profileData, setProfileData] = useState({
        user: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            profilePic: "",
            type: "",
            dob: "",
            email: "",
            phoneNumber: "",
            address: {
                house: "",
                street: "",
                city: "",
                state: "",
                country: ""
            },
            knownTravellerNumber: "",
            emergencyContacts: ["", ""],
            bagsCount: 2,
            userAccount: {
                email: "",
                dealAlerts: true,
                termsAndConditions: true,
                connectedAccounts: {
                    google: true,
                    apple: false,
                    facebook: true
                }
            }
        }
    });

    React.useEffect(() => {
        (async () => {
            try {
                const data = await FullUserAPI();
                console.log(data);

                if (data) {
                    setProfileData(data.user)
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const sidebarItems = [
        {
            id: 'personal',
            label: 'Personal Information',
            icon: User,
            description: 'Basic profile details'
        },
        {
            id: 'contact',
            label: 'Contact & Address',
            icon: MapPin,
            description: 'Contact information and location'
        },
        {
            id: 'travel',
            label: 'Travel Preferences',
            icon: Plane,
            description: 'Travel-related settings'
        },
        {
            id: 'account',
            label: 'Account Settings',
            icon: Settings,
            description: 'Preferences and connected accounts'
        },
        {
            id: 'security',
            label: 'Security & Privacy',
            icon: Shield,
            description: 'Password and security options'
        }
    ];

    const handleEdit = (section) => {
        setEditingSection(section);
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        setEditingSection('');
        // Here you would send the updated data to your backend
        console.log('Saving profile data:', profileData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingSection('');
        // Reset any unsaved changes
    };

    const updateProfileData = (section, field, value) => {
        setProfileData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateAddressData = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                address: {
                    ...prev.user.address,
                    [field]: value
                }
            }
        }));
    };

    const InputField = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            />
        </div>
    );

    const SectionCard = ({ title, children, onEdit, isEditing: sectionEditing }) => (
        <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {sectionEditing ? (
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Save size={16} />
                            <span>Save Changes</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onEdit}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    >
                        <Edit3 size={16} />
                        <span>Edit</span>
                    </button>
                )}
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <img
                            src={`${BACKEND_URL}${profileData.profilePic}`}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg transition-colors duration-200">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {profileData.firstName} {profileData.lastName}
                        </h2>
                        <p className="text-gray-600 mb-2">{profileData.email}</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Active Account
                        </span>
                    </div>
                </div>
            </div>

            <SectionCard
                title="Basic Information"
                onEdit={() => handleEdit('basic-info')}
                isEditing={editingSection === 'basic-info'}
            >
                {editingSection === 'basic-info' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="First Name"
                            value={profileData.firstName}
                            onChange={(e) => updateProfileData('user', 'firstName', e.target.value)}
                        />
                        <InputField
                            label="Last Name"
                            value={profileData.lastName}
                            onChange={(e) => updateProfileData('user', 'lastName', e.target.value)}
                        />
                        <InputField
                            label="Middle Name"
                            value={profileData.middleName}
                            onChange={(e) => updateProfileData('user', 'middleName', e.target.value)}
                        />
                        <InputField
                            label="Suffix"
                            value={profileData.suffix}
                            onChange={(e) => updateProfileData('user', 'suffix', e.target.value)}
                        />
                        <InputField
                            label="Date of Birth"
                            type="date"
                            value={profileData.dob}
                            onChange={(e) => updateProfileData('user', 'dob', e.target.value)}
                        />
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                            <select
                                value={profileData.type}
                                onChange={(e) => updateProfileData('user', 'type', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option value="adult">Adult</option>
                                <option value="minor">Minor</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.firstName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Middle Name</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.middleName || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                                <p className="text-gray-900 font-medium text-lg flex items-center">
                                    <Calendar size={18} className="mr-2 text-gray-400" />
                                    {new Date(profileData.dob).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.lastName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Suffix</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.suffix || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
                                <p className="text-gray-900 font-medium text-lg capitalize">{profileData.type}</p>
                            </div>
                        </div>
                    </div>
                )}
            </SectionCard>
        </div>
    );

    const renderContactInfo = () => (
        <div className="space-y-6">
            <SectionCard
                title="Contact Information"
                onEdit={() => handleEdit('contact-info')}
                isEditing={editingSection === 'contact-info'}
            >
                {editingSection === 'contact-info' ? (
                    <div className="space-y-6">
                        <InputField
                            label="Email Address"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => updateProfileData('user', 'email', e.target.value)}
                        />
                        <InputField
                            label="Phone Number"
                            type="tel"
                            value={profileData.phoneNumber}
                            onChange={(e) => updateProfileData('user', 'phoneNumber', e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Mail size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Phone size={20} className="text-green-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                )}
            </SectionCard>

            <SectionCard
                title="Address Information"
                onEdit={() => handleEdit('address')}
                isEditing={editingSection === 'address'}
            >
                {editingSection === 'address' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="House/Apartment Number"
                            value={profileData.address.house}
                            onChange={(e) => updateAddressData('house', e.target.value)}
                        />
                        <InputField
                            label="Street Address"
                            value={profileData.address.street}
                            onChange={(e) => updateAddressData('street', e.target.value)}
                        />
                        <InputField
                            label="City"
                            value={profileData.address.city}
                            onChange={(e) => updateAddressData('city', e.target.value)}
                        />
                        <InputField
                            label="State/Province"
                            value={profileData.address.state}
                            onChange={(e) => updateAddressData('state', e.target.value)}
                        />
                        <div className="md:col-span-2">
                            <InputField
                                label="Country"
                                value={profileData.address.country}
                                onChange={(e) => updateAddressData('country', e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                            <MapPin size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2">Full Address</label>
                            <div className="text-gray-900 font-medium text-lg leading-relaxed">
                                <p>{profileData.address.house} {profileData.address.street}</p>
                                <p>{profileData.address.city}, {profileData.address.state}</p>
                                <p>{profileData.address.country}</p>
                            </div>
                        </div>
                    </div>
                )}
            </SectionCard>

            <SectionCard
                title="Emergency Contacts"
                onEdit={() => handleEdit('emergency')}
                isEditing={editingSection === 'emergency'}
            >
                <div className="space-y-4">
                    {profileData.emergencyContacts.map((contact, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Users size={20} className="text-red-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Emergency Contact {index + 1}</label>
                                <p className="text-gray-900 font-medium text-lg">{contact}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );

    const renderTravelInfo = () => (
        <div className="space-y-6">
            <SectionCard
                title="Travel Preferences"
                onEdit={() => handleEdit('travel-info')}
                isEditing={editingSection === 'travel-info'}
            >
                {editingSection === 'travel-info' ? (
                    <div className="space-y-6">
                        <InputField
                            label="Known Traveller Number (KTN)"
                            value={profileData.knownTravellerNumber}
                            onChange={(e) => updateProfileData('user', 'knownTravellerNumber', e.target.value)}
                            placeholder="Enter your KTN for expedited security screening"
                        />
                        <InputField
                            label="Default Bags Count"
                            type="number"
                            value={profileData.bagsCount}
                            onChange={(e) => updateProfileData('user', 'bagsCount', parseInt(e.target.value))}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Globe size={20} className="text-indigo-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Known Traveller Number</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.knownTravellerNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Luggage size={20} className="text-orange-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Default Bags Count</label>
                                <p className="text-gray-900 font-medium text-lg">{profileData.bagsCount} bags</p>
                            </div>
                        </div>
                    </div>
                )}
            </SectionCard>
        </div>
    );

    const renderAccountSettings = () => (
        <div className="space-y-6">
            <SectionCard title="Notification Preferences">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Bell size={20} className="text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">Deal Alerts</p>
                                <p className="text-sm text-gray-600">Receive notifications about travel deals and promotions</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={profileData.userAccount.dealAlerts}
                                onChange={(e) => updateProfileData('userAccount', 'dealAlerts', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Connected Accounts">
                <div className="space-y-4">
                    {[
                        { name: 'Google', connected: profileData.userAccount.connectedAccounts.google, color: 'red', icon: 'G' },
                        { name: 'Apple', connected: profileData.userAccount.connectedAccounts.apple, color: 'gray', icon: '' },
                        { name: 'Facebook', connected: profileData.userAccount.connectedAccounts.facebook, color: 'blue', icon: 'f' }
                    ].map((account) => (
                        <div key={account.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 bg-${account.color}-100 rounded-lg flex items-center justify-center`}>
                                    <span className={`text-${account.color}-600 font-semibold`}>
                                        {account.icon || account.name[0]}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{account.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {account.connected ? 'Connected and syncing' : 'Not connected'}
                                    </p>
                                </div>
                            </div>
                            <button className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${account.connected
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                }`}>
                                {account.connected ? 'Disconnect' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
            <SectionCard title="Password & Authentication">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Key size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Password</p>
                                <p className="text-sm text-gray-600">Last updated 30 days ago</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200">
                            Change Password
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Shield size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors duration-200">
                            Enable 2FA
                        </button>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Privacy & Data">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Terms and Conditions</p>
                            <p className="text-sm text-gray-600">Accepted on account creation</p>
                        </div>
                        <div className="flex items-center text-green-600">
                            <Heart size={16} className="mr-2" />
                            <span className="font-medium">Accepted</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-red-600">Delete Account</p>
                                <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
                            </div>
                            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </SectionCard>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalInfo();
            case 'contact':
                return renderContactInfo();
            case 'travel':
                return renderTravelInfo();
            case 'account':
                return renderAccountSettings();
            case 'security':
                return renderSecuritySettings();
            default:
                return renderPersonalInfo();
        }
    };

    const [signupStatus, setSignupStatus] = React.useState(false);

    const handleSignupStatusChange = (status) => {
        setSignupStatus(status);
    }

    const dispatch = useDispatch()

    return (
        <>
            {/* Navbar */}
            <div className='w-full z-30'>
                <Navbar onSignupChanged={handleSignupStatusChange} />
            </div>

            <div className="min-h-screen bg-gray-50">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5193fd 0%, #6f53fd 100%)' }}>
                                    <Building2 size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
                                    <p className="text-sm text-gray-600">Manage your account</p>
                                </div>
                            </div>
                        </div>

                        <nav className="p-4">
                            <div className="space-y-2">
                                {sidebarItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 group ${activeTab === item.id
                                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <IconComponent size={20} className={`${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                                                    }`} />
                                                <div>
                                                    <p className="font-medium">{item.label}</p>
                                                    <p className="text-xs text-gray-500">{item.description}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={16} className={`${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
                                                }`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="absolute bottom-0 left-0 right-0 w-80 p-4 border-t border-gray-200 bg-white">
                            <button onClick={() => logoutUser(dispatch)} className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <LogOut size={20} className="text-gray-400" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                    {sidebarItems.find(item => item.id === activeTab)?.label}
                                </h2>
                                <p className="text-gray-600">
                                    {sidebarItems.find(item => item.id === activeTab)?.description}
                                </p>
                            </div>

                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfilePage;