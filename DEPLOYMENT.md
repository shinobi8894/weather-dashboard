# Deployment Guide for Cloudflare Workers

This guide walks you through deploying the Weather Dashboard to Cloudflare Workers using the OpenNext adapter.

## Prerequisites

- Cloudflare account (free tier works)
- Wrangler CLI installed (included in project dependencies)
- API keys from weather providers

## Step-by-Step Deployment

### 1. Prepare Your Environment

First, ensure your environment variables are set up:

```bash
# Create .env.local for local development
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here
NEXT_PUBLIC_WEATHERAPI_KEY=your_key_here
NEXT_PUBLIC_DEFAULT_CITY=London
```

### 2. Build for Cloudflare

Run the OpenNext build command:

```bash
npm run pages:build
```

This command:
- Builds your Next.js app
- Transforms it for Cloudflare Workers compatibility
- Generates the `.open-next/worker` directory

**What happens during the build:**
- Static assets are optimized
- Server functions are bundled for Workers runtime
- API routes are converted to Cloudflare Workers format
- Edge runtime compatibility is ensured

### 3. Login to Cloudflare

```bash
npx wrangler login
```

This will open your browser to authenticate with Cloudflare.

### 4. Deploy to Cloudflare Pages

```bash
npm run pages:deploy
```

Or manually:

```bash
npx wrangler pages deploy .open-next/worker --project-name=weather-dashboard
```

**First deployment:**
- Wrangler will create a new Pages project
- You'll get a `*.pages.dev` URL
- The project will be visible in your Cloudflare dashboard

**Subsequent deployments:**
- Updates are deployed to the same project
- Previous deployments are kept for rollback
- Each deployment gets a unique preview URL

### 5. Configure Environment Variables

In the Cloudflare dashboard:

1. Go to **Workers & Pages** > **weather-dashboard**
2. Navigate to **Settings** > **Environment Variables**
3. Add your variables:
   - `NEXT_PUBLIC_OPENWEATHER_API_KEY`
   - `NEXT_PUBLIC_WEATHERAPI_KEY`
   - `NEXT_PUBLIC_DEFAULT_CITY` (optional)

4. Click **Save**

**Important:** Redeploy after adding environment variables:
```bash
npm run pages:deploy
```

### 6. Set Up Custom Domain (Optional)

1. In Cloudflare dashboard, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (must be on Cloudflare DNS)
4. Follow the verification steps

## Local Testing with Wrangler

Test your app locally with the Cloudflare Workers runtime:

```bash
npm run pages:dev
```

This runs your app in a local Workers environment, which is more accurate than `npm run dev` for production testing.

## Configuration Files

### wrangler.toml

```toml
name = "weather-dashboard"
compatibility_date = "2024-10-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".open-next/worker"

[env.production]
name = "weather-dashboard"

[observability]
enabled = true
```

**Key settings:**
- `compatibility_date`: Ensures consistent behavior
- `nodejs_compat`: Enables Node.js compatibility layer
- `pages_build_output_dir`: Points to OpenNext output
- `observability`: Enables logging and analytics

### open-next.config.ts

```typescript
import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
};

export default config;
```

**Settings explained:**
- `wrapper: 'cloudflare-node'`: Uses Cloudflare-specific runtime
- `converter: 'edge'`: Optimizes for edge deployment
- Cache settings: Disabled for simplicity (can be enhanced)

## Monitoring & Analytics

### View Logs

```bash
npx wrangler pages deployment tail
```

### Cloudflare Analytics

In your Cloudflare dashboard:
1. Go to **Workers & Pages** > **weather-dashboard**
2. Click **Analytics** tab

You'll see:
- Request counts
- Error rates
- Response times
- Geographic distribution

## Troubleshooting

### Build Fails

**Issue**: `Error: Cannot find module...`
**Solution**: 
```bash
rm -rf node_modules .next .open-next
npm install
npm run build
npm run pages:build
```

### Deployment Fails

**Issue**: `Error: No project found with name...`
**Solution**: Check project name in `wrangler.toml` matches your Cloudflare project.

**Issue**: `Error: Authentication required`
**Solution**: Run `npx wrangler login` again.

### API Keys Not Working

**Issue**: Weather data not loading after deployment
**Solution**: 
1. Verify environment variables are set in Cloudflare dashboard
2. Ensure keys are prefixed with `NEXT_PUBLIC_`
3. Redeploy after adding variables

### Runtime Errors

**Issue**: `Error: Dynamic Code Evaluation (e. g. 'eval', 'new Function') not allowed`
**Solution**: Ensure all code is compatible with Workers runtime. Avoid:
- `eval()`
- `new Function()`
- Dynamic imports of Node.js modules

## Performance Optimization

### Edge Caching

Cloudflare automatically caches static assets. For API routes, you can add cache headers:

```typescript
export async function GET(request: Request) {
  const data = await fetchWeather();
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=300', // 5 minutes
    },
  });
}
```

### Asset Optimization

- Images are automatically optimized
- JavaScript is minified and tree-shaken
- CSS is purged and minified

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run pages:build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: pages deploy .open-next/worker --project-name=weather-dashboard
```

## Cost Considerations

**Cloudflare Pages Free Tier:**
- 500 builds per month
- Unlimited requests
- Unlimited bandwidth
- 100k Workers requests/day

**Paid Plan ($20/month):**
- 5,000 builds per month
- Unlimited requests
- Unlimited bandwidth
- 10M Workers requests/month

**This project easily fits within free tier limits.**

## Security Best Practices

1. **Environment Variables**: Never commit API keys to Git
2. **Rate Limiting**: Implement client-side caching to reduce API calls
3. **CORS**: Configure appropriate CORS headers if needed
4. **Content Security Policy**: Add CSP headers for additional security

## Next Steps

- Set up custom domain
- Configure analytics
- Add error tracking (Sentry, LogFlare)
- Implement advanced caching strategies
- Set up staging environment

## Support

For issues specific to:
- **OpenNext**: https://github.com/opennextjs/opennextjs-cloudflare
- **Wrangler**: https://developers.cloudflare.com/workers/wrangler/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/

---

Happy deploying! 🚀
