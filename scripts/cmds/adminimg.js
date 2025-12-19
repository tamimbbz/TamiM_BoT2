/cmd install adminimage.js const fs = require("fs-extra");
const path = require("path");
const https = require("https");

exports.config = {
  name: "adminimage",
  version: "2.1.0",
  author: "Tamu",
  countDown: 0,
  role: 0,
  shortDescription: "Reply with text + image on trigger",
  longDescription: "Trigger মেসেজে reply দিয়ে text + image পাঠাবে",
  category: "fun"
};

const cooldown = 10000; // 10 sec
const last = {};

// ========================
// ✨ EASY ADD SECTION ✨
// =======================
const TRIGGERS = [
  {
    words: ["admin" , "owner"],
    text: "meye hole jang inbox a nock dio 🫦🥺",
    images: [
      "https://i.imgur.com/1fk0ys0.jpeg"
    ]
  },
  {
    words: ["tamim" , " @Tamim Bbz"],
    text: "meye hole jang inbox a nock dio 😙🥺",
    images: [
      "https://i.imgur.com/Hb9aLdN.jpeg",
      "https://i.imgur.com/1fk0ys0.jpeg"
    ]
  }
];
// =======================

exports.onStart = async function () {};

exports.onChat = async function ({ event, api }) {
  try {
    const { threadID, senderID, messageID } = event;
    const body = (event.body || "").toLowerCase().trim();
    if (!body) return;

    // bot নিজের মেসেজ ignore
    if (senderID === api.getCurrentUserID()) return;

    // cooldown
    const now = Date.now();
    if (last[threadID] && now - last[threadID] < cooldown) return;

    let matched = null;
    for (const t of TRIGGERS) {
      if (t.words.some(w => body.includes(w))) {
        matched = t;
        break;
      }
    }
    if (!matched) return;

    last[threadID] = now;

    const imgUrl = matched.images[Math.floor(Math.random() * matched.images.length)];
    const imgName = path.basename(imgUrl);
    const imgPath = path.join(__dirname, imgName);

    if (!fs.existsSync(imgPath)) {
      await download(imgUrl, imgPath);
    }

    // 🔥 REPLY to the same message
    api.sendMessage(
      {
        body: matched.text,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      messageID // <-- এইটা থাকায় রিপ্লাই হবে
    );

  } catch (e) {
    console.log(e);
  }
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return reject();
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", () => {
      fs.unlink(dest, () => {});
      reject();
    });
  });td                     (random for yourself)
td @friend             (random for friend)
td truth @friend       (truth for friend)
td dare @friend        (dare for friend)
td mode adult          (adult mode)
td mode clean          (clean mode)
td score               (check your score)
td timer 60            (set time limit 60 seconds)
}
