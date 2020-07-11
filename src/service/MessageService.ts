import {AbstractService} from "./AbstractService";
import {Message} from "../entity/Message";

export class MessageService extends AbstractService<Message> {


    async save(entity: Message): Promise<void> {
        await super.save(entity);
    }

    async delete(entity: Message): Promise<void> {
        await super.delete(entity);
    }


    valid(mail: string) {
        return new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(mail);
    }
}
