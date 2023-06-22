import asynHandler from "express-async-handler"

// Your code here
import bcrypt from 'bcryptjs'
import Users from '../Models/user.js'

import { generatorOTP ,mailTransport,generateToken } from './utils/mail.js'
import  verficationToken from '../Models/token.js'


import nodemailer from 'nodemailer';
import path from 'path';
import { isValidObjectId  } from "mongoose"
import validator from "email-validator"
import fs from 'fs'
import handlebars from 'handlebars'


const registerUser = asynHandler( async ( req , res )=> {
    const {  firstname ,
      lastname , 
      password , 
      confirmPassword , 
      phone , 
      mail  ,
      status 
  
    } = req.body
  
  
    if (!firstname || !lastname ||  !validator.validate(mail) ||  !password || !confirmPassword ||  !status  || !mail || !phone ){
            res.status(400)
            throw new Error('Please add  all fields')
    }
    //verifier user exits by email
    const userExists  =  await Users.findOne({mail})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    
    //bcryptjs password cryptage
    const salt = await bcrypt.genSalt(10)
    const headPassword = await bcrypt.hash(password,salt)
  
    const otp = generatorOTP()
  
  
    //create user
  
    const user = await Users.create({
      firstname ,
      lastname , 
      password: headPassword , 
      confirmPassword , 
      phone , 
      mail  ,
      status 
        
    })
    
    const verfication = await verficationToken.create({
        owner : user._id,
        vtoken: otp
    })
    mailTransport().sendMail({
        from:"devtestmailer101@gmail.com",
        to: user.mail,
        subject: "Verfication Mail",
        html: `<h1>${otp}</h1>`
    })
  
  
    if(user){
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            mail: user.mail,
            status: user.status,
            confirmPassword: user.confirmPassword,
            password: user.password,
            
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
  
  })


const  verifyEmail = asynHandler( async (req,res) => {
   const { id , otp } = req.body
    if ( !id || !otp.trim()){
        res.status(400)
        throw new Error ("Invalid reequest")
    }
    if (!isValidObjectId(id)) {

        res.status(404)
        throw new Error (" Invalid User ")
    }
    const user = await Users.findById(id)
    if (!user) {
        res.Error(404)
        throw new Error(" User Not Found !!")
    }
    if (user.verify) {
        res.status(404)
        throw new Error(" User Already Verified !!")
    }
    const token = await verficationToken.findOne({owner: user._id})

    if (!token) {
        res.status(404)
        throw  new Error(" Invalid Token !! ")
    }
    const isMatch = await bcrypt.compareSync(otp,token.vtoken)
    if (!isMatch) {
        res.status(404)
        throw  new Error(" Invalid Token !! ") 
    }
    user.verify = true;
    await verficationToken.findByIdAndDelete(token._id)
    await user.save()
    mailTransport().sendMail({
        from:"devtestmailer101@gmail.com",
        to: user.mail,
        subject: "Account Verified ",
        html: `<h1>Account Verified</h1>`
    })
    res.json("Your Email is Verified ")

})

const logIn = asynHandler( async (req,res)=>{
        const  { mail , password } = req.body
        
        const user = await Users.findOne({ mail: mail })

        if (user &&(await bcrypt.compare(password,user.password) ) ) {
            const token = generateToken(user._id);

            res.json({
                _id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                mail: user.mail,
                status: user.status,
                confirmPassword: user.confirmPassword,
                password: user.password, 
                token: generateToken(user._id)
            })
            
        }else{
            res.status(400)
            throw new Error("Invalid Credentials")
        }
})


// const forgetPass = asynHandler(async (req,res)=>{
//     const  { mail } = req.body
// if (!mail ){
//     res.status(404).json({message:'Invalid email'})
//   }
//     const user = await Users.findOne({ mail: mail })
//     console.log(user)
//     if(!user){
//         res.status(404).json({message:"Invalid User"})
//     }
//     const otp = generatorOTP()
//     console.log(otp)
//     await verficationToken.create({
//         owner : user._id,
//         vtoken: otp
//     })
//     console.log("mail")
//     fs.readFile('backend\\utils\\content.html', {encoding: 'utf-8'}, function (err, html) {
//         if (err) {
//           console.log(err);
//         } else {
//             var template = handlebars.compile(html);
//             var replacements = {
//                 name: user.lastname+" "+user.firstname,
//                 action_url: `http://localhost:3000/reset-password?id=${user._id}&token=${otp}`,
//             };
//             var htmlToSend = template(replacements);
//     mailTransport().sendMail({
//         from:"devtestmailer101@gmail.com",
//         to: user.mail,
//         subject: "Rest Password Mail",
//         html: htmlToSend
//     })}})
const forgetPass = asynHandler(async (req, res) => {
    const { mail } = req.body;
  
    if (!mail) {
      res.status(400).json({ message: 'Invalid email' });
      return;
    }
  
    const user = await Users.findOne({ mail });
    if (!user) {
      res.status(404).json({ message: 'Invalid User' });
      return;
    }
  
    const otp = generatorOTP();
    await verficationToken.create({
      owner: user._id,
      vtoken: otp,
    });
  
    try {
        
        const html = fs.readFileSync('backend\\utils\\content.html', 'utf-8');
        const template = handlebars.compile(html);
      
        // const transporter = nodemailer.createTransport({
        //   host: 'smtp.gmail.com',
        //   port: 587,
        //   secure: false,
        //   auth: {
        //     user: 'bozyacine@gmail.com',
        //     pass: '94341067<3',
        //   },
        // });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bozyacine@gmail.com',
              pass: '94341067<3',
            },
          });
      
        const replacements = {
          name: `${user.lastname} ${user.firstname}`,
          action_url: `http://localhost:3000/reset-password?id=${user._id}&token=${otp}`,
        };
        const htmlToSend = template(replacements);
      
        transporter.sendMail({
          from: 'devtestmailer101@gmail.com',
          to: user.mail,
          subject: 'Reset Password Mail',
          html: htmlToSend,
        }, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
          } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
          }
        });
      } catch (error) {
        console.error('Error reading file or compiling template:', error);
        res.status(500).json({ message: 'Failed to send email' });
      }
      
  });
  
