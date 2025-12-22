'use client';

import {useEffect} from "react";

export default function useSetClientTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | آشیانه`;
    }, [title]);
};