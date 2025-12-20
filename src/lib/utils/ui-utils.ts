"use client";

import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

const cn: (...inputs: ClassValue[]) => string = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export {cn};