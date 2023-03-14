export default interface SidebarItemModel {
    title : string
    icon : string,
    children: SidebarItemModel[]
    path: string | undefined
}