# 🚀 Cold Email Generator - Futuristic AI Tool

A stunning, futuristic web application that generates high-converting cold emails using AI. Built with React, TailwindCSS, and 3D visual effects.

## ⚠️ Important Notice

**To use this service, which utilizes the GPT-4.1 model, please visit the GitHub Marketplace, select the GPT-4.1 integration, and follow the instructions to generate your personal token.**

## ✨ Features

- **AI-Powered Email Generation**: Generate personalized cold emails in seconds
- **Futuristic UI/UX**: Glassmorphism design with neon accents and 3D effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **3D Background**: Interactive 3D sphere using @react-three/fiber
- **Copy to Clipboard**: One-click email copying functionality
- **Pro Tips**: Built-in best practices for cold email outreach

## 🎨 Design Highlights

- **Neon Color Palette**: Electric blue (#00F0FF), purple (#D400FF), pink (#FF00E5), green (#00FF88)
- **Glassmorphism UI**: Translucent panels with backdrop blur effects
- **Floating Animations**: Subtle hover and floating effects
- **Typography**: Space Grotesk and Inter fonts for modern appeal
- **3D Visuals**: Rotating wireframe sphere background

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **TailwindCSS** with custom animations
- **Framer Motion** for smooth animations
- **@react-three/fiber** for 3D effects
- **Lucide React** for beautiful icons
- **Google Fonts** (Space Grotesk, Inter)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd idkemail
```

2. Install dependencies:
```bash
npm install
```

3. Set up your GitHub Marketplace token:
   - Get your token from GitHub Marketplace (OpenAI GPT-4.1)
   - Create a `.env` file in the root directory
   - Add your token: `REACT_APP_GITHUB_TOKEN=your_github_token_here`

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage

1. **Landing Page**: Fill in your details:
   - Who you are (your bio/background)
   - What you offer (your value proposition)
   - Who you're targeting (your ideal customer)
   - Industry/Use case selection

2. **Generate**: Click "Generate Email" to create your personalized cold email

3. **Result Page**: 
   - Copy the generated email with one click
   - Generate another email or customize the current one
   - View pro tips for better cold email results

## 🎯 Target Users

- **Startup Founders**: Generate outreach emails for partnerships and sales
- **Freelancers**: Create compelling proposals and cold outreach
- **Agency Owners**: Scale client acquisition with personalized emails
- **Indie Hackers**: Reach potential customers and users
- **Growth Hackers**: Optimize cold email campaigns

## 🔧 Configuration

### GitHub Marketplace Token Setup

The application uses GitHub Marketplace's OpenAI GPT-4.1 model to generate personalized cold emails. To use this feature:

1. **Get a GitHub Token**: Subscribe to OpenAI GPT-4.1 in [GitHub Marketplace](https://github.com/marketplace)
2. **Set Environment Variable**: Create a `.env` file in the root directory with:
   ```
   REACT_APP_GITHUB_TOKEN=your_github_token_here
   ```
3. **Restart the Server**: After adding the token, restart your development server

### Model Information

The application uses the `openai/gpt-4.1` model through GitHub's inference API at `https://models.github.ai/inference`.

### Styling Customization

Modify `tailwind.config.js` to adjust:
- Color palette
- Animation timings
- Typography settings
- Custom components

## 📦 Build for Production

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Design inspiration from futuristic UI trends
- 3D effects powered by Three.js and React Three Fiber
- Icons from Lucide React
- Animations with Framer Motion

---

**Built with ❤️ for the future of cold email outreach**
