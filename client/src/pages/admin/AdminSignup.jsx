import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignupAdminMutation } from '../../redux/api/adminApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import { Mail, Lock, ArrowRight, ShieldCheck, KeyRound, User } from 'lucide-react';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupAdmin, { isLoading }] = useSignupAdminMutation();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      const data = await signupAdmin({ name, email, password, adminSecret }).unwrap();
      dispatch(setCredentials({ name: data.name, email: data.email, token: data.token }));
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Setup failed. Check your secret key.');
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* Left Side - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a2b3c] overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[#1a2b3c]/70 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Architecture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-16 max-w-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#D29F54] rounded-2xl flex items-center justify-center shadow-2xl">
              <ShieldCheck className="text-white" size={32} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">System Initialization</h2>
          <p className="text-lg text-gray-200 leading-relaxed font-light">
            Securely create your master administrative account. You must possess the environment secret key to proceed.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 bg-[#fafafa]">
        <div className="max-w-2xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100">
          
          <div className="mb-10 text-center">
            <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-3">First Time Setup</h4>
            <h1 className="text-4xl font-bold text-[#1a2b3c] font-serif mb-2">Create Admin</h1>
            <p className="text-gray-400 text-sm">Initialize the portal by setting up your secure account.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8 text-sm flex items-start shadow-sm">
              <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-300" />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] rounded-xl pl-12 pr-4 py-4 outline-none transition-all text-sm placeholder-gray-400 shadow-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] rounded-xl pl-12 pr-4 py-4 outline-none transition-all text-sm placeholder-gray-400 shadow-sm"
                  placeholder="admin@mithilalegacy.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] rounded-xl pl-12 pr-4 py-4 outline-none transition-all text-sm placeholder-gray-400 shadow-sm"
                  placeholder="Create a strong password"
                  required
                  minLength="6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] rounded-xl pl-12 pr-4 py-4 outline-none transition-all text-sm placeholder-gray-400 shadow-sm"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Admin Secret Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-[#D29F54]" />
                </div>
                <input 
                  type="password" 
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] rounded-xl pl-12 pr-4 py-4 outline-none transition-all text-sm placeholder-gray-400 shadow-sm"
                  placeholder="Enter system secret key"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full group relative flex justify-center items-center gap-3 bg-[#D29F54] hover:bg-[#b88645] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Initializing...'
              ) : (
                <>
                  Create Admin Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-300">
              Already initialized? <Link to="/admin/login" className="text-[#1a2b3c] font-bold hover:underline">Go to Login</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
