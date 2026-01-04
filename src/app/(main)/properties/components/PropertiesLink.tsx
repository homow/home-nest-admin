import NavLinkClient from "@/components/ui/NavLinkClient";

export default function PropertiesLink() {
    return (
        <ul
            className={
                "flex flex-row items-center divide-x divide-secondary-txt *:not-last:pl-4 *:not-first:pr-4"
            }
        >
            <li>
                <NavLinkClient
                    activeStyle={"text-violet-500 font-medium"}
                    url={"/properties"}
                >
                    ملک ها
                </NavLinkClient>
            </li>
            <li>
                <NavLinkClient
                    activeStyle={"text-violet-500 font-medium"}
                    url={"/properties/create"}
                >
                    ملک جدید
                </NavLinkClient>
            </li>
            <li>
                <NavLinkClient
                    activeStyle={"text-violet-500 font-medium"}
                    url={"/properties/edit"}
                >
                    تغییر ملک ها
                </NavLinkClient>
            </li>
        </ul>
    );
};