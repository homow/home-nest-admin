"use client";

import {
    useEffect,
    useState,
    useRef,
    type ChangeEvent,
    type FormEvent
} from "react";
import useToggle from "@/hooks/useToggle";
import Input from "@/components/forms/Input";
import {LoginFormStateType} from "@/types/auth";
import useAlertModal from "@/hooks/useAlertModal";
import {emailRegex} from "@/lib/auth-utils/regex";
import CheckBox from "@/components/forms/CheckBox";
import FormButton from "@/components/button/FormButton";
import useSetClientTitle from "@/hooks/useSetClientTitle";

const initValue: LoginFormStateType = {
    success: false,
    emailError: "",
    passwordError: "",
};

export default function Login() {
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [formState, setFormState] = useState<LoginFormStateType>(initValue);

    const {
        toggle: showPassword,
        handleToggle: setShowPassword
    } = useToggle();

    const {
        AlertModalComponent,
        changeAlertModalData
    } = useAlertModal({
        initAlertType: "success",
        initMessage: "ورود موفقیت آمیز بود",
    });

    // ref
    const inputRef = useRef<HTMLInputElement>(null);

    // set title
    useSetClientTitle("صفحه لاگین");

    // focus
    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    // set email handler
    function setEmailHandler(event: ChangeEvent<HTMLInputElement>) {
        const val: string = event.target.value;

        setEmail(val);

        if (
            formState?.emailError?.includes("فرمت")
            && emailRegex.test(val.trim())
        ) {
            setFormState({
                ...formState,
                emailError: ""
            });
        }

        if (
            formState?.emailError?.includes("وارد")
            && val.trim()
        ) {
            setFormState({
                ...formState,
                emailError: ""
            });
        }
    }

    // set password handler
    function setPasswordHandler(event: ChangeEvent<HTMLInputElement>) {
        const val: string = event.target.value;

        setPassword(val);

        if (
            val.trim()
            && formState.passwordError
        ) {
            setFormState({
                ...formState,
                passwordError: ""
            });
        }
    }

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedEmail: string = email?.trim()?.toLowerCase();
        const trimPassword: string = password?.trim();

        const newErrors: LoginFormStateType = {
            emailError: trimmedEmail ? "" : "ایمیل رو وارد کن",
            passwordError: trimPassword ? "" : "پسورد رو وارد کن",
            success: false,
        };

        if (
            newErrors.emailError
            || newErrors.passwordError
        ) {
            setFormState(newErrors);
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setFormState({
                ...newErrors,
                emailError: "فرمت ایمیل اشتباهه"
            });
            return;
        }

    }

    return (
        <>
            <AlertModalComponent/>

            <section
                className="flex-1 flex items-center justify-center"
            >
                <div
                    className="flex-1 max-w-9/10 w-full xs:max-w-sm sm:max-w-md bg-white/10 rounded-2xl shadow-lg space-y-6 p-3 xs:p-8"
                >
                    <h2
                        className="text-2xl font-bold text-center"
                    >
                        آشیانه
                    </h2>
                    <p
                        className="text-sm text-center text-secondary-txt"
                    >
                        ورود به پنل مدیریت
                    </p>

                    <form
                        onSubmit={submitHandler}
                        className="space-y-6"
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
                            hasError={formState.emailError}
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
                            hasError={formState.passwordError}
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

                        <div
                            className="flex items-center justify-between text-sm text-gray-400"
                        >
                            <CheckBox
                                id={"remember"}
                                name={"remember"}
                                label={"منو یادت باشه"}
                            />
                        </div>

                        <FormButton
                            disabled={formState.success}
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