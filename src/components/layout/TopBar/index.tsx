import RightTopBar from "./components/Right";
import LeftTopBar from "./components/Left";

export default function TopBar() {
    return (
        <header
            className={
                "flex items-center justify-between top-0 h-16 md:justify-end"
            }
        >
            <RightTopBar/>
            <LeftTopBar/>
        </header>
    );
};