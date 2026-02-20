import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

import { MinimalTemplate } from './templates/MinimalTemplate';
import { CompactTemplate } from './templates/CompactTemplate';

interface FormDataState {
    name: string;
    email: string;
    number: string;
    address: string;
    degName: string;
    university: string;
    educationYear: string;
    education_summary: string;
    position: string;
    company: string;
    time: string;
    jobDescription: string;
    skills: string; 
}

interface LiveResumePreviewProps {
    data: FormDataState;
}

const LiveResumePreview: React.FC<LiveResumePreviewProps> = ({ data }) => {
    const { selectedTemplate } = useContext(UserContext);

    switch (selectedTemplate) {
        case 'professional':
            return <ProfessionalTemplate data={data} />;
        case 'creative':
            return <CreativeTemplate data={data} />;
        case 'minimal':
            return <MinimalTemplate data={data} />;
        case 'compact':
            return <CompactTemplate data={data} />;
        case 'modern':
        default:
            return <ModernTemplate data={data} />;
    }
};

export default LiveResumePreview;
