import SidebarItem from "./SidebarItem"
import json from "../data/sidebar.json"

export default function Sidebar() {
    
    return (
        <div className="sidebar">
            {json.map((item: any, index: number) => <SidebarItem key={index} item={item} />)}
        </div>
    )
}