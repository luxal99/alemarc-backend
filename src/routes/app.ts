import express = require("express");
import {Application, Request, Response} from "express";
    import bodyParser = require("body-parser");
    import bcrypt = require("bcrypt");
import {UserService} from "../service/UserService";
import {User} from "../entity/User";
import {TechnologyService} from "../service/TechnologyService";
import {Technology} from "../entity/Technology";
import {ImageService} from "../service/ImageService";
import {Image} from "../entity/Image";
import {Blog} from "../entity/Blog";
import {BlogService} from "../service/BlogService";
import {getConnection} from "typeorm";
import {MessageService} from "../service/MessageService";
import {Message} from "../entity/Message";

export class App {
    public app: Application;

    private userRouteName: string
    private blogRouteName: string
    private messageRouteName: string
    private imageRouteName: string
    private technologyRouteName: string;

    constructor(userRouteName: string, blogRouteName: string, messageRouteName: string, imageRouteName: string, technologyRouteName: string) {
        this.userRouteName = userRouteName;
        this.blogRouteName = blogRouteName;
        this.messageRouteName = messageRouteName;
        this.imageRouteName = imageRouteName;
        this.technologyRouteName = technologyRouteName;

        this.app = express();
        this.plugins();
        this.userRoute();
        this.technologyRoute();
        this.blogRoute();
        this.messageRoute()
    }

    protected plugins() {
        this.app.use(bodyParser.json());
    }


    protected userRoute() {

        this.app.get(`/${this.userRouteName}`, async (req: Request, res: Response) => {
            try {
                res.send(await User.find())
            } catch {
                res.sendStatus(500);
            }
        });

        this.app.post(`/${this.userRouteName}`, async (req: Request, res: Response) => {

            try {
                const userService = new UserService().save(new User(req.body.username, await bcrypt.hash(req.body.password, 10)));
                res.sendStatus(200);
            } catch {
                res.sendStatus(500);
            }
        })

        this.app.post(`/${this.userRouteName}/auth`, async (req: Request, res: Response) => {

            try {

                const user = await new UserService().findByName(req.body.username);
     		const auth = ((user != null && await bcrypt.compare(req.body.password, user.password))
                    ? res.send(user.password) : res.sendStatus(403))

            } catch {
                res.sendStatus(500);
            }
        })


    }

    protected blogRoute() {

        this.app.post(`/${this.blogRouteName}`, (req: Request, res: Response) => {

            try {
                const blog = new Blog(req.body.header, req.body.shortText, req.body.longText, req.body.listOfTechnologies);

                const blogService = new BlogService().save(blog).then(() => {
                    for (const image of req.body.listOfImages) {
                        const imageService = new ImageService().save(new Image(image.url, blog)).then(() => {

                        });
                    }
                }).then(() => {
                    res.sendStatus(200);
                });
            } catch {
                res.sendStatus(500);
            }
        })

        this.app.get(`/${this.blogRouteName}`, async (req: Request, res: Response) => {
            res.send(await new BlogService().getAll())
        })

        this.app.get(`/${this.blogRouteName}/:id`, async (req: Request, res: Response) => {
            try {
                const blog = await new BlogService().findById(req.params.id);
                res.send(blog);
            } catch {
                res.sendStatus(500);
            }
        })

        this.app.put(`/${this.blogRouteName}/view`, async (req: Request, res: Response) => {
            try {
                const blogService = new BlogService();
                await blogService.incrementView(req.body.id);
                res.send(200);
            } catch {

            }
        })

        this.app.post(`/${this.blogRouteName}/:popular`, async (req: Request, res: Response) => {
            try {
                const mostPopular = await new BlogService().mostPopular();
                res.send(mostPopular);
            } catch {
                res.sendStatus(500);
            }
        })
    }

    protected technologyRoute() {
        this.app.post(`/${this.technologyRouteName}`, (req: Request, res: Response) => {
            try {
                const technologyService = new TechnologyService().save(new Technology(req.body.title));
                res.sendStatus(200);
            } catch {
                res.sendStatus(500);
            }
        })

        this.app.get(`/${this.technologyRouteName}`, async (req: Request, res: Response) => {
            try {
                const technologies = await Technology.find();
                res.send(technologies);
            } catch {
                res.sendStatus(500);
            }
        })
    }


    protected messageRoute() {
        this.app.post(`/${this.messageRouteName}`, async (req: Request, res: Response) => {
            try {

                if (!(new MessageService().valid(req.body.email))) {
                    throw Error("")
                }
                const messageService = await new MessageService().save(new Message(req.body.full_name, req.body.email, req.body.message));
                res.sendStatus(200);
            } catch {
                res.sendStatus(500);
            }
        })
    }


}
