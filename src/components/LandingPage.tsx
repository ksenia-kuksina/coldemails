import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Zap, Target, User, Gift, ArrowRight, CheckCircle } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    bio: initialFormData?.bio || '',
    offer: initialFormData?.offer || '',
    target: initialFormData?.target || '',
    company: initialFormData?.company || '',
    industry: initialFormData?.industry || 'SaaS',
    painPoint: initialFormData?.painPoint || '',
    companiesWorkedWith: initialFormData?.companiesWorkedWith || '',
    isNewToField: initialFormData?.isNewToField || false
  });

  const industries = [
    'SaaS', 'eCommerce', 'Agencies', 'Local Business', 
    'Startups', 'Enterprise', 'Healthcare', 'Education'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormDataChange?.(formData);
    onGenerateEmail(formData);
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

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Futuristic Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-16">
        {/* Left Column - Content */}
        <motion.div 
          className="flex-1 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Main Headline */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            variants={itemVariants}
          >
            Write Laser-Targeted
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Cold Emails
            </span>
            <br />
            in Seconds
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg text-gray-300 max-w-lg leading-relaxed mb-8"
            variants={itemVariants}
          >
            Our AI crafts tailored cold emails based on your background, offer, target, and industry. 
            <span className="text-white font-medium"> No fluff. Just conversion-ready copy.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4"
            variants={itemVariants}
          >
            <button
              onClick={() => document.getElementById('email-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              Generate My Email
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column - 3D Visual */}
        <motion.div 
          className="flex-1 max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 3D Email Mockup */}
          <div className="relative">
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl animate-pulse"></div>
            
            {/* Email Container */}
            <motion.div 
              className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
              initial={{ rotateY: -15, rotateX: 10 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, rotateY: -5 }}
            >
              {/* Email Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1"></div>
                <div className="text-xs text-gray-400">AI Generated</div>
              </div>

              {/* Email Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">From: Your Name</div>
                    <div className="text-xs text-gray-400">to: john@company.com</div>
                  </div>
                </div>

                {/* Typewriter Effect */}
                <motion.div 
                  className="text-white text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="mb-2">
                    <span className="text-blue-400">Subject:</span> Quick question about {formData.company || 'your company'}...
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Hi John,</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>I noticed {formData.company || 'your company'} is...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Would love to discuss how we...</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-sm"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-20 blur-sm"
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.form
        id="email-form"
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bio Input */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-neon-blue" />
              <label className="text-lg font-semibold">Who you are</label>
            </div>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="e.g., I'm a growth consultant who helps SaaS companies scale from $1M to $10M ARR..."
              className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors resize-none"
              rows={3}
              required
            />
          </div>
        </motion.div>

        {/* Offer Input */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-neon-purple" />
              <label className="text-lg font-semibold">What you offer</label>
            </div>
            <textarea
              value={formData.offer}
              onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
              placeholder="e.g., 30% increase in conversion rates through optimized funnels..."
              className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-purple transition-colors resize-none"
              rows={3}
              required
            />
          </div>
        </motion.div>

        {/* Target Input */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-neon-pink" />
              <label className="text-lg font-semibold">Who you're targeting</label>
            </div>
            <textarea
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              placeholder="e.g., John Smith, Marketing Director at Acme Corp"
              className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink transition-colors resize-none"
              rows={2}
              required
            />
          </div>
        </motion.div>

        {/* Company Input */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-neon-blue" />
              <label className="text-lg font-semibold">Target Company</label>
            </div>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g., Acme Corp, Stripe, HubSpot"
              className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors"
              required
            />
          </div>
        </motion.div>

        {/* Pain Point Input */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-neon-purple" />
              <label className="text-lg font-semibold">Their Pain Point</label>
            </div>
            <textarea
              value={formData.painPoint}
              onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
              placeholder="e.g., low conversion rates, high customer churn, inefficient processes"
              className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-purple transition-colors resize-none"
              rows={2}
              required
            />
          </div>
        </motion.div>

        {/* Companies Worked With */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-neon-green" />
              <label className="text-lg font-semibold">Companies You've Worked With</label>
            </div>
            <div className="space-y-3">
              <textarea
                value={formData.companiesWorkedWith}
                onChange={(e) => setFormData({ ...formData, companiesWorkedWith: e.target.value })}
                placeholder="e.g., Stripe, HubSpot, Nike, Amazon (or leave empty if new to field)"
                className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-neon-green transition-colors resize-none"
                rows={2}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newToField"
                  checked={formData.isNewToField}
                  onChange={(e) => setFormData({ ...formData, isNewToField: e.target.checked })}
                  className="w-4 h-4 text-neon-green bg-glass-dark border-glass-medium rounded focus:ring-neon-green"
                />
                <label htmlFor="newToField" className="text-sm text-gray-300">
                  I'm new to this field (will mention freelance/own projects)
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industry Dropdown */}
        <motion.div variants={itemVariants} className="floating-card">
          <div className="glass-panel p-6 neon-glow">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-neon-green" />
              <label className="text-lg font-semibold">Industry / Use Case</label>
            </div>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full bg-glass-dark border border-glass-medium rounded-xl p-4 text-white focus:outline-none focus:border-neon-green transition-colors"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry} className="bg-slate-800">
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div variants={itemVariants} className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white font-bold py-4 px-8 rounded-2xl text-lg neon-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Mail className="w-6 h-6" />
                Generate Email
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default LandingPage; 