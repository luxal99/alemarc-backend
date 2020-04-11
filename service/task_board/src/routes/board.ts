import express = require("express");
import {TaskBoard} from "../entity/TaskBoard";
import bodyParser =require("body-parser");
import {Request, Response} from "express";
const app = express();
const router = express.Router();

app.use(router);
app.use(bodyParser())

router.get('/getBoard',async (req,res)=>{
    const boards = await TaskBoard.find({relations:['cardList']});
    res.send(boards);
});
router.post('/createBoard', async (req:Request,res:Response)=>{
    try{

        const board = new TaskBoard();
        board.title = req.body.title;
        await TaskBoard.save(board);

        res.sendStatus(200)
    }catch  {
        res.sendStatus(500);
    }
})
module.exports = router;
