const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
var http = require('http');
var service = require('./service/client_service');
var adminService = require('./service/admin_service');
const config = require('./config/config');

service.saveClient();
service.getLastSaved();
service.sendMessageToAdmin();
service.createOrder();
service.getPaymentOptions();
service.getWebsiteTypes();
service.getMaintenacePacket();

adminService.getAllMessages();
adminService.deleteMessage();
adminService.sendMail();
adminService.getAllOrders();
adminService.deleteOrder();