import React from 'react';
import { motion } from 'framer-motion';



interface PersonalDetailsProps {
    data: {
        name: string;
        email: string;
        number: string;
        address: string;
    };
    updateData: (fields: Partial<PersonalDetailsProps['data']>) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data, updateData }) => {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col gap-4"
        >
            <h2 className="text-xl font-bold text-slate-800 mb-2">Personal Details</h2>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Full Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateData({ name: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. John Doe"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Email Address</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData({ email: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. john@example.com"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Phone Number</label>
                <input
                    type="tel"
                    value={data.number}
                    onChange={(e) => updateData({ number: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. +1 234 567 890"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">Address</label>
                <input
                    type="text"
                    value={data.address}
                    onChange={(e) => updateData({ address: e.target.value })}
                    className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. 123 Main St, New York, NY"
                    required
                />
            </div>
        </motion.div>
    );
};

export default PersonalDetails;
