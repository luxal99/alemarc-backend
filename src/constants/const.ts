import {Blog} from "../blog/blog.entity";
import {Image} from "../image/image.entity";
import {Message} from "../message/message.entity";
import {Technology} from "../technology/technology.entity";
import {User} from "../user/user.entity";
import exp from "constants";

export const PORT = process.env.PORT;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const LIST_OF_ENTITIES = [
    Blog,
    Image,
    Message,
    Technology,
    User
]

export const TOKEN_HEADER_NAME="auth-token";
export const AC_DENIED_MESSAGE="Access Denied";
export const INVALID_TOKEN_MESSAGE="Invalid token";

export const BLOG_ROUTE="blog";
export const TECHNOLOGY_ROUTE="technology";
export const IMAGE_ROUTE="image";
