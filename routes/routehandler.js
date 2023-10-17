
import User from '../models/User.js'
import Info from '../models/Info.js'
import Link from '../models/Link.js'
import Click from '../models/Click.js'
// import socket from '../server.js'
import Poster from '../models/Poster.js'
import device from 'express-device'
import useragent from 'express-useragent'
import Site from '../models/Site.js'
import createToken from '../utils/createToken.js'
import Demo from '../models/Demo.js'
import Cash from '../models/Cash.js'
import bcrypt from 'bcryptjs';
import axios from 'axios';
// import geoip  from 'geoip-lite'
import {publicIp, publicIpv4} from 'public-ip';

import satelize  from 'satelize'

export const   signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ error: "User exists" })

        }
        const hashed_password = await bcrypt.hash(password, 7)
        const userCreated = await User.create({
            email,
            password:hashed_password
        })
        return res.status(200).json({ user: "success" })
    }
    catch (e) {
  return res.status(400).json({ error: e })

    }
}


export const login_post = async (req, res) => {
    const { email, password } = req.body;


    try {
        // const ip = await publicIpv4()
        // const  geo = geoip.lookup("4.246.148.116" || req.ip);
        
        // if(!geo.country == "US"){
        //     return res.status(400).json({ error: "not valid"})

        // }
        const user = await User.findOne({ email: email })

        
        if (user) {
         const match = await   bcrypt.compare(password, user.password)
            if (match) {
                const currentDate = new Date();
                const diff=currentDate -user.updated_at;
                const  difff=diff/ 1000 / 60 / 60 / 24
            if(difff >= 30){
                return res.status(400).json({ error: "Subscription Expired" })
            }
          if (user.loggedIn >= 10){
            return res.status(400).json({ error: "more than one user" })
          }
          user.loggedIn= user.loggedIn + 1;
          await user.save();
          const token = createToken(user._id)
                return res.status(200).json({ status: "success", token })
            }
            return res.status(400).json({ status: "Wrong password" })

        }
        else {
            return res.status(400).json({ status: "not found" })
        }

    } catch (e) {
        res.status(400).json({ status: "not found" })
    }

}


export const   password_update = async (req, res) => {
    const { email, oldPassword,newPassword } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ error: "User not found" })

        }
        const match = await bcrypt.compare(password, user.password)
      if(!match){
        return res.status(400).json({ error: "wrong password" })

      }
        const hashed_password = await bcrypt.hash(password, 7)
        user.password=hashed_password;
        await user.save();
        return res.status(200).json({ user: "success" })
    }
    catch (e) {
  return res.status(400).json({ error: e })

    }
}


export const   user_delete = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ error: "User exists" })

        }
        const hashed_password = await bcrypt.hash(password, 7)
        const userCreated = await User.create({
            email,
            password:hashed_password
        })
        return res.status(200).json({ user: "success" })
    }
    catch (e) {
  return res.status(400).json({ error: e })

    }
}



export const  user_logout = async (req, res) => {

    const id = req.user._id.toString();


    try {
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(400).json({ status: "User does not exist" })

        }
        if(user.loggedIn == 0){
            return res.status(400).json({ status: "User already logged out" })

        }
        user.loggedIn=user.loggedIn - 1;
        await user.save();
        return res.status(200).json({ status: "success" })
    }
    catch (e) {
  return res.status(400).json({ status: e })

    }
}

export const  validity_update =  (req, res) => {

    const { email } = req.body;
    // const currentDate = new Date();

    User.findOneAndUpdate({ email: email }, {
        $set: {
            updated_at: new Date()
        }
    }, { new: true }, (err, ok) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.status(200).json({ success: true })
    })
}

export const  login_reset =  (req, res) => {

    const { email } = req.body;
    // const currentDate = new Date();

    User.findOneAndUpdate({ email: email }, {
        $set: {
            loggedIn: 0
        }
    }, { new: true }, (err, ok) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.status(200).json({ success: true })
    })
}

