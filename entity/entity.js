module.exports = class Mail {
    id_mail;
    id_client;
    subject;
    message;

    constructor() {

    }

}

module.exports = class MailToSend {
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

module.exports = class SiteOrder {
    id_site_order;
    id_client;
    id_payment_option;
    id_site_type;
    id_maintenance_packet;
    site_name;
    site_link;
    foreign_language;
    comment;
    mail_sender;
    domain;
    number_of_pages;
    contact_form;
    hosting;
    animation
    photography;

}