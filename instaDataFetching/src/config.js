require("dotenv").config();

module.exports = {
  gemini: {
    apiKey:
      process.env.GEMINI_API_KEY || "AIzaSyBab1PSStABWO9rxlf7Pd50Kbib-3CQYOM",
  },

  twitter: {
    consumerKey:
      process.env.TWITTER_CONSUMER_KEY || "q4BLAbE2p11ubjpt03rY4ZVNf",
    consumerSecret:
      process.env.TWITTER_CONSUMER_SECRET ||
      "hRIqJzAfR8m5Rp1BbBRdYFfSkfEXqWPhWUX5Mde3QV9tP61yln",
    accessToken:
      process.env.TWITTER_ACCESS_TOKEN ||
      "1321877788127715328-0sk7aZbvXgbVlWq8u4N2krJDjgR9Ab",
    tokenSecret:
      process.env.TWITTER_TOKEN_SECRET ||
      "YAjAnaHm9TBu3dNa82BXJlA77x12jH6SXomVGv1wUP0pm",

    clientId:
      process.env.TWITTER_CLIENT_ID || "Y3hKZEFYdTBHcGR5bHZjd0tqbTc6MTpjaQ",
    clientSecret:
      process.env.TWITTER_CLIENT_SECRET ||
      "ztV88abfIt9Vuu610Bh8VDMv_8_400IquKvD9mlz5BQ7akK7Up",
  },
};

// Y3hKZEFYdTBHcGR5bHZjd0tqbTc6MTpjaQ;
// ztV88abfIt9Vuu610Bh8VDMv_8_400IquKvD9mlz5BQ7akK7Up;
// ztV88abfIt9Vuu610Bh8VDMv_8_400IquKvD9mlz5BQ7akK7Up;