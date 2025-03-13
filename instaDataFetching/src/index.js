const express = require("express");
const { scrapeInstagramProfile } = require("./utils/scraper");

const app = express();
app.use(express.json());

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

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
