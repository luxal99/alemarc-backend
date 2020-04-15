import express = require("express");
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");
import {TaskBoard} from "../entity/TaskBoard";
import {Application, Request, Response} from "express";
import {TaskCard} from "../entity/TaskCard";
import {CardStatus} from "../entity/CardStatus";
import {CardAttachment} from "../entity/CardAttachment";
import {getConnection, getRepository} from "typeorm";
import {Client} from "../entity/Client";
import {User} from "../entity/User";
import {UserValidation} from "../service/UserValidation";
import {where} from "sequelize";
import {UserRole} from "../entity/UserRole";
import {load} from "dotenv";

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins() {
        this.app.use(bodyParser.json());
    }

    protected routes() {
        this.userRoutes();
        this.taskBoardRoutes()
    }

    protected userRoutes() {
        //region -- Registration --

        this.app.post("/register", async (req: Request, res: Response) => {

            try {
                const checkUsername = await User.findOne({username: req.body.username});

                if (checkUsername === undefined) {

                    const user = new User();
                    user.username = req.body.username;
                    user.password = await bcrypt.hash(req.body.password, 10);
                    user.id_user_role = await getRepository(UserRole).findOne({
                        where: {role_name: 'ADMIN'}
                    });

                    UserValidation.validateUsername(user.username);
                    UserValidation.validatePassword(req.body.password);

                    await User.save(user).then(async () => {

                        const client = new Client();
                        client.fullname = req.body.fullname;
                        client.mail = req.body.mail;

                        await Client.save(client).catch(() => {
                            res.send("Not saved");
                        });
                        await getConnection().createQueryBuilder().update(User).set({
                            id_client: client
                        }).where("id_user = :id_user", {id_user: user.id_user}).execute();

                    }).catch(() => {
                        res.send("User not saved");
                    });


                    res.sendStatus(200);

                } else {

                    res.send("Korisnicko ime je zauzeto")
                }
            } catch {
                res.send("Input error")
            }

        });

        this.app.post('/checkUser', async (req: Request, res: Response) => {

            console.log(req.body)
            try {
                const user = await User.find({
                    where: {username: req.body.username},
                    relations: ['id_client', 'id_client.taskBoardList']
                });
                if (await bcrypt.compare(req.body.password, user[0].password)) {
                    res.send(user)
                } else {
                    res.send("Password error")
                }
            } catch (error) {
                error = new UserValidation("Not valid");
                res.send(error)
            }
        })

        //endregion

        this.app.get('/board/getBoardPerUser/:id_client', async (req: Request, res: Response) => {
            try {
                const taskByUser = await Client.find({
                    where: {id_client: req.params.id_client},
                    relations: ['taskBoardList', 'taskBoardList.cardList']
                });
                res.send(taskByUser);
            } catch {
                res.send("Error")
            }
        });

        this.app.get('/board/getUserProfile/:id_client', async (req: Request, res: Response) => {

            try {
                const user = await getConnection().query(`select * from task_table.client 
                join user u on client.id_client = u.idClientIdClient where id_client = ${req.params.id_client};`);


                res.send(user);
            } catch {
                res.send("Error")
            }
        });

        this.app.put('/board/changePassword', async (req: Request, res: Response) => {
            try {
                const user = await User.findOne({where: {username: req.body.username}});
                const isPasswordMatch = await bcrypt.compare(req.body.old_password, user.password);

                if (isPasswordMatch) {
                    const newHashedPassword = await bcrypt.hash(req.body.new_password, 10);
                    await getConnection().createQueryBuilder().update(User).set({
                        password: newHashedPassword
                    }).where("id_user=:id_user", {id_user: user.id_user}).execute();

                    res.send("Password changed")
                } else {
                    res.send("Password not match")
                }
            } catch {
                res.send("Input error");
            }
        })
    }

    protected taskBoardRoutes() {
        //region -- Board --
        this.app.get('/board/getBoard', async (req: Request, res: Response) => {
            try {
                const boards = await TaskBoard.find({relations: ['cardList', 'cardList.cardAttachmentList', 'cardList.id_card_status']});
                res.send(boards);
            } catch {
                res.sendStatus(500)
            }
        });

        this.app.post('/board/createBoard', async (req: Request, res: Response) => {
            try {

                const board = new TaskBoard();
                board.title = req.body.title;
                await TaskBoard.save(board);

                res.sendStatus(200)
            } catch {
                res.sendStatus(500);
            }
        });

        this.app.get('/board/getTaskPerBoard', async (req: Request, res: Response) => {
            try {
                const arr = await getConnection().query('select title, count(id_task_card) as num_of_tasks\n' +
                    'from task_card\n' +
                    '         join task_board tb on task_card.idTaskBoardIdTaskBoard = tb.id_task_board\n' +
                    'group by idTaskBoardIdTaskBoard');

                res.send(arr);
            } catch {
                res.sendStatus(500)
            }
        })
        //endregion

        //region -- Task --

        this.app.post('/board/createTask', async (req: Request, res: Response) => {

            try {

                const taskCard = new TaskCard();

                taskCard.header = req.body.header;
                taskCard.description = req.body.description;
                taskCard.due_date = req.body.due_date;
                taskCard.text = req.body.text;
                taskCard.visible = req.body.visible;

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
        });

        this.app.get('/board/getTaskAnalizeAll', async (req: Request, res: Response) => {
            const arr = await getConnection().query('select cs.title, count(id_task_card) as num_of_tasks\n' +
                'from task_card\n' +
                '         join card_status cs on task_card.idCardStatusIdCardStatus = cs.id_card_status\n' +
                '         join task_board tb on task_card.idTaskBoardIdTaskBoard = tb.id_task_board\n' +
                'group by idCardStatusIdCardStatus');

            res.send(arr);
        })

        this.app.get('/board/getTasks/:id_task_board', async (req, res) => {
            try {

                const list = await TaskCard.find({
                    where: {id_task_board: req.params.id_task_board},
                    relations: ['cardAttachmentList', 'id_card_status']
                });

                res.send(list);
            } catch {
                res.sendStatus(500)
            }
        })

        this.app.put('/board/updateTask', async (req: Request, res: Response) => {
            try {
                await getConnection().createQueryBuilder().update(TaskCard).set({
                    header: req.body.header,
                    visible: req.body.visible,
                    description: req.body.description,
                    due_date: req.body.due_date,
                    id_card_status: req.body.id_card_status
                }).where("id_task_card = :id_task_card", {id_task_card: req.body.id_task_card}).execute();

                res.sendStatus(200)
            } catch {
                res.sendStatus(500)
            }
        });

        this.app.put('/board/unArchiveAll', async (req: Request, res: Response) => {
            try {
                for (const task of req.body.taskList) {
                    await getConnection().createQueryBuilder().update(TaskCard).set({
                        visible: true
                    }).where("id_task_card = :id_task_card", {id_task_card: task.id_task_card}).execute()
                    res.sendStatus(200);
                }
            } catch {

            }
        })
        this.app.get("/board/getArchivedTask/:id_task_board", async (req: Request, res: Response) => {
            try {
                const archivedTask = await getConnection().query(`select * from task_card 
                where visible = 0 and idTaskBoardIdTaskBoard = ${req.params.id_task_board};`);
                res.send(archivedTask)
            } catch {
                res.sendStatus(500);
            }
        })

        //endregion

        //region -- CardAttachment --
        this.app.post('/board/updateAttachmentList', async (req: Request, res: Response) => {

            try {
                await CardAttachment.delete({url: req.body.url});
                res.sendStatus(200)

            } catch {
                res.sendStatus(500)
            }
        });


        this.app.post('/board/addNewAttachment', async (req: Request, res: Response) => {
            try {
                for (const element of req.body.cardAttachmentList) {
                    var cardAttachment = new CardAttachment();
                    cardAttachment.id_task_card = req.body.id_task_card;
                    cardAttachment.url = element.url;

                    await CardAttachment.save(cardAttachment);

                }

                res.sendStatus(200)
            } catch {
                res.sendStatus(500)
            }
        })
        //endregion
    }

}