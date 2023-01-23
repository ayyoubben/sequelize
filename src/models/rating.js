const { DataTypes } = require("sequelize");

const sequelize = require('../db')
 
const Rating = sequelize.define("ratings", {
    rating: {
      type: DataTypes.INTEGER,
    }
});

sequelize.sync().then(() => {
    console.log('Rating table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Rating