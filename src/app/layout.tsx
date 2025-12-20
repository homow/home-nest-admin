import CustomThemeProvider from "@/components/ui/CustomThemeProvider";
import {ChildrenComponentProps} from "@/types/ui";
import {dana, geist} from "@/lib/fonts";
import "@/styles/globals.css";

export default function RootLayout(
    {
        children,
    }: ChildrenComponentProps
) {
    return (
        <html
            lang="fa"
            dir="rtl"
            className={`${dana.variable} ${geist.variable}`}
            suppressHydrationWarning
        >
        <head>
            {/* <=== meta tags ===> */}
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            {/* <=== icons ===> */}
            <link rel="manifest" href="/favicon/site.webmanifest"/>
            <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png"/>
            <link rel="shortcut icon" href="/favicon/favicon.ico"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png"/>

            {/* <=== title ===> */}
            <title>پنل مدیریت | آشیانه</title>
        </head>
        <body
            className={`antialiased`}
        >
        <CustomThemeProvider>
            <main>
                {children}
            </main>
        </CustomThemeProvider>
        </body>
        </html>
    );
};