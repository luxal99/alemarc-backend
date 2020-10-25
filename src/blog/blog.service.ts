import {Inject, Injectable} from "@nestjs/common";
import {GenericService} from "../generic/generic.service";
import {Blog} from "./blog.entity";
import {BlogRepository} from "../repository/blog.repository";
import {getConnection} from "typeorm";

@Injectable()
export class BlogService extends GenericService<Blog> {

    constructor(private readonly repository: BlogRepository) {
        super(repository, ['listOfTechnologies', 'listOfImages']);
    }

    async incrementView(id) {
        const blog: Blog = await this.findOne(id);
        let numberOfViews = blog.numberOfViews + 1;
        await getConnection().createQueryBuilder().update(Blog).set({
            numberOfViews: numberOfViews
        }).where("id = :id", {id: blog.id}).execute();
    }

    async mostPopular() {
        const blogs = await this.findAll();
        blogs.sort((a, b) => (a.numberOfViews > b.numberOfViews ? -1 : 1));

        return blogs.splice(0, 3);
    }

    async updateTechnology(entity:Blog){
        const blog:Blog = await this.findOne(entity.id);

        await getConnection().createQueryBuilder()
            .relation(Blog,'listOfTechnologies').of(blog)
            .addAndRemove(entity.listOfTechnologies,blog.listOfTechnologies);

    }

}
