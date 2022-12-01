'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const customerSchema = require('./customer.schema');

// 'postgres://localhost:5432/basic-api-sever'
// 'postgres://username:password@localhost:5432/basic-api-sever'
//  Line 8  if username and password are used


const DATABASE_URL = process.env.DATABASE_URL;

//Instantiate our sequelize connect to our Database
const sequelizaDatabase = new Sequelize(DATABASE_URL);

// Create a customer model w/ our schema
const CustomerModel = customerSchema(sequelizaDatabase, DataTypes);

module.exports = {
  sequelizaDatabase,
  CustomerModel,
};
