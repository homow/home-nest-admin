"use client";

import {useState} from "react";

interface Props {
    initialValue?: boolean;
}

function useToggle(
    {
        initialValue = false
    }: Props = {}
) {
    const [toggle, setToggle] = useState<boolean>(initialValue);

    function handleToggle(value?: boolean) {
        if (typeof value === "boolean") {
            setToggle(value);
        } else {
            setToggle((prev: boolean) => !prev);
        }
    }

    return {toggle, handleToggle};
}

export default useToggle;