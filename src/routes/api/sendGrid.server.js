import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(Oxygen?.env?.SENDGRID_API_TOKEN);
// temp sender(from) email: sajan@fetch.ly 
export async function api(req, res) {
  console.log("I AM HERE")
  try {
    const body = await req.json();
    await sendgrid.send({
      to: 'sajanbasnet75@gmail.com',
      from: 'sajan@fetch.ly',
      subject: `${body?.subject}`,
      html: `<p>Message:</p>
      <p>${body?.message}</p>`,
    });
  } catch (error) {
    return {status: 500, error: error.message};
  }
  return {status: 200, error: ''};
}
