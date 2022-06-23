var DataTypes = require("sequelize").DataTypes;
var _pokemons = require("./pokemons");
var _users = require("./users");

function initModels(sequelize) {
  var pokemons = _pokemons(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  pokemons.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(pokemons, { as: "pokemons", foreignKey: "user_id"});

  return {
    pokemons,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
