 const mysql = require('mysql');
 const express = require('express');
 const bodyparser = require('body-parser');
 const cors = require('cors');
 const app = express();
 var http = require('http');
 var service = require('./service/client_service');
 const config = require('./config/config');

 service.saveClient();
 service.getLastSaved();
 service.sendMessageToAdmin();