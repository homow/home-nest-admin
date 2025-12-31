import type {MainComponentProps} from "@/types/ui";
import AccountAvatar from '../../../common/AccounAvatar';
import {cn} from "@/lib/utils/ui-utils/ui-utils";

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
            <div
                className={
                    "*:overflow-hidden *:max-w-30 *:whitespace-nowrap *:text-ellipsis"
                }
            >
                <p>
                    john
                </p>
                <p
                    className={"text-secondary-txt text-sm"}
                >
                    admin
                </p>
            </div>
        </div>
    );
};