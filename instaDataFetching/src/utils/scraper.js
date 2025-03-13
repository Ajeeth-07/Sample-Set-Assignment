const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

/**
 * Fetches Instagram data using Puppeteer (more reliable than simple HTTP requests)
 * @param {string} username - Instagram username to scrape
 * @returns {Promise<Object>} Latest post data
 */
async function scrapeInstagramProfile(username) {
  console.log(`Starting scrape for ${username}...`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    // Set user agent to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    );

    // Navigate to the profile page
    await page.goto(`https://www.instagram.com/${username}/`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Wait for posts to load
    await page.waitForSelector("article", { timeout: 10000 });

    // Extract page content
    const pageContent = await page.content();

    // Parse the content with Cheerio
    const $ = cheerio.load(pageContent);

    // Find the first post
    const firstPost = $("article a").first();
    const postUrl = firstPost.attr("href");

    if (!postUrl) {
      throw new Error("No posts found or content structure changed");
    }

    // Navigate to the post page to get details
    await page.goto(`https://www.instagram.com${postUrl}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Extract post details
    const postContent = await page.content();
    const $post = cheerio.load(postContent);

    // Get image URL - Instagram structure changes often, so multiple selectors
    let imageUrl = "";
    const imgSelectors = ["article img[srcset]", "article img[src]"];

    for (const selector of imgSelectors) {
      const img = $post(selector).first();
      if (img.length > 0) {
        imageUrl = img.attr("src") || img.attr("srcset").split(" ")[0];
        break;
      }
    }

    // Get caption
    let caption = "";
    const captionSelectors = [
      "article h1",
      'article span:contains(",")',
      "article div.C4VMK span",
    ];

    for (const selector of captionSelectors) {
      const text = $post(selector).first().text();
      if (text && text.length > 5) {
        caption = text;
        break;
      }
    }

    return {
      username,
      postUrl: `https://www.instagram.com${postUrl}`,
      imageUrl,
      caption: caption || "No caption found",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Instagram scrape failed:", error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Fallback method using just Axios and Cheerio
 * Note: Less reliable due to Instagram's protections
 */
async function fetchWithAxios(username) {
  try {
    const response = await axios.get(`https://www.instagram.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch Instagram profile: ${error.message}`);
  }
}

module.exports = {
  scrapeInstagramProfile,
};
