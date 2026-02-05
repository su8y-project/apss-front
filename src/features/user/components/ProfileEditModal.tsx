import React from 'react';
import { X } from 'lucide-react';
import { UserProfileForm } from './UserProfileForm';
import type { UserProfile } from '../types';

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: UserProfile;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, initialData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm anim-fade-in">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-1">
                    <UserProfileForm
                        mode="edit"
                        initialData={initialData}
                        onComplete={onClose}
                    />
                </div>
            </div>
        </div>
    );
};
