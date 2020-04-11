const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');
const fileUpload = require('express-fileupload');


app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.json());
app.use(router);
app.use(cors());
app.use(fileUpload());

router.post('/createBoard', async (req, res) => {

    try {
        const board = await axios.post('http://localhost:8000/board/createBoard',{
            title:req.body.title
        });

        res.send(board.data);
    } catch {
        res.sendStatus(500)
    }
})


module.exports = router;
module.exports = app