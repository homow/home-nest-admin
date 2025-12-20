import type {SideBarDataTypes} from "@/types/ui";
import SideBarLinks from "./SideBarLinks";

export default function SideBarMenu() {
    const dataMenu: SideBarDataTypes[] = [
        {
            title: "داشبورد",
            dataLinks: [
                {text: "داشبورد", url: "/", icon: "dashboard"},
                {text: "ملک‌ها", url: "/properties", icon: "house"},
            ]
        },
        {
            title: "پنل و صفحات",
            dataLinks: [
                {text: "کاربران", url: "/user", icon: "user"},
                {text: "نقش ها", url: "/rules", icon: "lock"},
            ]
        }
    ];

    return (
        <div className={"space-y-5 pb-2"}>
            {dataMenu.length > 0 && dataMenu.map(d => (
                <SideBarLinks key={d.title} data={d}/>
            ))}
        </div>
    );
};