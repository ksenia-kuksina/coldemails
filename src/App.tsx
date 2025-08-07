import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ResultPage from './components/ResultPage';
import LandingPage from './components/LandingPage';
import HistorySidebar from './components/HistorySidebar';
import Navbar from './components/Navbar';
import DarkVeil from './components/DarkVeil';

import { saveEmailToHistory, getEmailHistory } from './utils/emailHistory';
import { EmailHistoryEntry } from './types/email';



// AI Prompt Engineering Constants
const PSYCHOLOGICAL_TRIGGERS = [
  "FOMO: 'Only 3 spots left this month...'",
  "Specificity: 'Increased revenue by 47% in 90 days'",
  "Urgency: 'Offer expires Friday'",
  "Curiosity: 'What most {industry} companies miss...'",
  "Authority: 'Featured in Forbes, TechCrunch'",
  "Social Proof: 'Used by {similarCompany}'"
];

// Dynamic email generation based on user inputs and AI

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'result'>('landing');
  const [generatedEmail, setGeneratedEmail] = useState({subject: '', body: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    offer: '',
    target: '',
    company: '',
    industry: 'SaaS',
    painPoint: '',
    companiesWorkedWith: '',
    isNewToField: false
  });
  const [history, setHistory] = useState<EmailHistoryEntry[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getEmailHistory());
  }, []);

  // Hyper-Personalized AI Prompt Engineering
  const createSystemPrompt = (industry: string, company: string, painPoint: string, companiesWorkedWith: string, isNewToField: boolean, bio: string, offer: string) => {
    
    // Analyze user's bio and offer to extract key information
    const bioAnalysis = {
      hasExperience: bio.toLowerCase().includes('experience') || bio.toLowerCase().includes('worked') || bio.toLowerCase().includes('helped'),
      hasResults: bio.toLowerCase().includes('increase') || bio.toLowerCase().includes('growth') || bio.toLowerCase().includes('revenue') || bio.toLowerCase().includes('roi'),
      hasMethodology: bio.toLowerCase().includes('process') || bio.toLowerCase().includes('method') || bio.toLowerCase().includes('system'),
      isConsultant: bio.toLowerCase().includes('consultant') || bio.toLowerCase().includes('advisor') || bio.toLowerCase().includes('specialist'),
      isFreelancer: bio.toLowerCase().includes('freelance') || bio.toLowerCase().includes('independent') || bio.toLowerCase().includes('contractor')
    };

    const offerAnalysis = {
      hasSpecificResults: offer.toLowerCase().includes('%') || offer.toLowerCase().includes('increase') || offer.toLowerCase().includes('revenue'),
      hasTimeframe: offer.toLowerCase().includes('days') || offer.toLowerCase().includes('weeks') || offer.toLowerCase().includes('months'),
      hasProcess: offer.toLowerCase().includes('step') || offer.toLowerCase().includes('process') || offer.toLowerCase().includes('method'),
      isService: offer.toLowerCase().includes('service') || offer.toLowerCase().includes('consulting') || offer.toLowerCase().includes('coaching')
    };

    // Determine the most effective positioning strategy
    let positioningStrategy = '';
    let socialProofStrategy = '';
    let toneStrategy = '';

    if (isNewToField) {
      positioningStrategy = `
POSITIONING FOR NEW PROFESSIONALS:
- Emphasize passion and dedication to the craft
- Focus on methodology and proven processes
- Use phrases like "I've developed a system that..." or "Through my research and testing..."
- Show understanding of industry challenges without claiming big company experience
- Position as a specialist who has studied the problem deeply`;
      
      socialProofStrategy = `
SOCIAL PROOF FOR NEW PROFESSIONALS:
- Mention personal projects and case studies
- Use phrases like "My recent work has shown..." or "I've helped clients achieve..."
- Focus on results and outcomes rather than company names
- Emphasize methodology and systematic approach
- Show passion and dedication to solving this specific problem`;
      
      toneStrategy = 'Enthusiastic, knowledgeable, and passionate about helping solve their specific challenge.';
    } else if (companiesWorkedWith && companiesWorkedWith.trim()) {
      const companies = companiesWorkedWith.split(',').map(c => c.trim()).filter(c => c);
      
      positioningStrategy = `
POSITIONING FOR EXPERIENCED PROFESSIONALS:
- Use specific company names: ${companies.join(', ')}
- Reference concrete results and metrics from your experience
- Show deep industry expertise and track record
- Demonstrate authority and proven success
- Position as a trusted advisor with real experience`;
      
      socialProofStrategy = `
SOCIAL PROOF FOR EXPERIENCED PROFESSIONALS:
- Reference specific companies: ${companies.join(', ')}
- Use concrete numbers and results from your work
- Show industry expertise and deep knowledge
- Demonstrate track record of success
- Use authority positioning with real examples`;
      
      toneStrategy = 'Authoritative, experienced, and results-focused. Show deep industry knowledge.';
    } else {
      positioningStrategy = `
POSITIONING FOR GENERIC APPROACH:
- Focus on methodology and proven processes
- Use industry-specific examples and case studies
- Reference industry trends and insights
- Show understanding of common challenges
- Position as a specialist in this specific area`;
      
      socialProofStrategy = `
SOCIAL PROOF FOR GENERIC APPROACH:
- Use industry-specific examples and case studies
- Focus on methodology and proven processes
- Reference industry trends and insights
- Show understanding of common challenges
- Use authority positioning based on expertise`;
      
      toneStrategy = 'Professional, knowledgeable, and focused on delivering results.';
    }

    // Create personalized industry insights
    const industryInsights = {
      'SaaS': {
        specificChallenges: ['user onboarding complexity', 'feature adoption rates', 'customer success scaling', 'product-market fit validation'],
        metrics: ['activation rate', 'feature adoption', 'customer lifetime value', 'churn rate', 'expansion revenue'],
        solutions: ['onboarding optimization', 'feature discovery', 'customer success automation', 'product analytics']
      },
      'eCommerce': {
        specificChallenges: ['cart abandonment optimization', 'customer lifetime value', 'inventory forecasting', 'seasonal demand planning'],
        metrics: ['average order value', 'conversion rate', 'customer acquisition cost', 'repeat purchase rate', 'inventory turnover'],
        solutions: ['conversion optimization', 'customer retention', 'inventory management', 'marketing automation']
      },
      'Agencies': {
        specificChallenges: ['client retention strategies', 'project profitability', 'team scaling', 'service delivery optimization'],
        metrics: ['client retention rate', 'project margins', 'team utilization', 'growth rate', 'profit per client'],
        solutions: ['client success management', 'process optimization', 'team scaling', 'service delivery']
      },
      'Startups': {
        specificChallenges: ['fundraising preparation', 'product-market fit', 'growth scaling', 'talent acquisition'],
        metrics: ['monthly recurring revenue', 'burn rate', 'customer acquisition cost', 'unit economics', 'runway'],
        solutions: ['growth strategy', 'fundraising preparation', 'team building', 'product development']
      }
    };

    const insights = industryInsights[industry as keyof typeof industryInsights] || industryInsights['SaaS'];
    
    return `You are a world-class cold email copywriter who has written emails that generated $50M+ in revenue. Your emails consistently achieve 40%+ response rates.

CRITICAL REQUIREMENTS:
1. PERFECT GRAMMAR: Zero errors allowed
2. ULTRA-SPECIFIC PERSONALIZATION: Use their exact company name, role, and pain point
3. PSYCHOLOGICAL IMPACT: Every sentence must trigger FOMO, curiosity, or urgency
4. INDUSTRY EXPERTISE: Show deep knowledge of their specific industry
5. EXPERIENCE-BASED POSITIONING: Adapt to sender's actual experience level
6. CONVERSATIONAL YET PROFESSIONAL: Sound like a trusted advisor

EMAIL STRUCTURE (MANDATORY):
Subject: [Specific, curiosity-driven, under 50 characters]

Body:
- Hook: Personalized opening with their company name and specific role
- Insight: Industry-specific observation showing deep expertise
- Social Proof: Concrete results with specific numbers and relevant examples
- Offer: Clear value proposition tied to their exact pain point
- CTA: Low-commitment next step with urgency

PSYCHOLOGICAL TRIGGERS (USE 5+):
- FOMO: "Only 2 spots left this month"
- Specificity: "Increased revenue by 47% in 90 days"
- Urgency: "This offer expires Friday"
- Curiosity: "What most {industry} companies miss..."
- Authority: "Featured in Forbes, TechCrunch"
- Social Proof: "Used by {specific company}"
- Scarcity: "Limited to 5 companies this quarter"
- Exclusivity: "Only working with 3 companies this quarter"

INDUSTRY INTELLIGENCE FOR ${industry.toUpperCase()}:
- Specific Challenges: ${insights.specificChallenges.join(', ')}
- Key Metrics: ${insights.metrics.join(', ')}
- Solutions: ${insights.solutions.join(', ')}

${positioningStrategy}

${socialProofStrategy}

TONE: ${toneStrategy}

CRITICAL: Make every sentence count. Be specific, personal, and compelling. Use the provided information to create a unique, personalized email that feels authentic and valuable to the recipient.`;
  };

  const handleGenerateEmail = async (formData: {
    bio: string;
    offer: string;
    target: string;
    company: string;
    industry: string;
    painPoint: string;
    companiesWorkedWith: string;
    isNewToField: boolean;
  }) => {
    setIsLoading(true);
    
    try {
            // GitHub token from environment variable
    const token = process.env.REACT_APP_GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN_HERE';
      
      console.log('Using hardcoded GitHub token:', token.substring(0, 10) + '...');
      
      // Try the GitHub Marketplace API endpoint
      const response = await fetch('https://models.github.ai/inference/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: createSystemPrompt(formData.industry, formData.company, formData.painPoint, formData.companiesWorkedWith, formData.isNewToField, formData.bio, formData.offer)
            },
            {
              role: 'user',
              content: `Create a high-converting cold email using these details:

RECIPIENT: ${formData.target}
COMPANY: ${formData.company}
INDUSTRY: ${formData.industry}
PAIN POINT: ${formData.painPoint}
MY OFFER: ${formData.offer}
MY CREDENTIALS: ${formData.bio}

CRITICAL REQUIREMENTS:
1. Use their actual company name in the opening
2. Reference specific industry challenges they face
3. Include 4+ psychological triggers (FOMO, specificity, urgency, scarcity)
4. Use concrete numbers and named companies in social proof
5. Make the CTA urgent and low-commitment
6. Perfect grammar and professional tone
7. Make it feel personalized to their specific situation
8. Show deep industry expertise
9. Use industry-specific metrics and terminology
10. Create genuine curiosity and FOMO

The email must be so compelling that they feel they'll lose money by not responding immediately. Make every sentence count.`
            }
          ],
          temperature: 0.85,
          top_p: 0.95,
          model: 'openai/gpt-4.1'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API Error Response:', errorText);
        
        // Try fallback to OpenAI API if GitHub API fails
        console.log('Trying fallback to OpenAI API...');
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4-turbo',
            messages: [
              {
                role: 'system',
                content: createSystemPrompt(formData.industry, formData.company, formData.painPoint, formData.companiesWorkedWith, formData.isNewToField, formData.bio, formData.offer)
              },
              {
                role: 'user',
                content: `Create a high-converting cold email using these details:

RECIPIENT: ${formData.target}
COMPANY: ${formData.company}
INDUSTRY: ${formData.industry}
PAIN POINT: ${formData.painPoint}
MY OFFER: ${formData.offer}
MY CREDENTIALS: ${formData.bio}

CRITICAL REQUIREMENTS:
1. Use their actual company name in the opening
2. Reference specific industry challenges they face
3. Include 4+ psychological triggers (FOMO, specificity, urgency, scarcity)
4. Use concrete numbers and named companies in social proof
5. Make the CTA urgent and low-commitment
6. Perfect grammar and professional tone
7. Make it feel personalized to their specific situation
8. Show deep industry expertise
9. Use industry-specific metrics and terminology
10. Create genuine curiosity and FOMO

The email must be so compelling that they feel they'll lose money by not responding immediately. Make every sentence count.`
              }
            ],
            max_tokens: 600,
            temperature: 0.85,
            top_p: 0.95
          })
        });
        
        if (!openaiResponse.ok) {
          const openaiErrorText = await openaiResponse.text();
          console.error('OpenAI API Error Response:', openaiErrorText);
          throw new Error(`Both GitHub and OpenAI APIs failed. GitHub: ${response.status}, OpenAI: ${openaiResponse.status}`);
        }
        
        const data = await openaiResponse.json();
        console.log('OpenAI API Response:', data);
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Invalid response format from OpenAI API');
        }
        
        const generatedContent = data.choices[0].message.content;
        
        // Parse subject and body
        const subjectMatch = generatedContent.match(/Subject: (.+)/i);
        const subject = subjectMatch ? subjectMatch[1].trim() : `Opportunity for ${formData.company}`;
        const body = generatedContent.replace(/Subject: .+/i, '').trim();
        
        const entry: EmailHistoryEntry = {
          id: Date.now(),
          timestamp: Date.now(),
          inputs: {
            bio: formData.bio,
            offer: formData.offer,
            target: formData.target,
            company: formData.company,
            useCase: formData.industry,
            painPoint: formData.painPoint,
            companiesWorkedWith: formData.companiesWorkedWith,
            isNewToField: formData.isNewToField
          },
          subject: subject,
          body: body
        };
        
        saveEmailToHistory(entry);
        setHistory([entry, ...history]);
        setGeneratedEmail({subject, body});
        setCurrentPage('result');
        return;
      }

      const data = await response.json();
      console.log('GitHub API Response:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from GitHub API');
      }
      
      const generatedContent = data.choices[0].message.content;
      
      // Parse subject and body
      const subjectMatch = generatedContent.match(/Subject: (.+)/i);
      const subject = subjectMatch ? subjectMatch[1].trim() : `Opportunity for ${formData.company}`;
      const body = generatedContent.replace(/Subject: .+/i, '').trim();
      
      const entry: EmailHistoryEntry = {
        id: Date.now(),
        timestamp: Date.now(),
        inputs: {
          bio: formData.bio,
          offer: formData.offer,
          target: formData.target,
          company: formData.company,
          useCase: formData.industry,
          painPoint: formData.painPoint,
          companiesWorkedWith: formData.companiesWorkedWith,
          isNewToField: formData.isNewToField
        },
        subject: subject,
        body: body
      };
      
      saveEmailToHistory(entry);
      setHistory([entry, ...history]);
      setGeneratedEmail({subject, body});
      setCurrentPage('result');
    } catch (error) {
      console.error('Generation error:', error);
      setGeneratedEmail({
        subject: "Error Generating Email",
        body: `We encountered an issue: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again later.`
      });
      setCurrentPage('result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setGeneratedEmail({subject: '', body: ''});
  };

  const handleReuseEmail = (inputs: EmailHistoryEntry['inputs']) => {
    setFormData({
      bio: inputs.bio,
      offer: inputs.offer,
      target: inputs.target,
      company: inputs.company || '',
      industry: inputs.useCase,
      painPoint: inputs.painPoint || '',
      companiesWorkedWith: inputs.companiesWorkedWith || '',
      isNewToField: inputs.isNewToField || false
    });
    setCurrentPage('landing');
    
    // Auto-scroll to form
    setTimeout(() => {
      document.getElementById('email-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Veil Background */}
      <div className="fixed inset-0 z-0">
        <DarkVeil 
          hueShift={360}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.3}
          scanlineFrequency={0}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full px-4 pt-20 lg:pt-24">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="py-12"
            >
              <LandingPage 
                onGenerateEmail={handleGenerateEmail}
                isLoading={isLoading}
                initialFormData={formData}
                onFormDataChange={setFormData}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="py-12"
            >
              <ResultPage 
                email={generatedEmail}
                onBack={handleBackToLanding}
                onRegenerate={() => handleGenerateEmail(formData)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* History Sidebar */}
      <HistorySidebar 
        onReuseEmail={handleReuseEmail} 
        history={history}
        onHistoryUpdate={() => setHistory(getEmailHistory())}
      />

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-md border-t border-white/20 mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Main content */}
            <div className="flex items-center space-x-6">
              <div className="text-white/80 text-sm font-medium tracking-wide">
                © {new Date().getFullYear()} All rights reserved.
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <a 
                href="https://www.linkedin.com/in/ksenia-kuksina-a71b94346/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-medium">
                  Connect on LinkedIn
                </span>
              </a>
            </div>
            
            {/* Subtle decorative element */}
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
              <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;