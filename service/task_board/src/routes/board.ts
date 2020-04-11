import express = require("express");
import {TaskBoard} from "../entity/TaskBoard";
import {Application, Request, Response} from "express";
import bodyParser = require("body-parser");
import  cors = require("cors");
import {TaskCard} from "../entity/TaskCard";
import {CardStatus} from "../entity/CardStatus";
import {CardAttachment} from "../entity/CardAttachment";

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        // this.app.use(this.router);
        this.routes();
    }

    protected plugins() {
        this.app.use(bodyParser.json());
    }

    protected routes() {


        this.app.get('/board/getBoard', async (req: Request, res: Response) => {
            try {
                const boards = await TaskBoard.find({relations: ['cardList','cardList.cardAttachmentList']});
                res.send(boards);
            } catch {
                res.sendStatus(500)
            }
        });

        this.app.post('/board/createBoard', async (req: Request, res: Response) => {
            console.log(req.body);
            try {

                const board = new TaskBoard();
                board.title = req.body.title;
                await TaskBoard.save(board);

                res.sendStatus(200)
            } catch {
                res.sendStatus(500);
            }
        });

        this.app.post('/board/createTask', async (req: Request, res: Response) => {
            console.log(req.body)
            try {

                const taskCard = new TaskCard();


                taskCard.header = req.body.header;
                taskCard.description = req.body.description;
                taskCard.due_date = new Date("04-11-2022");
                taskCard.id_task_board = await TaskBoard.findOne(req.body.id_task_board);
                taskCard.id_card_status = await CardStatus.findOne(req.body.id_card_status);
                await TaskCard.save(taskCard);

                for (const attachment of req.body.cardAttachmentList) {
                    const cardAttachment = new CardAttachment();
                    cardAttachment.url = attachment.url;
                    cardAttachment.id_task_card = taskCard;

                    await CardAttachment.save(cardAttachment);
                }

                res.sendStatus(200)
            } catch {
                res.sendStatus(500);
            }
        })
    }

}