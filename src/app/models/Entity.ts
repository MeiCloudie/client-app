import IEntity from "./IEntity";

export default interface Entity extends IEntity {
    id: string,
    createDate: Date,
}