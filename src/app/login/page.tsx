"use client";

import AlertModal from "@/components/modals/AlertModal";
import CheckBox from "@/components/forms/CheckBox";
import {useEffect, useState, useRef} from "react";
import Button from "@/components/button/Button";
import Input from "@/components/forms/Input";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import {login} from "@/actions/login";
import FormButton from "@/components/button/FormButton";

export default function Login() {
    const {
        toggle: showPassword,
        handleToggle: setShowPassword
    } = useToggle();

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    // ref
    const inputRef = useRef<HTMLInputElement>(null);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // focus
    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    // login handler
    const submitHandler = async event => {
        event.preventDefault();

        const trimmedEmail = email.trim().toLowerCase();
        const trimPassword = password.trim();

        const newErrors = {
            email: trimmedEmail ? "" : "ایمیل رو وارد کن",
            password: trimPassword ? "" : "پسورد رو وارد کن",
        }

        if (newErrors.email || newErrors.password) {
            setLoading(false);
            setErrors(newErrors);
            return;
        }

        if (!emailRegex.test(trimmedEmail)) {
            setLoading(false);
            setErrors({...newErrors, email: "فرمت ایمیل اشتباهه"});
            return;
        }

        const userInfo = {
            email: email.trim().toLowerCase(),
            password: password.trim(),
            remember
        };

        setLoading(false);
    }

    // set email handler
    function setEmailHandler(event) {
        const val = event.target.value;

        setEmail(val);

        if (errors.email.includes("فرمت") && emailRegex.test(val.trim())) {
            setErrors({
                ...errors,
                email: ""
            });
        }

        if (errors.email.includes("وارد") && val.trim()) {
            setErrors({
                ...errors,
                email: ""
            });
        }
    }

    // set password handler
    function setPasswordHandler(event) {
        const val = event.target.value;

        setPassword(val);

        if (val.trim() && errors.password) setErrors({
            ...errors,
            password: ""
        });
    }

    return (
        <>
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
                        className="text-2xl font-bold text-center">
                        خوش اومدی
                    </h2>
                    <p
                        className="text-sm text-center text-secondary-txt"
                    >
                        به پنل مدیریت وارد شو.
                    </p>

                    <form
                        action={login}
                        className="space-y-6"
                        onSubmit={submitHandler}
                    >
                        <div>
                            <Input
                                as={"input"}
                                inputType={"text"}
                                id={"email"}
                                name={"email"}
                                ref={inputRef}
                                label={"ایمیل"}
                                autoComplete={"email"}
                                onChange={setEmailHandler}
                                placeholder={"you@example.com"}
                                dir={"ltr"}
                                hasError={errors.email}
                            />
                        </div>

                        <div>
                            <Input
                                as={"input"}
                                id="password"
                                label={"پسورد"}
                                name={"password"}
                                placeholder={"******"}
                                parentClassName={"relative"}
                                onChange={setPasswordHandler}
                                autoComplete={"current-password"}
                                inputType={
                                    showPassword ? "text" : "password"
                                }
                                dir={"ltr"}
                                hasError={errors.password}
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
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <CheckBox
                                id={"remember"}
                                name={"remember"}
                                label={"منو یادت باشه"}
                            />
                        </div>

                        <FormButton>
                            ورود
                        </FormButton>
                    </form>
                </div>
            </section>
        </>
    );
};