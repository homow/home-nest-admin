import {useEffect, useState} from "react"
import axios from "axios";

export default function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        document.title = "ورود به اکانت ادمین | آشیانه";
    }, [])

    const loginHandler = async event => {
        event.preventDefault()

        const userInfo = {
            email: email.trim().toLowerCase(),
            password: password.trim().toLowerCase(),
            remember
        }

        try {
            const res = await axios.post("/api/auth/login", userInfo)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className="flex items-center justify-center pt-20">
            <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">خوش آومدی</h2>
                <p className="text-sm text-center text-secondary-txt">
                    لطفا به اکانت خودت وارد شو.
                </p>

                <form className="space-y-6" onSubmit={loginHandler}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">ایمیل</label>
                        <input
                            dir={"ltr"}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            name="email"
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">پسورد</label>
                        <div className="relative">
                            <input
                                dir={"ltr"}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="*******"
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 placeholder-gray-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 text-sm text-gray-500 hover:text-violet-500 cursor-pointer"
                            >
                                {showPassword ? "مخفی" : "نمایش"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                onChange={event => setRemember(event.target.checked)}
                                type="checkbox"
                                className="w-4 h-4 rounded border-2 border-gray-400 appearance-none checked:bg-violet-500 checked:border-violet-600 cursor-pointer"/>
                            <span>منو یادت باشه</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-violet-500 text-white font-semibold rounded-lg py-2 hover:bg-violet-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    )
}