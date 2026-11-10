import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { login } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/common/Logo';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'sravan@example.com',
      password: 'password123',
    },
  });

  const onSubmit = async (data) => {
    // Demo authentication simulation
    const user = {
      id: 'usr-chitti-101',
      name: data.email.includes('admin') ? 'Chitti Admin' : 'Sravan Kumar',
      email: data.email,
      phone: '+91 98765 43210',
      role: data.email.includes('admin') ? 'admin' : 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      memberSince: 'March 2024',
      loyaltyPoints: 340,
    };

    dispatch(login(user));
    toast.success(`Welcome back, ${user.name}! 🌱`);
    navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
  };

  const handleQuickDemoLogin = (role) => {
    if (role === 'admin') {
      setValue('email', 'admin@chittismarket.com');
      setValue('password', 'adminPass123');
      const adminUser = {
        id: 'adm-001',
        name: 'Chitti Store Manager',
        email: 'admin@chittismarket.com',
        phone: '+91 90000 11223',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        memberSince: 'January 2023',
      };
      dispatch(login(adminUser));
      toast.success('Logged in as Store Admin 🛠️');
      navigate('/admin');
    } else {
      setValue('email', 'sravan@example.com');
      setValue('password', 'password123');
      const customer = {
        id: 'usr-chitti-101',
        name: 'Sravan Kumar',
        email: 'sravan@example.com',
        phone: '+91 98765 43210',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        memberSince: 'March 2024',
        loyaltyPoints: 340,
      };
      dispatch(login(customer));
      toast.success('Logged in as Demo Customer 🌱');
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-[2.5rem] border border-emerald-100 p-8 sm:p-10 shadow-soft-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Logo size="default" />
            </div>
            <h1 className="text-2xl font-bold text-brand-dark font-serif">
              Welcome Back
            </h1>
            <p className="text-xs text-brand-muted">
              Sign in to manage orders, wishlist, and farm delivery preferences
            </p>
          </div>

          {/* Quick Demo Access Buttons */}
          <div className="p-3.5 rounded-2xl bg-brand-light/70 border border-emerald-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary block text-center">
              Quick 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemoLogin('customer')}
                className="rounded-xl text-xs bg-white hover:bg-emerald-50 text-brand-primary border-emerald-200"
              >
                Demo Customer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemoLogin('admin')}
                className="rounded-xl text-xs bg-white hover:bg-orange-50 text-brand-orange border-orange-200"
              >
                Demo Admin Portal
              </Button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-brand-dark">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-brand-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-full gap-2 font-bold shadow-fresh mt-2"
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Switch to Register */}
          <div className="text-center pt-2 border-t border-emerald-50 text-xs text-brand-muted">
            <span>Don't have an account yet? </span>
            <Link to="/register" className="font-bold text-brand-primary hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
