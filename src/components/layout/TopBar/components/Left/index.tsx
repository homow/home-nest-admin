// import Notification from "./Notification/Notification";
import AccountMenu from "./components/AccountMenu";
// import ThemeSection from "./ThemeSection/ThemeSection";
// import SearchBar from "./SearchBar/SearchBar";

export default function Left() {
    return (
        <div
            className={"flex items-center justify-between gap-4 py-3 md:flex-1"}
        >
            {/* search bar */}
            {/*<SearchBar/>*/}

            <div
                className={"flex items-center justify-between gap-4 py-3"}
            >
                {/*<ThemeSection/>*/}
                {/*<Notification/>*/}
                <AccountMenu/>
            </div>
        </div>
    );
};