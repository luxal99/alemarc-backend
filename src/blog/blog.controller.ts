import {Body, Controller, HttpStatus, Inject, Post, Put, Res} from '@nestjs/common';
import {GenericController} from "../generic/generic.controller";
import {Blog} from "./blog.entity";
import {BlogService} from "./blog.service";
import {Response} from "express";
import {ImageService} from "../image/image.service";
import {Image} from "../image/image.entity";
import {BLOG_ROUTE} from "../constants/const";

@Controller(BLOG_ROUTE)
export class BlogController extends GenericController<Blog> {

    @Inject()
    private imageService: ImageService

    constructor(private readonly service: BlogService) {
        super(service);

    }

    @Post()
    async save(@Body() entity: Blog, @Res() res: Response) {

        await this.service.save(entity).then(async () => {
            for (const img of entity.listOfImages) {
                await this.imageService.save(new Image(img.url, entity))
            }
        }).then(() => {
            res.sendStatus(HttpStatus.OK)
        }).catch(() => {
            res.sendStatus(HttpStatus.BAD_GATEWAY)
        });

    }

    @Post('/popular')
    async getPopular(@Res() res: Response) {
        try {
            res.send(await this.service.mostPopular())
        } catch (e) {
            res.send(HttpStatus.BAD_GATEWAY)
        }
    }

    @Put('/view')
    async incrementView(@Body() entity: Blog, @Res() res: Response) {
        await this.service.incrementView(entity.id).then(() => {
            res.sendStatus(HttpStatus.OK)
        }).catch(() => {
            res.sendStatus(HttpStatus.BAD_GATEWAY);
        })
    }

    @Put()
    async put(@Body() entity: Blog, @Res() res: Response) {
        await this.service.update(entity.id, entity).then(async () => {
            this.service.updateTechnology(entity).then(async () => {
            }).then(async () => {

                const blog: Blog = await this.service.findOne(entity.id);

                await this.imageService.deleteAllWhereBlog(blog).then(async () => {
                    for (const img of entity.listOfImages) {
                        await this.imageService.save(new Image(img.url,blog)).catch(()=>{
                            res.sendStatus(HttpStatus.BAD_GATEWAY)
                        })
                    }

                }).then(() => {
                    res.sendStatus(HttpStatus.OK)
                });
            })

        }).catch(() => {
            res.sendStatus(HttpStatus.BAD_GATEWAY)
        })

    }
}
