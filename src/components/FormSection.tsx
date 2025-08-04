import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, ArrowRight, ArrowLeft, User, Target, Building, Lightbulb, Briefcase, Mail, AlertCircle } from 'lucide-react';

interface FormSectionProps {
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

interface FormData {
  // Step 1: About You
  whoYouAre: string;
  whatYouOffer: string;
  companiesWorkedWith: string;
  
  // Step 2: Target Information
  whoYoureTargeting: string;
  targetCompany: string;
  theirPainPoint: string;
  
  // Step 3: Campaign Details
  industry: string;
  campaignGoal: string;
  tone: string;
}

const STEPS = [
  {
    id: 1,
    title: "About You",
    description: "Tell us about yourself and your services",
    icon: User,
    fields: ['whoYouAre', 'whatYouOffer', 'companiesWorkedWith']
  },
  {
    id: 2,
    title: "Target Audience",
    description: "Define your ideal client",
    icon: Target,
    fields: ['whoYoureTargeting', 'targetCompany', 'theirPainPoint']
  },
  {
    id: 3,
    title: "Campaign Details",
    description: "Set the tone and goal of your email",
    icon: Mail,
    fields: ['industry', 'campaignGoal', 'tone']
  }
];

const INDUSTRIES = [
  "Technology & IT",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Marketing & Advertising",
  "Consulting",
  "Other"
];

const CAMPAIGN_GOALS = [
  "Schedule a meeting",
  "Introduce product",
  "Get feedback",
  "Establish partnership",
  "Attract investment"
];

const TONES = [
  "Professional",
  "Friendly",
  "Direct",
  "Creative",
  "Formal"
];

const FormSection: React.FC<FormSectionProps> = ({ 
  onGenerateEmail, 
  isLoading, 
  initialFormData,
  onFormDataChange 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    whoYouAre: initialFormData?.bio || '',
    whatYouOffer: initialFormData?.offer || '',
    companiesWorkedWith: initialFormData?.companiesWorkedWith || '',
    whoYoureTargeting: initialFormData?.target || '',
    targetCompany: initialFormData?.company || '',
    theirPainPoint: initialFormData?.painPoint || '',
    industry: initialFormData?.industry || '',
    campaignGoal: '',
    tone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepData = STEPS.find(step => step.id === currentStep)!;
  const progress = (currentStep / STEPS.length) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const stepData = STEPS.find(s => s.id === step);
    if (!stepData) return false;

    const newErrors: Record<string, string> = {};
    
    stepData.fields.forEach(field => {
      if (!formData[field as keyof FormData]?.trim()) {
        newErrors[field] = `This field is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    // Convert new form data to old format for compatibility
    const oldFormatData = {
      bio: formData.whoYouAre,
      offer: formData.whatYouOffer,
      target: formData.whoYoureTargeting,
      company: formData.targetCompany,
      industry: formData.industry,
      painPoint: formData.theirPainPoint,
      companiesWorkedWith: formData.companiesWorkedWith,
      isNewToField: false // Default value
    };

    onFormDataChange?.(oldFormatData);
    onGenerateEmail(oldFormatData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  // Animated envelope icons
  const envelopeIcons = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.3
  }));

  return (
    <section id="email-form" className="min-h-screen relative overflow-hidden w-screen -mx-4" style={{ backgroundColor: 'rgb(4, 2, 3)' }}>
      {/* Animated Envelope Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {envelopeIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: `${icon.size}rem`,
              height: `${icon.size}rem`,
              opacity: icon.opacity
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
                         <svg
               viewBox="0 0 24 24"
               fill="currentColor"
               className="w-full h-full"
               style={{ color: '#5511D3' }}
             >
               <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
             </svg>
          </motion.div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_50%,transparent_50%,transparent_75%,rgba(120,119,198,0.05)_75%)] bg-[length:20px_20px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 w-full">
        <div className="w-full max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Generate Your Email
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Create a personalized cold email in {STEPS.length} simple steps
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Progress Header */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl text-white">Cold Email Generator</h2>
                  <p className="text-muted-foreground">
                    Create a personalized email in {STEPS.length} simple steps
                  </p>
                </div>
                <Badge variant="secondary">
                  Step {currentStep} of {STEPS.length}
                </Badge>
              </div>
              
              <Progress value={progress} className="h-2" />
              
              {/* Step indicators */}
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;
                  const Icon = step.icon;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                        ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 
                          isActive ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      {index < STEPS.length - 1 && (
                        <Separator className="w-16 mx-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Form Content */}
            <motion.div variants={itemVariants}>
              <Card className="border-slate-700 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <currentStepData.icon className="w-5 h-5" />
                    {currentStepData.title}
                  </CardTitle>
                  <CardDescription>{currentStepData.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Step 1: About You */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="whoYouAre" className="text-white">Who are you? *</Label>
                        <Textarea
                          id="whoYouAre"
                          placeholder="e.g., I'm the founder of a SaaS startup that helps teams automate their workflows..."
                          value={formData.whoYouAre}
                          onChange={(e) => updateFormData('whoYouAre', e.target.value)}
                          className={errors.whoYouAre ? 'border-destructive' : ''}
                        />
                        {errors.whoYouAre && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.whoYouAre}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatYouOffer" className="text-white">What do you offer? *</Label>
                        <Textarea
                          id="whatYouOffer"
                          placeholder="e.g., A platform for email marketing automation with AI personalization..."
                          value={formData.whatYouOffer}
                          onChange={(e) => updateFormData('whatYouOffer', e.target.value)}
                          className={errors.whatYouOffer ? 'border-destructive' : ''}
                        />
                        {errors.whatYouOffer && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.whatYouOffer}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companiesWorkedWith" className="text-white">Which companies have you worked with? *</Label>
                        <Input
                          id="companiesWorkedWith"
                          placeholder="e.g., Google, Microsoft, Apple, Meta"
                          value={formData.companiesWorkedWith}
                          onChange={(e) => updateFormData('companiesWorkedWith', e.target.value)}
                          className={errors.companiesWorkedWith ? 'border-destructive' : ''}
                        />
                        {errors.companiesWorkedWith && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.companiesWorkedWith}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Target Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="whoYoureTargeting" className="text-white">Who are you targeting? *</Label>
                        <Input
                          id="whoYoureTargeting"
                          placeholder="e.g., CTOs of tech startups, HR directors at large companies"
                          value={formData.whoYoureTargeting}
                          onChange={(e) => updateFormData('whoYoureTargeting', e.target.value)}
                          className={errors.whoYoureTargeting ? 'border-destructive' : ''}
                        />
                        {errors.whoYoureTargeting && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.whoYoureTargeting}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetCompany" className="text-white">Target company *</Label>
                        <Input
                          id="targetCompany"
                          placeholder="e.g., Shopify, Stripe, Notion"
                          value={formData.targetCompany}
                          onChange={(e) => updateFormData('targetCompany', e.target.value)}
                          className={errors.targetCompany ? 'border-destructive' : ''}
                        />
                        {errors.targetCompany && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.targetCompany}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="theirPainPoint" className="text-white">Their pain point *</Label>
                        <Textarea
                          id="theirPainPoint"
                          placeholder="e.g., Low email campaign conversion rates, outdated hiring processes..."
                          value={formData.theirPainPoint}
                          onChange={(e) => updateFormData('theirPainPoint', e.target.value)}
                          className={errors.theirPainPoint ? 'border-destructive' : ''}
                        />
                        {errors.theirPainPoint && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.theirPainPoint}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Campaign Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="industry" className="text-white">Industry *</Label>
                        <Select 
                          value={formData.industry} 
                          onValueChange={(value: string) => updateFormData('industry', value)}
                        >
                          <SelectTrigger className={errors.industry ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRIES.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.industry && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.industry}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="campaignGoal" className="text-white">Campaign goal *</Label>
                        <Select 
                          value={formData.campaignGoal} 
                          onValueChange={(value: string) => updateFormData('campaignGoal', value)}
                        >
                          <SelectTrigger className={errors.campaignGoal ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                          <SelectContent>
                            {CAMPAIGN_GOALS.map((goal) => (
                              <SelectItem key={goal} value={goal}>
                                {goal}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.campaignGoal && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.campaignGoal}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tone" className="text-white">Email tone *</Label>
                        <Select 
                          value={formData.tone} 
                          onValueChange={(value: string) => updateFormData('tone', value)}
                        >
                          <SelectTrigger className={errors.tone ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            {TONES.map((tone) => (
                              <SelectItem key={tone} value={tone}>
                                {tone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.tone && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.tone}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      {/* Summary */}
                      <div className="mt-8 p-4 bg-muted rounded-lg">
                        <h4 className="mb-3 text-white">Your email summary:</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p><strong>Sender:</strong> {formData.whoYouAre.slice(0, 100)}...</p>
                          <p><strong>Recipient:</strong> {formData.whoYoureTargeting} at {formData.targetCompany}</p>
                          <p><strong>Goal:</strong> {formData.campaignGoal}</p>
                          <p><strong>Tone:</strong> {formData.tone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-4">
                {currentStep < STEPS.length ? (
                  <Button 
                    onClick={nextStep} 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 hover:from-blue-500 hover:via-purple-500 hover:to-purple-700 text-white border-0"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 min-w-[200px] bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 hover:from-blue-500 hover:via-purple-500 hover:to-purple-700 text-white border-0"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Generating email...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Generate Email
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormSection; 