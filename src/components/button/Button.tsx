import Link from "next/link";
import ButtonContent from "./ButtonContent";
import buttonStyle from "@/lib/utils/button-helper";
import type {ButtonComponentProps} from "@/types/ui";

function Button(
    {
        as = "button",
        url,
        btnStyle,
        children,
        textStyle,
        className,
        buttonType = "button",
        rightIcon,
        leftIcon,
        disabled,
        loading,
        onClick,
        btnRef,
        linkRef
    }: ButtonComponentProps) {

    const classNames: string = buttonStyle({
        btnStyle,
        className,
        loading,
        disabled
    });

    if (as === "link") {
        return (
            <Link
                ref={linkRef}
                href={url as string}
                className={classNames}
                aria-disabled={disabled}
                aria-busy={loading ? "true" : "false"}
            >
                <ButtonContent
                    loading={loading}
                    rightIcon={rightIcon}
                    leftIcon={leftIcon}
                    textStyle={textStyle}
                >
                    {children}
                </ButtonContent>
            </Link>
        );
    } else if (as === "a") {
        return (
            <a
                rel={"noopener noreferrer"}
                ref={linkRef}
                href={url}
                className={classNames}
                aria-disabled={disabled}
                aria-busy={loading ? "true" : "false"}
            >
                <ButtonContent
                    loading={loading}
                    rightIcon={rightIcon}
                    leftIcon={leftIcon}
                    textStyle={textStyle}
                >
                    {children}
                </ButtonContent>
            </a>
        );
    } else {
        return (
            <button
                type={buttonType}
                disabled={disabled}
                className={classNames}
                onClick={onClick}
                ref={btnRef}
            >
                <ButtonContent
                    loading={loading}
                    rightIcon={rightIcon}
                    leftIcon={leftIcon}
                    textStyle={textStyle}
                >
                    {children}
                </ButtonContent>
            </button>
        );
    }
}

export default Button;