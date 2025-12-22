'use client';

import {useLayoutEffect} from "react";

export default function useSetClientTitle(title: string) {
    useLayoutEffect(() => {
        document.title = `${title} | آشیانه`;
    }, [title]);
};