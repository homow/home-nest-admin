import Icon from "@/components/icon/Icon";

function OpenMobileNavMenuBtn() {
    return (
        <span
            className={"cursor-pointer md:hidden"}
        >
            <Icon
                className={"-scale-x-100"}
                icon={"bars"}
            />
        </span>
    )
}

export default function Right() {
    return (
        <div className={"md:hidden"}>
            <OpenMobileNavMenuBtn/>
        </div>
    );
};