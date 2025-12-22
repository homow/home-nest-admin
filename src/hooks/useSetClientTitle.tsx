'use client';

import {useEffect} from "react";

const baseTitle: string = "آشیانه"

export default function useSetClientTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | ${baseTitle}`;
    }, [title]);
};