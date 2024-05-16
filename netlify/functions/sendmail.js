// const client = require('@sendgrid/mail');
// // TODO: replace with actual api keys
// const SENDGRID_API_KEY =
//   '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';
// const SENDGRID_TO_EMAIL = 'sajanbasnet75@gmail.com';
// const SENDGRID_FROM_EMAIL = 'sajan@fetch.ly';

// exports.handler = async function (event, context, callback) {
//   const {subject, firstname, lastname, email, message} = JSON.parse(event.body);
//   client.setApiKey(SENDGRID_API_KEY);

//   const data = {
//     to: SENDGRID_TO_EMAIL,
//     from: SENDGRID_FROM_EMAIL,
//     subject: `${subject} from ${firstname} ${lastname}(${email})`,
//     html: message,
//   };

//   try {
//     await client.send(data);
//     return {
//       statusCode: 200,
//       body: JSON.stringify({msg: 'Email sent', status: 200}),
//     };
//   } catch (err) {
//     return {
//       statusCode: err.code,
//       body: JSON.stringify({msg: err.message, status: 500}),
//     };
//   }
// };
