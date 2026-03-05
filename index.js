const login = require("fca-unofficial");
const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// সার্ভার সচল রাখার জন্য (Render & UptimeRobot এর জন্য)
app.get("/", (req, res) => res.send("Bot is Active and Ready!"));
app.listen(port, () => console.log(`Server running on port ${port}`));

// AppState রিড করা
const config = {
    appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))
};

login({appState: config.appState}, (err, api) => {
    if(err) return console.error("Login Error:", err);

    api.setOptions({listenEvents: true, selfListen: false});

    api.listenMqtt((err, message) => {
        if(err) return console.error("Listen Error:", err);
        if(!message.body) return;

        const msg = message.body.toLowerCase().trim();
        const threadID = message.threadID;

        // --- আপনার সব টেক্সট কন্ডিশন ---
        if (msg === "hi" || msg === "hello" || msg === "হাই" || msg === "হ্যালো") {
            api.sendMessage("Hi Hello না করে কাজের কথা বলো আমার বস রেগে যাবে (Hridoy Chowdhury) My Boss 🇧🇩🙂", threadID);
        } 
        else if (msg === "oi" || msg === "ওই") {
            api.sendMessage("হুম বেবি বলো 🥰", threadID);
        }
        else if (msg.includes("তোর বস কে")) {
            api.sendMessage("আমার বস Hridoy Chowdhury \nFacebook id: https://www.facebook.com/profile.php?id=61586460261426", threadID);
        }
        else if (msg.includes("আমি তোর বস")) {
            api.sendMessage("সোর হালা আমার বস Hridoy Chowdhury শুধু 🥰😍😘", threadID);
        }
        else if (msg.includes("baby") || msg.includes("বেবি")) {
            api.sendMessage("Hmm Baby Sona kolixa Ummmmmmmmaaaaaaahhhh 😆😘🤪", threadID);
        }
        else if (msg.includes("hridoy") || msg.includes("হৃদয়")) {
            api.sendMessage("ওই হালা কি বলিস বস আমার Hridoy Chowdhury 🥰", threadID);
        }
        else if (msg.includes("kemon acho") || msg.includes("কেমন আছো")) {
            api.sendMessage("Hmm Valo Achi Baby Tmi kemon acho", threadID);
        }
        else if (msg.includes("ki koro") || msg.includes("কি করো")) {
            api.sendMessage("তোমার কথা ভাবছি 🫣 তুমি কি করো", threadID);
        }
        else if (msg.includes("jan") || msg.includes("জান")) {
            api.sendMessage("হুম জান ☺️", threadID);
        }
        else if (msg.includes("ও গো শুনছো")) {
            api.sendMessage("হুম জান শুনছি বলো 😀", threadID);
        }
        else if (msg.includes("কলিজা")) {
            api.sendMessage("হুম কলিজা", threadID);
        }
        else if (msg === "hridoy chowdhury") {
            api.sendMessage("I'm From Bangladesh Cyber Hridoy and software engineer", threadID);
        }

        // --- আপনার সব ইমোজি কন্ডিশন ---
        const emojiReply = {
            "😀": "কিরে হাসিস না দাঁত থাকবে না 😀",
            "☺️": "ওলে ওলে বাবু টাহ ☺️",
            "🫣": "তোর বিয়ে হবে না 🫣",
            "🥰": "হুম থাম হয়ছে",
            "🤪": "আসল জাউরা তুই তো",
            "😘": "দে লালা চিনি ছাড়া",
            "😍": "😍",
            "🇧🇩": "আমাদের সোনার বাংলা দেশ ২ বার সাধীন হয়ছে ( Hridoy Chowdhury )",
            "🇮🇳": "সালা চোরের দেশে",
            "🐸": "কিরে হালা তুই ভালো হইবি না",
            "🖤": "🖤🖤",
            "🧡": "🧡",
            "👊": "তোর মাথায় মারব কিন্তু",
            "🥺": "কান্না করে নাহ",
            "🥵": "বেয়েদপ"
        };

        if (emojiReply[message.body]) {
            api.sendMessage(emojiReply[message.body], threadID);
        }
    });
});
