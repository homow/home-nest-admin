"use client";

import {
    useEffect,
    useState,
    useRef,
    useActionState,
    startTransition,
    type ChangeEvent,
    // type FormEvent
} from "react";
import CheckBox from "@/components/forms/CheckBox";
import FormButton from "@/components/button/FormButton";
import Input from "@/components/forms/Input";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import {login} from "@/actions/login";
import {LoginFormDataTypes} from "@/types/auth";
import {emailRegex} from "@/lib/auth-utils";
import useAlertModal from "@/hooks/useAlertModal";

const initValue: LoginFormDataTypes = {
    success: false,
    emailError: "",
    passwordError: "",
    fields: {
        email: "",
        password: "",
        remember: false
    }
}

export default function Login() {
    const [state, formAction] = useActionState(login, initValue);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const {
        toggle: showPassword,
        handleToggle: setShowPassword
    } = useToggle();
    const {AlertModalComponent, changeAlertModalData} = useAlertModal({
        initAlertType: "success",
        initMessage: "ورود موفقیت آمیز بود",
    });

    // ref
    const inputRef = useRef<HTMLInputElement>(null);

    // focus
    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    // set email handler
    function setEmailHandler(event: ChangeEvent<HTMLInputElement>) {
        const val: string = event.target.value;

        setEmail(val);

        if (
            errors.email.includes("فرمت") &&
            emailRegex.test(val.trim())
        ) {
            setErrors({
                ...errors,
                email: ""
            });
        }

        if (
            errors.email.includes("وارد") &&
            val.trim()
        ) {
            setErrors({
                ...errors,
                email: ""
            });
        }
    }

    // set password handler
    function setPasswordHandler(event: ChangeEvent<HTMLInputElement>) {
        const val: string = event.target.value;

        setPassword(val);

        if (
            val.trim() &&
            errors.password
        ) {
            setErrors({
                ...errors,
                password: ""
            });
        }
    }

    function submitHandler() {
        // event.preventDefault();

        const trimmedEmail: string = email?.trim()?.toLowerCase();
        const trimPassword: string = password?.trim();

        const newErrors = {
            email: trimmedEmail ? "" : "ایمیل رو وارد کن",
            password: trimPassword ? "" : "پسورد رو وارد کن",
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setErrors({...newErrors, email: "فرمت ایمیل اشتباهه"});
            return;
        }

        // startTransition(() => {
        //     formAction(new FormData(event.currentTarget));
        // });
    }

    useEffect(() => {
        if (state.success) {
            changeAlertModalData({
                isOpen: true,
            });
        }
        // eslint-disable-next-line
    }, [state]);

    return (
        <>
            <AlertModalComponent/>

            {/* logo */}
            <Image
                alt="logo"
                height={240}
                width={240}
                id={"login-logo"}
                src={"/images/shared/logo.webp"}
                className={"max-w-10 top-2 left-2 absolute xs:top-5 xs:left-5 xs:max-w-20"}
            />

            <section
                className="flex items-center justify-center min-h-screen"
            >
                <div
                    className="max-w-9/10 w-full xs:max-w-sm sm:max-w-md bg-white/10 rounded-2xl shadow-lg space-y-6 p-3 xs:p-8"
                >
                    <h2
                        className="text-2xl font-bold text-center"
                    >
                        خوش اومدی
                    </h2>
                    <p
                        className="text-sm text-center text-secondary-txt"
                    >
                        به پنل مدیریت وارد شو.
                    </p>

                    <form
                        // onSubmit={submitHandler}
                        className="space-y-6"

                        action={formAction}
                    >
                        <Input
                            value={email}
                            dir={"ltr"}
                            id={"email"}
                            as={"input"}
                            name={"email"}
                            label={"ایمیل"}
                            inputType={"text"}
                            inputRef={inputRef}
                            autoComplete={"email"}
                            hasError={
                                errors.email || state.emailError
                            }
                            placeholder={"you@example.com"}
                            onChangeInput={setEmailHandler}
                        />

                        <Input
                            value={password}
                            as={"input"}
                            id="password"
                            label={"پسورد"}
                            name={"password"}
                            placeholder={"******"}
                            parentClassName={"relative"}
                            autoComplete={"current-password"}
                            inputType={
                                showPassword ? "text" : "password"
                            }
                            dir={"ltr"}
                            hasError={
                                errors.password || state.passwordError
                            }
                            onChangeInput={setPasswordHandler}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide Password" : "Show Password"}
                                className="absolute right-2 top-1/2 text-sm text-gray-500 hover:text-violet-500 cursor-pointer"
                            >
                                {showPassword ? "مخفی" : "نمایش"}
                            </button>
                        </Input>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <CheckBox
                                id={"remember"}
                                name={"remember"}
                                label={"منو یادت باشه"}
                            />
                        </div>

                        <FormButton
                            // disabled={state.success}
                            className={"w-full justify-center"}
                        >
                            ورود
                        </FormButton>
                    </form>
                </div>
            </section>
        </>
    );
};