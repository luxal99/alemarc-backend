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
    console.log('CONTROLLER: ', req.body.client)
    try {
        const board = await axios.post('http://localhost:8000/board/createBoard', {
            title: req.body.title,
            id_client: req.body.id_client
        });

        res.send(board.data);
    } catch {
        res.sendStatus(500)
    }
});

router.get('/board/getBoardByIdClient/:id_client', async (req, res) => {
    try {
        boardById = await axios.get(`http://localhost:8000/board/getBoardByIdClient/${req.params.id_client}`);
        res.send(boardById.data);
    } catch {
        res.sendStatus(500)
    }
})

router.get('/board/getBoard', async (req, res) => {

    try {
        const board = await axios.get('http://localhost:8000/board/getBoard');
        res.send(board.data);
    } catch {
        res.sendStatus(500)
    }
});

router.post('/board/createTask', async (req, res) => {

    try {
        taskCard = await axios.post('http://localhost:8000/board/createTask', {
            header: req.body.header,
            visible: req.body.visible,
            description: req.body.description,
            id_task_board: req.body.id_task_board,
            id_card_status: req.body.id_card_status,
            due_date: req.body.due_date,
            text: req.body.text,
            cardAttachmentList: req.body.cardAttachmentList
        });

        res.send(taskCard.data)
    } catch {
        res.sendStatus(500);
    }
});

router.get('/board/getArchivedTask/:id_task_board', async (req, res) => {
    try {
        const archivedTask = await axios.get(`http://localhost:8000/board/getArchivedTask/${req.params.id_task_board}`);
        res.send(archivedTask.data)
    } catch {
        res.sendStatus(500)
    }
})

router.put('/board/unArchiveAll', async (req, res) => {
    try {
        await axios.put("http://localhost:8000/board/unArchiveAll", {
            taskList: req.body
        })
    } catch {
        res.sendStatus(500)
    }
})

router.put('/board/updateTask', async (req, res) => {
    try {
        const task = axios.put("http://localhost:8000/board/updateTask", {
            id_task_card: req.body.id_task_card,
            header: req.body.header,
            description: req.body.description,
            due_date: req.body.due_date,
            visible: req.body.visible,
            id_card_status: req.body.id_card_status
        });

        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
});

router.post('/board/updateAttachmentList', async (req, res) => {

    try {
        const attachments = await axios.post("http://localhost:8000/board/updateAttachmentList", {
            url: req.body.url
        });

        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
});

router.post('/board/addNewAttachment', async (req, res) => {
    console.log(req.body)
    try {
        await axios.post("http://localhost:8000/board/addNewAttachment", {
            id_task_card: req.body.id_task_card,
            cardAttachmentList: req.body.cardAttachmentList
        });

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500)
    }
});


router.get('/board/getTaskList/:id_task_board', async (req, res) => {
    console.log(req.params.id_task_board)
    try {
        const taskList = await axios.get(`http://localhost:8000/board/getTasks/${req.params.id_task_board}`);
        res.send(taskList.data)
    } catch {
        res.sendStatus(500)
    }
})

router.get('/board/getTaskAnalizeAll', async (req, res) => {
    try {
        const arr = await axios.get("http://localhost:8000/board/getTaskAnalizeAll");
        res.send(arr.data)
    } catch {
        res.sendStatus(500)
    }
});

router.get('/board/getTaskPerBoard', async (req, res) => {
    try {
        const arr = await axios.get("http://localhost:8000/board/getTaskPerBoard");

        res.send(arr.data)
    } catch {
        res.sendStatus(500)
    }
});

router.post('/board/register', async (req, res) => {
    try {
        const user = await axios.post("http://localhost:8000/register", {
            fullname: req.body.fullname,
            mail: req.body.mail,
            username: req.body.username,
            password: req.body.password
        })
        res.send(user.data);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/board/login', async (req, res) => {

    console.log(req.body);
    try {
        const user = await axios.post("http://localhost:8000/checkUser", {
            username: req.body.username,
            password: req.body.password
        });

        res.send(user.data);
    } catch {
        res.send("Error")
    }
});

router.get('/board/getBoardPerUser/:id_client', async (req, res) => {
    try {
        taskList = await axios.get(`http://localhost:8000/board/getBoardPerUser/${req.params.id_client}`);
        res.send(taskList.data);
    } catch {
        res.send("Error");
    }
});

router.post('/board/getUserProfile', async (req, res) => {
    try {
        const userProfile = await axios.post(`http://localhost:8000/board/getUserProfile`, {
            secretKey: req.body.secretKey,
            id_client: req.body.id_client
        });
        res.send(userProfile.data);
    } catch {
        res.send("Error")
    }
});


router.put('/board/changePassword', async (req, res) => {
    try {
        const updatePassword = await axios.put("http://localhost:8000/board/changePassword", {
            username: req.body.username,
            old_password: req.body.old_password,
            new_password: req.body.new_password
        });

        res.send(updatePassword.data);
    } catch {
        res.send("Input error");
    }

});

router.post("/board/getUserByKey", async (req, res) => {
    try {
        const user = await axios.post("http://localhost:8000/board/getUserByKey", {
            key: req.body.key
        });

        res.send(user.data);
    } catch {
        res.sendStatus(403)
    }
});

module.exports = router;
module.exports = app;
