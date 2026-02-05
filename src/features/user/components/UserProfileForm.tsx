import React, { useState, useEffect } from 'react';
import { useRegisterProfile } from '../api/useRegisterProfile';
import { useUpdateProfile } from '../api/useUpdateProfile';
import type { CreateProfileDTO, UserProfile } from '../types';
import { User, Sparkles, Bell, Shield, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface UserProfileFormProps {
    initialData?: UserProfile | null;
    mode?: 'create' | 'edit';
    onComplete?: () => void;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialData, mode = 'create', onComplete }) => {
    const { mutate: register, isPending: isRegisterPending, error: registerError } = useRegisterProfile();
    const { mutate: update, isPending: isUpdatePending, error: updateError } = useUpdateProfile();

    const isPending = isRegisterPending || isUpdatePending;
    const error = registerError || updateError;

    // Form State
    const [formData, setFormData] = useState<CreateProfileDTO>({
        nickname: initialData?.nickname || '',
        age: initialData?.age || 20,
        gender: initialData?.gender || 'MALE',
        enableMarketingNotification: initialData?.enableMarketingNotification ?? false,
        enableIssueNotification: initialData?.enableIssueNotification ?? false,
        // In edit mode, terms are already read.
        isReadTermsAndConditions: mode === 'edit' ? true : false,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nickname: initialData.nickname,
                age: initialData.age,
                gender: initialData.gender,
                enableMarketingNotification: initialData.enableMarketingNotification,
                enableIssueNotification: initialData.enableIssueNotification,
                isReadTermsAndConditions: true,
            });
        }
    }, [initialData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'age' ? Number(value) : value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.isReadTermsAndConditions) {
            return;
        }

        const payload = formData;

        if (mode === 'edit') {
            update(payload, { onSuccess: onComplete });
        } else {
            register(payload, { onSuccess: onComplete });
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto anim-scale-in">
            {/* Header Branding */}
            <div className="text-center mb-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20 mb-4 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]">
                    <Activity className="h-8 w-8 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                    {mode === 'create' ? (
                        <>Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">APSS</span></>
                    ) : (
                        <>Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Profile</span></>
                    )}
                </h2>
                <p className="text-slate-400">
                    {mode === 'create'
                        ? 'Complete your profile to unlock personalized AI insights.'
                        : 'Update your personal information and preferences.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                {/* Decorative gradients */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"></div>

                {error && (
                    <div className="relative mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-200">
                        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                        <div className="text-sm">
                            {mode === 'create' ? 'Profile registration failed.' : 'Profile update failed.'} Please try again.
                        </div>
                    </div>
                )}

                <div className="space-y-6 relative z-10">
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Personal Information</h3>

                        {/* Nickname */}
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400">Nickname</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:border-indigo-500/50 focus:bg-slate-950/80 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    placeholder="How should we call you?"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Age */}
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400">Age</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        min="10"
                                        max="100"
                                        className="w-full rounded-xl border border-white/10 bg-slate-950/50 py-2.5 px-4 text-white focus:border-indigo-500/50 focus:bg-slate-950/80 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="group">
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 transition-colors group-focus-within:text-indigo-400">Gender</label>
                                <div className="relative">
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/50 py-2.5 px-4 text-white focus:border-indigo-500/50 focus:bg-slate-950/80 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                        <ChevronRight className="h-4 w-4 rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Notifications Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Preferences</h3>

                        <label className="flex items-start gap-4 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="relative mt-0.5">
                                <input
                                    type="checkbox"
                                    name="enableMarketingNotification"
                                    checked={formData.enableMarketingNotification}
                                    onChange={handleChange}
                                    className="peer sr-only"
                                />
                                <div className="h-5 w-5 rounded border border-slate-500 bg-transparent transition-all peer-checked:border-indigo-500 peer-checked:bg-indigo-500"></div>
                                <CheckCircle2 className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <Sparkles className="h-4 w-4 text-indigo-400" />
                                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Marketing Insights</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">Receive AI-curated investment opportunities and market trends.</p>
                            </div>
                        </label>

                        <label className="flex items-start gap-4 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="relative mt-0.5">
                                <input
                                    type="checkbox"
                                    name="enableIssueNotification"
                                    checked={formData.enableIssueNotification}
                                    onChange={handleChange}
                                    className="peer sr-only"
                                />
                                <div className="h-5 w-5 rounded border border-slate-500 bg-transparent transition-all peer-checked:border-indigo-500 peer-checked:bg-indigo-500"></div>
                                <CheckCircle2 className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <Bell className="h-4 w-4 text-amber-400" />
                                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">System Alerts</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">Get notified about critical updates and account security events.</p>
                            </div>
                        </label>
                    </div>

                    <div className="pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="isReadTermsAndConditions"
                                    checked={formData.isReadTermsAndConditions}
                                    onChange={handleChange}
                                    disabled={mode === 'edit'}
                                    className="peer sr-only"
                                />
                                <div className={`h-5 w-5 rounded border transition-all ${!formData.isReadTermsAndConditions ? 'border-red-400/50 hover:border-red-400 animate-pulse' : 'border-emerald-500 bg-emerald-500'}`}></div>
                                <CheckCircle2 className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                            </div>
                            <span className="text-sm text-slate-400 transition-colors group-hover:text-slate-300">
                                {mode === 'create' ? (
                                    <>I agree to the <span className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">Terms and Conditions</span></>
                                ) : (
                                    <>Terms and Conditions Accepted</>
                                )}
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending || !formData.isReadTermsAndConditions}
                        className={cn(
                            "w-full relative overflow-hidden rounded-xl py-3.5 font-semibold text-white shadow-lg transition-all duration-300",
                            isPending || !formData.isReadTermsAndConditions
                                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 hover:scale-[1.02] hover:shadow-indigo-500/25 ring-1 ring-white/10"
                        )}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <Activity className="h-4 w-4 animate-spin" />
                                {mode === 'create' ? 'Configuring Profile...' : 'Updating Profile...'}
                            </span>
                        ) : (
                            mode === 'create' ? "Start Your Journey" : "Save Changes"
                        )}
                    </button>
                </div>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-slate-600 mt-8">
                &copy; 2026 Personal AI Investment Assistant. Secure Environment.
            </p>
        </div>
    );
};
