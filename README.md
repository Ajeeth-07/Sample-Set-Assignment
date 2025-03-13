# Instagram Scraper Service with Twitter Integration

Service that retrieves the latest Instagram posts, summarizes captions using Google's Gemini, and posts to Twitter.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API keys:
   - Create a `.env` file with the following keys:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   TWITTER_CONSUMER_KEY=your-twitter-consumer-key
   TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
   TWITTER_ACCESS_TOKEN=your-twitter-access-token
   TWITTER_TOKEN_SECRET=your-twitter-token-secret
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Instagram Endpoints

#### Get latest post from BBC News
```
GET /instagram/bbcnews
```

#### Get latest post from any Instagram account
```
GET /instagram/:username
```

### Summarization and Twitter Endpoints

#### Summarize text to tweet format
```
POST /summarize
```
Request body:
```json
{
  "text": "Long Instagram caption to summarize..."
}
```

#### Post a tweet
```
POST /post-tweet
```
Request body:
```json
{
  "text": "Tweet content",
  "imageUrl": "https://optional-image-url.com/image.jpg"
}
```

#### Fetch Instagram post, summarize and tweet in one step
```
POST /fetch-and-tweet/:username
```
Automatically fetches the latest Instagram post from the specified user, summarizes the caption, and posts it to Twitter.

## Response Formats

### Instagram Response

```json
{
  "success": true,
  "data": {
    "username": "bbcnews",
    "postUrl": "https://www.instagram.com/p/...",
    "imageUrl": "https://instagram.com/...",
    "caption": "Post caption text",
    "timestamp": "2025-03-13T12:34:56.789Z"
  }
}
```

### Summarization Response

```json
{
  "success": true,
  "originalLength": 500,
  "summaryLength": 240,
  "summary": "Summarized text ready for Twitter..."
}
```

### Twitter Post Response

```json
{
  "success": true,
  "tweet": {
    "data": {
      "id": "1234567890",
      "text": "Posted tweet content"
    }
  }
}
```

## Important Notes

- This service uses web scraping which may break if Instagram changes their page structure
- Twitter API requires valid OAuth credentials and a developer account
- Gemini API requires a valid API key from Google AI Studio


## Implementation Notes

1. **API Keys**: You'll need to:
   - Get a Gemini API key from Google AI Studio
   - Set up a Twitter Developer account and create an app to get OAuth credentials

2. **Installation**: Run `npm install` to install all the dependencies

3. **Run the Service**: Use `npm start` to run the service

4. **Environment Variables**: Create a `.env` file with your API keys for security

This implementation provides a complete workflow from fetching Instagram posts to summarizing with Gemini and posting to Twitter, with appropriate error handling and documentation.
