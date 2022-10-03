const nodemailer = require("nodemailer");
const User = require("../models/userSchema");
const Tweet = require("../models/schema");
var ejs = require('ejs');

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const URLReplacer = (str) => {
  let match = str.match(
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.\\;]*[-A-Z0-9+&@#/%=~_\\|])/gi
  );
  return match;
};

const tweetsData = [];

const getTweets = () => {
  Tweet.find({}).then((tweets) => {
    tweets.forEach(async (tweet) => {
      if (tweet.mail) {
        const opportunityLink = URLReplacer(tweet.text);
        const tweetLink = `https://twitter.com/${tweet.creatorUsername}/status/${tweet.tweetId}`;
        tweetsData.push({
          opportunityLink,
          tweetLink,
          text: tweet.text,
        });
        tweet.mail = false;
        await tweet.save();
      }
    });
  });
};

getTweets();

const sendMails = async () => {

  if(tweetsData.length==0) return;

  const data = await ejs.renderFile(__dirname + "/test.ejs", { items: tweetsData });

  User.find({}).then((users) => {
    users.forEach((user) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "New opportunity!",
        html: data,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  });
};

sendMails();
