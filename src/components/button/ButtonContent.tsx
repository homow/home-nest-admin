import Icon from "@/components/icon/Icon";
import type {ButtonPrimaryProps} from "@/types/ui";

export default function ButtonContent(
    {
        rightIcon,
        leftIcon,
        loading,
        children,
        textStyle
    }: ButtonPrimaryProps
) {
    return (
        <>
            {(rightIcon && !loading) && <Icon icon={rightIcon}/>}
            <span>
                {loading ? (
                    <Icon
                        icon="loadingDoted"
                        className="animate-spin [animation-duration:2s]"
                    />
                ) : (
                    <span className={textStyle}>{children}</span>
                )}
            </span>
            {(leftIcon && !loading) && <Icon icon={leftIcon}/>}
        </>
    );
};