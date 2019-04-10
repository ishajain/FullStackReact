export default emails => {
  const rexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => email.length > 0 && rexp.test(email) === false); //Only returns the emails which are invalid

  if (invalidEmails.length) return `These emails are invalid: ${invalidEmails}`;

  return;
};
