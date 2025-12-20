import type {MainComponentProps} from "@/types/ui";
import AccountAvatar from '../../common/AccounAvatar';
import {cn} from "@/lib/utils/ui-utils";

export default function AccountInfo(
    {
        className,
    }: MainComponentProps
) {
    return (
        <div
            dir="ltr"
            className={cn(
                "px-5 flex flex-row items-start gap-4",
                className
            )}
        >
            {/* account avatar */}
            <AccountAvatar/>

            {/* account details */}
            <div>
                <p>user?.display_name</p>
                <p className={"text-secondary-txt text-sm"}>user?.role</p>
            </div>
        </div>
    );
};