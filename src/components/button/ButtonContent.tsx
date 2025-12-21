import Icon from "@/components/icon/Icon";
import type {PrimaryProps} from "@/types/ui";

export default function ButtonContent(
    {
        rightIcon,
        leftIcon,
        loading,
        text,
        textStyle
    }: PrimaryProps
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
                    <span className={textStyle}>{text}</span>
                )}
            </span>
            {(leftIcon && !loading) && <Icon icon={leftIcon}/>}
        </>
    );
};