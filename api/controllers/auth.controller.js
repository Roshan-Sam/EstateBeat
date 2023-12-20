import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json("User created successfully")
    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "User not found!"))
        }
        const validPassowrd = bcryptjs.compareSync(password, validUser.password)
        if (!validPassowrd) {
            return next(errorHandler(401, "Wrong cridentials!"))
        }
        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET)
        console.log(jwt.decode(token))
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    } catch (err) {
        next(err)
    }
}

export const google = async (req, res, next) => {
    const { email, name, photo } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({ username: name.split(' ').join("").toLowerCase() + Math.random().toString(36).slice(-4), email: email, password: hashedPassword, avatar: photo })
            await newUser.save()
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
    } catch (err) {
        next(err)
    }
}

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User has been logged out')
    } catch (err) {
        next(err)
    }
}