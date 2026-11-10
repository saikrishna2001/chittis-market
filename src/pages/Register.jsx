import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Phone, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { login } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/common/Logo';

const registerSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms of Service' }),
  }),
});

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      agreeTerms: false,
    },
  });

  const agreeTerms = watch('agreeTerms');

  const onSubmit = async (data) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Just now',
      loyaltyPoints: 100, // 100 bonus points for joining!
    };

    dispatch(login(newUser));
    toast.success(`Welcome to Chitti’s Market, ${newUser.name}! 🎉`, {
      description: '100 Welcome Loyalty Points added to your account.',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12 bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] border border-emerald-100 p-8 sm:p-10 shadow-soft-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Logo size="default" />
            </div>
            <h1 className="text-2xl font-bold text-brand-dark font-serif">
              Create an Account
            </h1>
            <p className="text-xs text-brand-muted">
              Get organic produce delivered fresh from farm to your door
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  {...register('fullName')}
                  placeholder="e.g. Sravan Kumar"
                  className="pl-10"
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Email Address *
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
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  {...register('phone')}
                  placeholder="+91 98765 43210"
                  className="pl-10"
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Minimum 6 characters"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-brand-muted cursor-pointer select-none">
                <Checkbox
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setValue('agreeTerms', checked)}
                  className="mt-0.5"
                />
                <span>
                  I agree to the Chitti's Market{' '}
                  <Link to="/about#terms" className="text-brand-primary underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/about#privacy" className="text-brand-primary underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.agreeTerms.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-full gap-2 font-bold shadow-fresh mt-3"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Register Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-emerald-50 text-xs text-brand-muted">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-brand-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
