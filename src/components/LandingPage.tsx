import React from 'react';
import HeroSection from './HeroSection';
import FormSection from './FormSection';

interface LandingPageProps {
  onGenerateEmail: (formData: {
    bio: string;
    offer: string;
    target: string;
    company: string;
    industry: string;
    painPoint: string;
    companiesWorkedWith: string;
    isNewToField: boolean;
  }) => void;
  isLoading: boolean;
  initialFormData?: {
    bio: string;
    offer: string;
    target: string;
    company: string;
    industry: string;
    painPoint: string;
    companiesWorkedWith: string;
    isNewToField: boolean;
  };
  onFormDataChange?: (formData: {
    bio: string;
    offer: string;
    target: string;
    company: string;
    industry: string;
    painPoint: string;
    companiesWorkedWith: string;
    isNewToField: boolean;
  }) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onGenerateEmail, 
  isLoading, 
  initialFormData,
  onFormDataChange 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <HeroSection onScrollToForm={() => document.getElementById('email-form')?.scrollIntoView({ behavior: 'smooth' })} />

      
      <FormSection 
        onGenerateEmail={onGenerateEmail}
        isLoading={isLoading}
        initialFormData={initialFormData}
        onFormDataChange={onFormDataChange}
      />
    </div>
  );
};

export default LandingPage; 