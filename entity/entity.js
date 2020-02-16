 module.exports = class Mail {
     id_mail;
     id_client;
     subject;
     message;
     constructor() {

     }

 }

 module.exports = class MailToSend{
    mail;
    subject;
    toMail;
 }

 module.exports = class Client {
     id_client;
     name;
     lastname;
     mail;

     constructor() {

     }

 }