import type { NextApiRequest, NextApiResponse } from 'next'

import Validator from 'validatorjs';

import sgMail from '@sendgrid/mail';
import { ContactBody, EmailingApiResponse, EmailingStatus } from '../../../lib/types';


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

  const reqBody: ContactBody = JSON.parse(req.body);
  const validationPassed = validateParameters(reqBody);

  if (!validationPassed) {

    res.status(400).json({
      status: 400,
      error: "invalid request parameters",
      userMessage: 
        "Form input invalid. Please recheck inputs. <br /> Try to limit usage of special characters due to security precautions."
    });
    return;

  }

  const emailingStatus = await sendEmailWithSendGrid(reqBody);
  const statusCode = emailingStatus.sent ? 200 : 400;
  res.status(statusCode).json({
    status: statusCode,
    message: emailingStatus.resultMessage,
    userMessage: emailingStatus.sent ? "Request sent." : "Request failed. Please try again later."
  });

}

function validateParameters(reqBody: any): boolean {

  const standardTextRule = ["required", "string"];

  const rules = {
    name: standardTextRule,
    email: 'required|email',
    title: standardTextRule,
    selfDescription: standardTextRule,
    projectDescription: standardTextRule
  };

  const validatorJsValidation = new Validator(reqBody, rules);

  return validatorJsValidation.passes()!;

}


async function sendEmailWithSendGrid(reqBody: ContactBody): Promise<EmailingStatus> {

  let status: EmailingStatus = {
    sent: false,
    resultMessage: ""
  };

  const subject = `Project Request from ${reqBody.name} - ${reqBody.title}`;
  const emailText = `
  
Name: ${reqBody.name}
Email: ${reqBody.email}
Title: ${reqBody.title}

Self-Description: 

${reqBody.selfDescription}


Request-Description:

${reqBody.projectDescription}

  `;

  sgMail.setApiKey(process.env.SECRET_SEND_GRID_API_KEY!);
  const msg = {
    to: process.env.SECRET_EMAIL!,
    from: process.env.SECRET_EMAILING_TRANSPORTER_EMAIL!,
    subject: subject,
    text: emailText
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