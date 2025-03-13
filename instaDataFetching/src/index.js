const express = require("express");
const { scrapeInstagramProfile } = require("./utils/scraper");
const Summarizer = require("./utils/summarizer");
const TwitterClient = require("./utils/twitterClient");
const config = require("./config");

const app = express();
app.use(express.json());

// Initialize services
const summarizer = new Summarizer(config.gemini.apiKey);
const twitterClient = new TwitterClient(config.twitter);

// Basic health check route
app.get("/", (req, res) => {
  res.send("Instagram Scraper Service is running");
});

// Route to get the latest post from BBC News
app.get("/instagram/bbcnews", async (req, res) => {
  try {
    console.log("Fetching BBC News Instagram data...");
    const postData = await scrapeInstagramProfile("bbcnews");

    res.json({
      success: true,
      data: postData,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to retrieve Instagram data",
    });
  }
});

// Flexible route to get any Instagram account's latest post
app.get("/instagram/:username", async (req, res) => {
  const { username } = req.params;

  try {
    console.log(`Fetching Instagram data for: ${username}`);
    const postData = await scrapeInstagramProfile(username);

    res.json({
      success: true,
      data: postData,
    });
  } catch (error) {
    console.error(`Error fetching ${username}:`, error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      message: `Failed to retrieve Instagram data for ${username}`,
    });
  }
});

// Endpoint to summarize text to tweet
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: text",
      });
    }

    const summary = await summarizer.summarizeToTweet(text);

    res.json({
      success: true,
      originalLength: text.length,
      summaryLength: summary.length,
      summary,
    });
  } catch (error) {
    console.error("Summarization error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint to post tweet
app.post("/post-tweet", async (req, res) => {
  try {
    const { text, imageUrl } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: text",
      });
    }

    const tweetResponse = await twitterClient.postTweet(text, imageUrl);

    res.json({
      success: true,
      tweet: tweetResponse,
    });
  } catch (error) {
    console.error("Tweet posting error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Endpoint to fetch Instagram post, summarize and post to Twitter in one step
app.post("/fetch-and-tweet/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // 1. Fetch the Instagram post
    console.log(`Fetching Instagram data for: ${username}`);
    const instagramData = await scrapeInstagramProfile(username);

    if (!instagramData.caption) {
      return res.status(404).json({
        success: false,
        error: "No caption found in the Instagram post",
      });
    }

    // 2. Summarize the caption
    console.log("Summarizing caption...");
    const summary = await summarizer.summarizeToTweet(instagramData.caption);

    // 3. Post to Twitter
    console.log("Posting to Twitter...");
    const tweetResponse = await twitterClient.postTweet(
      summary,
      instagramData.imageUrl // Optional: pass image URL if you implement media handling
    );

    res.json({
      success: true,
      instagramPost: instagramData,
      summary,
      tweetResponse,
    });
  } catch (error) {
    console.error(`Error in fetch-and-tweet workflow: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
