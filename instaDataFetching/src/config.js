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
      "1321877788127715328-wclGl6molPEZEidHKdzUfRcxDlrHma",
    tokenSecret:
      process.env.TWITTER_TOKEN_SECRET ||
      "l2qC8jQUjYrGDyUfeCK0sgszgHax1REZXU5vnovROGVdw",
  },
};