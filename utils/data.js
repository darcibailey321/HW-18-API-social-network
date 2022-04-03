const name = ["Bailey", "Smith", "Jones"];
const thought = ["Thought 1.", "Thought 2.", "Thought 3."];
const emailAddress = ["dbailey@gmail.com", "darcibailey@gmail.com", "db@gmail.com"];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomName = () => `${getRandomArrItem(name)}`;
const getRandomThought = () => `${getRandomArrItem(thought)}`;
const getRandomEmail = (name) => `${name}${Math.floor(Math.random() * 9999)}${getRandomArrItem(emailAddress)}`

module.exports = {getRandomName, getRandomArrItem, getRandomEmail, getRandomThought};
