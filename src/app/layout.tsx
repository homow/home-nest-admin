import "./globals.css";
import {cookies} from "next/headers";
import {MainComponentProps} from "@/types/ui";
import SvgDefs from "@/components/icon/SvgDefs";
import {dana, geist} from "@/lib/utils/ui-utils/fonts";
import {getAccessCookie} from "@/lib/server-utils/getCookies";
import CustomThemeProvider from "@/components/ui/CustomThemeProvider";
import ReactQueryProvider from "@/components/clientWrapper/ReactQueryProvider";
import UserStoreInitializer from "@/components/clientWrapper/UserStoreInitializer";

export default async function RootLayout(
    {
        children,
    }: MainComponentProps
) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");
    const accessToken = await getAccessCookie();

    try {
        const res = await fetch("http://localhost:3000/api/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `refreshToken=${refreshToken?.value}`,
            },
        });
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }

    return (
        <html
            data-scroll-behavior="smooth"
            lang="fa"
            dir="rtl"
            className={`${dana.variable} ${geist.variable}`}
            suppressHydrationWarning
        >
        <head>
            {/* <=== meta tags ===> */}
            <meta
                charSet="UTF-8"
            />
            <meta
                httpEquiv="X-UA-Compatible"
                content="ie=edge"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            {/* <=== icons ===> */}
            <link
                rel="manifest"
                href="/favicon/site.webmanifest"
            />
            <link
                rel="apple-touch-icon"
                href="/favicon/apple-touch-icon.png"
            />
            <link
                rel="shortcut icon"
                href="/favicon/favicon.ico"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon/favicon-16x16.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/favicon/android-chrome-192x192.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="512x512"
                href="/favicon/android-chrome-512x512.png"
            />

            {/* <=== title ===> */}
            <title>داشبورد | آشیانه</title>
        </head>
        <body
            className={"antialiased flex min-h-svh"}
        >
        {/* svg icons */}
        <SvgDefs/>

        <UserStoreInitializer token={accessToken}/>

        <CustomThemeProvider>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </CustomThemeProvider>
        </body>
        </html>
    );
};