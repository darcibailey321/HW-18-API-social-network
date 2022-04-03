const connection = require("../config/connection");
const {User, Thought} = require("../models");
const {getRandomName, getRandomEmail, getRandomArrItem, getRandomThought} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 4; i++) {
    const name = getRandomName();
    const username = `${name}${Math.floor(Math.random() * 9999)}`;
    const email = getRandomEmail(name);

    users.push({
      email,
      username,
    });
  }

  await User.collection.insertMany(users);

  const userData = await User.find();
  const userArr = userData.map(({_id, username}) => ({id:_id.valueOf(), username}));

  for (let i = 0; i < 4; i++) {
    let newUserId = getRandomArrItem(userArr).id;
    let newFriendId = getRandomArrItem(userArr).id;
    if (newUserId !== newFriendId) {
      await User.findOneAndUpdate({ _id: newUserId }, { $addToSet: { friends: newFriendId } }, { runValidators: true, new: true });
    }
  }

  for (let i = 0; i < 10; i++) {
    const thoughtUser = getRandomArrItem(userData);

    await Thought.create({
      thoughtText: getRandomThought(),
      username: thoughtUser.username,
    });
  }
  
  const thoughtData = await Thought.find();
  const userThoughtArr = thoughtData.map(({ _id, username, thoughtText }) => ({ id: _id.valueOf(), username, thoughtText }));
  
  for (let i = 0; i < userThoughtArr.length; i++) {
    await User.findOneAndUpdate({ username: userThoughtArr[i].username }, { $addToSet: { thoughts: userThoughtArr[i].id } }, { runValidators: true, new: true });
  }

  console.table(userArr);
  console.table(userThoughtArr);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});