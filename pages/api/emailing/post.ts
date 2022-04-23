import type { NextApiRequest, NextApiResponse } from 'next'

import nodemailer from "nodemailer";
import Validator from 'validatorjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  // validating user input and body parameters

  /*
  const rules = {
    name: 'required',
    email: 'required|email',
    title: 'required',
    selfDescription: 'required',
    projectDescription: 'required'
  };

  const validation = 
    new Validator(rules, JSON.parse(req.body));
  */



  /// TODO:use REGEX to prevent name to have any special characters

  /// TODO: wrap all inputs in special notation to prevent code execution

  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SECRET_EMAIL,
      pass: process.env.SECRET_EMAILING_TRANSPORTER_PASSWORD
    }
  });

  const response = await transporter.sendMail({
    from: JSON.parse(req.body).email,
    to: process.env.SECRET_EMAIL,
    subject: JSON.parse(req.body).title,
    text: "hello"
  });

  res.status(200).json({sent: true, res: response});


  // if (validation.passes()) {

  // } else {
  //   res.status(403).json({sent: false});
  // }

}