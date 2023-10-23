const router = require('express').Router();
const { Product, Outfit, OutfitProducts, Category, User } = require('../models');
const authCheck = require('../utils/auth');