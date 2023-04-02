import Entity from "./Entity";
import Member from "./Member";

export interface Comment extends Entity {
    content : string,
    postDate: Date,
    updateDate: Date,
    owner: Member,
}

export class Comment implements Comment {
    content = ''
    postDate = new Date()
    updateDate = new Date()
    constructor(init?: CommentFormValues) {
        Object.assign(this, init)
    }
}

export class CommentFormValues {
    id?: string = ''
    content?: string = ''
    postDate: Date = new Date()
    updateDate: Date = new Date()
    constructor(comment?: Comment) {
        if (comment) {
            this.id = comment.id
            this.content = comment.content
            this.postDate = comment.postDate
            this.updateDate = comment.updateDate
        }
    }
}