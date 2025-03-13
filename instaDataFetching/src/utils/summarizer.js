const {GoogleGenerativeAI} = require("@google/generative-ai");


class Summarizer{
    constructor(apiKey){
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model : "gemini-1.5-pro"
        });
    }

    async summarizeToTweet(caption){
        try{
            const prompt = `
            Summarize the following Instagram Caption into a concise tweet of maximum 280 characters.
            Maintain the core message and tone but make it more suitable for twitter.
            Add relevant hashtags if appropriate.

            Instagram caption : ${caption}
            `;

            const resilt = await this.model.generateContent(prompt);
            const response = resilt.response;
            const summary = response.text().trim();

            return summary.length > 280 ? summary.substring(0, 277) + "..." : summary;
        }catch(err){
            console.error("Summarizarion error:", err);
            throw new Error("Failed to summarize text:");
        }
    }
}

module.exports = Summarizer;