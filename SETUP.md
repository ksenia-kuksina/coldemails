# 🚀 Setup Guide

## Environment Configuration

This application requires a GitHub Marketplace token to generate personalized cold emails using OpenAI GPT-4.1.

### Step 1: Get GitHub Marketplace Token

1. Go to [GitHub Marketplace](https://github.com/marketplace)
2. Search for "OpenAI GPT-4.1"
3. Subscribe to the service
4. Copy your GitHub token (it starts with `ghp_`)

### Step 2: Configure Environment Variables

1. Create a `.env` file in the root directory of the project
2. Add your GitHub token to the file:

```bash
REACT_APP_GITHUB_TOKEN=ghp-your-token-here
```

### Step 3: Model Information

The application uses:
- **Model**: `openai/gpt-4.1`
- **Endpoint**: `https://models.github.ai/inference`
- **Service**: GitHub Marketplace OpenAI GPT-4.1

### Step 4: Restart the Application

After adding the environment variables, restart your development server:

```bash
npm start
```

## Troubleshooting

### "GitHub token not found" Error

- Make sure you created a `.env` file in the root directory
- Ensure the token starts with `ghp_`
- Restart the development server after adding the environment variable

### API Rate Limits

If you encounter rate limit errors:
- Check your GitHub Marketplace subscription status
- Verify your token has the correct permissions
- Contact GitHub support if issues persist

### Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Keep your API key secure and don't share it publicly 