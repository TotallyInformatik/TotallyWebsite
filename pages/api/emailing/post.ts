import type { NextApiRequest, NextApiResponse } from 'next'

import Validator from 'validatorjs';

import sgMail from '@sendgrid/mail';
import { EmailingApiResponse, EmailingStatus } from '../../../lib/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailingApiResponse>
) {

  if (req.method != "POST") {

    res.status(400).json({
      status: 400,
      error: "invalid api method",
      userMessage: "Internal API error. Please try again later."
    });
    return;

  }

  const reqBody = JSON.parse(req.body);
  const validationPassed = validateParameters(reqBody);

  if (!validationPassed) {

    res.status(400).json({
      status: 400,
      error: "invalid request parameters",
      userMessage: "Form input invalid."
    });
    return;

  }

  const emailingStatus = await sendEmailWithSendGrid();
  const statusCode = emailingStatus.sent ? 200 : 400;
  res.status(statusCode).json({
    status: statusCode,
    message: emailingStatus.resultMessage,
    userMessage: emailingStatus.sent ? "Request sent." : "Request failed. Please try again later."
  });

}

function validateParameters(reqBody: any): boolean {

  const rules = {
    name: 'required',
    email: 'required|email',
    title: 'required',
    selfDescription: 'required',
    projectDescription: 'required'
  };

  const validation = new Validator(reqBody, rules);
  return validation.passes()!;

}


async function sendEmailWithSendGrid(): Promise<EmailingStatus> {

  let status: EmailingStatus = {
    sent: false,
    resultMessage: ""
  };

  sgMail.setApiKey(process.env.SECRET_SEND_GRID_API_KEY!);
  const msg = {
    to: process.env.SECRET_EMAIL!,
    from: process.env.SECRET_EMAILING_TRANSPORTER_EMAIL!,
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  await sgMail
    .send(msg)
    .then(() => {
      status.sent = true;
      status.resultMessage = "Email sent!";
    })
    .catch((error) => {
      status.resultMessage = error;
    });

  return status;

}