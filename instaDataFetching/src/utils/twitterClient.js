const axios = require("axios");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

class TwitterClient {
  constructor(config) {
    this.config = config;
    this.baseUrl = "https://api.twitter.com/2/tweets";
    this.testMode = true; // Set to true for testing without API calls

    // Initialize OAuth 1.0a
    this.oauth = OAuth({
      consumer: {
        key: config.consumerKey,
        secret: config.consumerSecret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(baseString, key) {
        return crypto
          .createHmac("sha1", key)
          .update(baseString)
          .digest("base64");
      },
    });
  }

  async postTweet(text, imageUrl = null) {
    try {
      if (this.testMode) {
        console.log("TEST MODE: Would post tweet:", text);
        return {
          data: {
            id: "123456789",
            text: text,
          },
        };
      }

      const data = { text };

      // Request data for OAuth signature
      const requestData = {
        url: this.baseUrl,
        method: "POST",
      };

      // Generate authorization header
      const authHeader = this.oauth.toHeader(
        this.oauth.authorize(requestData, {
          key: this.config.accessToken,
          secret: this.config.tokenSecret,
        })
      );

      const response = await axios({
        url: this.baseUrl,
        method: "POST",
        headers: {
          ...authHeader,
          "Content-Type": "application/json",
        },
        data,
      });

      return response.data;
    } catch (error) {
      console.error(
        "Twitter API error:",
        error.response?.data || error.message
      );
      throw new Error(`Failed to post tweet: ${error.message}`);
    }
  }
}

module.exports = TwitterClient;
