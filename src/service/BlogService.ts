import {AbstractService} from "./AbstractService";
import {Blog} from "../entity/Blog";
import {getConnection} from "typeorm";

export class BlogService extends AbstractService<Blog> {

    async save(entity: Blog): Promise<void> {
        await super.save(entity);
    }

    async delete(entity: Blog): Promise<void> {
        await super.delete(entity);
    }

    async getAll(): Promise<Blog[]> {
        let listOfBlogs: Blog[] = await Blog.find({relations: ['listOfImages', 'listOfTechnologies']});
        return listOfBlogs.reverse();
    }

    async findById(id): Promise<Blog> {
        return await this.manager.findOne(Blog, {where: {id: id}, relations: ['listOfImages', 'listOfTechnologies']});
    }

    async incrementView(id) {
        const blog: Blog = await this.findById(id);
        let numberOfViews = blog.numberOfViews + 1;
        await getConnection().createQueryBuilder().update(Blog).set({
            numberOfViews: numberOfViews
        }).where("id = :id", {id: blog.id}).execute();
    }

    async mostPopular() {
        const blogs = await Blog.find({relations: ['listOfImages']})
        blogs.sort((a, b) => (a.numberOfViews > b.numberOfViews ? -1 : 1));

        return blogs.splice(0, 3);
    }
}
