"use client";

import {
    useEffect,
    useState,
    useRef,
    useActionState,
    startTransition,
    type ChangeEvent,
    type FormEvent
} from "react";
import {login} from "@/actions/login";
import {redirect} from "next/navigation";
import useToggle from "@/hooks/useToggle";
import Input from "@/components/forms/Input";
import {LoginFormDataTypes} from "@/types/auth";
import {emailRegex} from "@/lib/auth-utils/regex";
import useAlertModal from "@/hooks/useAlertModal";
import CheckBox from "@/components/forms/CheckBox";
import FormButton from "@/components/button/FormButton";
import useSetClientTitle from "@/hooks/useSetClientTitle";

const initValue: LoginFormDataTypes = {
    success: false,
    emailError: "",
    passwordError: "",
    fields: {
        email: "",
        password: "",
        remember: false
    }
};

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
            errors.email.includes("فرمت")
            && emailRegex.test(val.trim())
        ) {
            setErrors({
                ...errors,
                email: ""
            });
        }

        if (
            errors.email.includes("وارد")
            && val.trim()
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
            val.trim()
            && errors.password
        ) {
            setErrors({
                ...errors,
                password: ""
            });
        }
    }

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedEmail: string = email?.trim()?.toLowerCase();
        const trimPassword: string = password?.trim();

        const newErrors = {
            email: trimmedEmail ? "" : "ایمیل رو وارد کن",
            password: trimPassword ? "" : "پسورد رو وارد کن",
        };

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setErrors({...newErrors, email: "فرمت ایمیل اشتباهه"});
            return;
        }

        startTransition(() => {
            formAction(new FormData(event.currentTarget));
        });
    }

    useEffect(() => {
        (() => {
            if (state.success) {
                changeAlertModalData({
                    isOpen: true,
                });

                setTimeout(() => redirect("/"), 4000);
            } else {
                if (state.emailError || state.passwordError) {
                    setErrors({
                        email: state.emailError ?? "",
                        password: state.passwordError ?? ""
                    });
                }
            }
        })();
        // eslint-disable-next-line
    }, [state]);

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
                            disabled={state.success}
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