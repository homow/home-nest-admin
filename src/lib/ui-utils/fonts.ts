import localFont from "next/font/local";
import {Geist} from "next/font/google";

export const dana = localFont({
    src: [
        {
            path: "../assets/fonts/dana-light.woff",
            weight: "300",
            style: "normal"
        },
        {
            path: "../assets/fonts/dana-regular.woff",
            weight: "400",
            style: "normal"
        },
        {
            path: "../assets/fonts/dana-medium.woff",
            weight: "500",
            style: "normal"
        },
        {
            path: "../assets/fonts/dana-bold.woff",
            weight: "700",
            style: "normal"
        },
    ],
    variable: "--font-dana",
    display: "swap",
});

export const geist = Geist({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist",
});