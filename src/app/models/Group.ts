import Entity from "./Entity";
import Member from "./Member";

export default interface Group extends Entity {
    name : string,
    title: string,
    description: string,
    owner: Member,
}