import Entity from "./Entity";
import Member from "./Member";

export default interface Comment extends Entity {
    content : string,
    postDate: Date,
    updateDate: Date,
    owner: Member,
}