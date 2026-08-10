import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginAdminMutation } from '../../redux/api/adminApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const { adminToken } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (adminToken) {
      navigate('/admin/dashboard');
    }
  }, [adminToken, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const data = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials({ email: data.email, token: data.token }));
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* Left Side - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1a2b3c] overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[#1a2b3c]/60 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Property" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-16 max-w-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#D29F54] rounded-2xl flex items-center justify-center transform rotate-45 shadow-2xl">
              <ShieldCheck className="text-white transform -rotate-45" size={32} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">Luxora Control Panel</h2>
          <p className="text-lg text-gray-200 leading-relaxed font-light">
            Secure access to manage your luxury properties, oversee client communications, and track performance metrics.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 bg-[#fafafa]">
        <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100">
          
          <div className="mb-10 text-center">
            <h4 className="text-[#D29F54] font-bold text-xs tracking-widest uppercase mb-3">Welcome Back</h4>
            <h1 className="text-4xl font-bold text-[#1a2b3c] font-serif mb-2">Admin Login</h1>
            <p className="text-gray-400 text-sm">Please enter your credentials to access the dashboard.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8 text-sm flex items-start shadow-sm">
              <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
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
                  placeholder="admin@luxora.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:bg-white focus:border-[#D29F54] focus:ring-1 focus:ring-[#D29F54] rounded-xl pl-12 pr-4 py-4 outline-none transition-all text-sm placeholder-gray-400 shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full group relative flex justify-center items-center gap-3 bg-[#1a2b3c] hover:bg-[#2a3b4c] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Authenticating...'
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          {/* Optional: Secret link to signup for initial setup */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-300">
              Need to initialize the system? <Link to="/admin/signup" className="text-[#D29F54] hover:underline">Setup Admin</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