const reset = asynHandler(async ( req,res)=>{
    const { password } =req.body
    const user = await Users.findById(req.user._id)
    if (!user) {
        res.status(404).json({"message":"User Not Found !!"})
        throw new Error(" User Not Found !!")
    }
    const salt = await bcrypt.genSalt(10)
    const headPassword = await bcrypt.hash(password,salt)

    user.password = headPassword
    await verficationToken.deleteOne({ owner : user._id })
    await user.save()
    fs.readFile('backend/utils/content.html', {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          console.log(err);
        } else {
            var template = handlebars.compile(html);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: 'bozyacine@gmail.com',
                  pass: '94341067<3'
                }
              });
            var replacements = {
                action_url: `http://localhost:3000/login`,
            };
            var htmlToSend = template(replacements);
            mailTransport().sendMail({
                from: 'devtestmailer101@gmail.com',
                to: user.mail,
                subject: 'Password changed',
                html: htmlToSend,
              })}})
     res.json(" Password Updated ")


})

//admin
const bloque = asynHandler( async(req,res)  =>{
   const  { id } =req.body
   const user = await Users.findById(id)
   user.bloque=true
   await user.save()
   res.json("User bloqued")
})
// Give Role admin
// const makeAdmin = asynHandler( async(req,res)  =>{
//     const  { id } =req.body
//     const user = await User.findById(id)
//     user.role.name="adminRole"
//     await user.save()
//     res.json("make it admin , Done !!")
//  })
//  const makeSponsor = asynHandler( async(req,res)  =>{
//     const  { id } =req.body
//     const user = await User.findById(id)
//     user.role.name="sponsorRole"
//     await user.save()
//     res.json("make it sponsor , Done !!")
//  })
//  const makeCoach = asynHandler( async(req,res)  =>{
//     const  { id } =req.body
//     const user = await User.findById(id)
//     user.role.name="coachRole"
//     await user.save()
//     res.json("make it coach , Done !!")
//  })
 // Give Role Done
 //admin get all snponsors
 const test = asynHandler( async(req,res)  =>{
    //const  { id } =req.body
    const user = await Sponsor.find().populate('user')
    return res.json(user)
 })

const updateUser = asynHandler(async(req,res)=>{
    const { mail,  firstname , lastname ,phone ,status, password, confirmPassword} = req.body 
    const user = await Users.findById( req.params.id  )
    if (password) {
        
        const salt = await bcrypt.genSalt(10)
        const headPassword = await bcrypt.hash(password,salt)
    
        if (user) {
            user.firstname = firstname  || user.firstname
            user.lastname  = lastname || user.lastname
            user.phone = phone || user.phone
            user.status = status || user.status
            user.mail = validator(mail) || user.mail
            user.password = headPassword || user.password
            user.confirmPassword = headPassword || user.confirmPassword

        }
    }
    if (user) {
        user.firstname = firstname  || user.firstname
        user.lastname  = lastname || user.lastname
        user.phone = phone || user.phone
        user.status = status || user.status
        user.mail =validator(mail) || user.mail
        user.confirmPassword =confirmPassword || user.confirmPassword
        user.password = headPassword || user.password


    }
    const updateUser = await user.save()
        res.json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        status: user.status,
        mail: user.mail,
        password: user.password,
        confirmPassword: user.confirmPassword,

    })
        
})
const findUserById = asynHandler(async(req,res)=>{
    const { id } = req.params
    const user = await Users.findById( id ).select('-password')
    if (!user) {
        res.Error(404)
        throw new Error(" User Not Found !!")
    }
    res.json(user)

})
export function deleteOnce(req, res) {
    Users
    .findOneAndRemove({ "firstname": req.params.firstname })
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
  }

  
  export {
    registerUser,
    verifyEmail,
    logIn,
    bloque,
    reset,
    forgetPass,
    updateUser,
    findUserById,
};
