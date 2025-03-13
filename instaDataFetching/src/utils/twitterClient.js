const crypto = require("crypto");
const { url } = require("inspector");
const OAuth = require("oauth-1.0a");
const axios = requir("axios");

class TwitterClient{
    constructor(config){
        this.config = config;
        this.baseUrl = 'https://api.twitter.com/2/tweets';


        this.Oauth = OAuth({
            consumer:{
                key:config.consumerKey,
                secret:config.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function(baseString, key){
                return crypto
                        .createHmac('sha1', key)
                        .update(baseString)
                        .digest('base64');
            }
        });
    }


    async postTweet(text, imageUrl = null){
        try{
            const data = {text};


            const requestData = {
                url:this.baseUrl,
                method : 'POST'
            };

            const authHeader = this.Oauth.toHeader(this.Oauth.authorize(requestData,{
                key:this.config.accessToken,
                secret:this.config.tokenSecret
            }));

            const response = await axios({
                url:this.baseUrl,
                method:'POST',
                headers:{
                    ...authHeader,
                    'Content-Type':'application/json'
                },
                data
            });

            return response.data;
        }catch(err){
            console.error("Twitter api error:", err);
            throw new Error(`Failed to post tweet: ${err.message}`);
        }

    
    }


}

module.exports = TwitterClient;