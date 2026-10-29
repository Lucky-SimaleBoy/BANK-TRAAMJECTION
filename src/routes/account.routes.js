const express= require('express')
const accountConttroler=require("../controllers/account.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const router =express.Router()

/**
 * post - api/accounts/
 * create new account
 * Protect routes
 * 
 */

router.post("/",authMiddleware.authMiddleware)