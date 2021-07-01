const Redis = require('../service/RedisService');

module.exports.setUsers = async (req, res) => {
  const { name } = req.query;
  try {
    const user = await Redis.get(name);
    console.log('Fetching user details with name', name);
    if (user.value) {
      return res.status(200).send(JSON.parse(user.value));
    } 
    const payload = {
      userName: name,
      savedGames: { remainingCards: 0, defusingCards: 0 },
      wonGames: 0,
      lostGames: 0,
      gamesPlayed: 0
    };

    console.log('Data successfully found');
    await Redis.set(name, JSON.stringify(payload));
    return res.status(200).send(payload);
  } catch (err) {
    console.log('Something went wrong while getting data for user', name);
    return res.status(500).send();
  }
};

module.exports.setUserData = async (req, res) => {
  const {
    userName,
  } = req.body;

  try {
    if (!req.body) {
      console.log('No data to update');
      return res.status(400).send('No data');
    };

    console.log('Updating data for user', userName);
    await Redis.set(userName, JSON.stringify(req.body));
    return res.status(200).send();
  } catch (err) {
    console.log(`Something went wrong while updating data for user: ${userName}. ERROR:${err}`);
    return res.status(500).send();
  }
};

module.exports.getAllUserData = async (req, res) => {
  try {
    console.log('Fetching all user data');
    const data = await Redis.getAll();
    const result = [];
    await Promise.all(data.map(async(key) => {
      const { value } = await Redis.get(key);
      const data = JSON.parse(value);
      result.push({
        userName: data.userName,
        wonGames: data.wonGames,
        lostGames: data.lostGames,
        gamesPlayed: data.gamesPlayed
      });
    }));
    result.sort((a, b) => b.wonGames - a.wonGames);

    return res.status(200).send(result);
  } catch (err) {
    console.log(`Something went wrong while fetching all user data. ERROR:${err}`);
    return res.status(500).send();
  }
};
