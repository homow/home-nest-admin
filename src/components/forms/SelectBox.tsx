'use client';

import {useState, useRef, useEffect, type KeyboardEvent} from "react";
import {SelectBoxOptionsType, SelectBoxPropsType} from "@/types/ui";
import {cn} from "@/lib/ui-utils";
import Icon from "../icon/Icon";
import {RedStarField} from "@/components/ui/Fragments";

export default function SelectBox(
    {
        label,
        options,
        value,
        onChange,
        className,
        helperText,
        hasError,
        disabled,
        required
    }: SelectBoxPropsType
) {
    const [open, setOpen] = useState<boolean>(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<HTMLLIElement[]>([]);

    // choose option with arrow keys
    function keyHandler(e: KeyboardEvent) {
        if (!open) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
                setFocusedIndex(options.findIndex(o => o.value === value));
            }
            return;
        }

        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((prev: number): number => (prev + 1) % options.length);
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((prev: number): number => (prev - 1 + options.length) % options.length);
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (focusedIndex >= 0) {
                onChange(options[focusedIndex].value);
                setOpen(false);
            }
        }
    }

    // open handler
    function openHandler() {
        if (!open && disabled) {
            return;
        }

        setOpen(!open);
    }

    useEffect(() => {
        optionRefs.current = optionRefs.current.slice(0, options.length);
    }, [options]);

    // scroll box by arrow key
    useEffect(() => {
        if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
            optionRefs.current[focusedIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    }, [focusedIndex]);

    // clear focus when closes box
    useEffect(() => {
        queueMicrotask(() => {
            setFocusedIndex(-1);
        });
    }, [open]);

    // close component when click the outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedLabel: string = options.find((o: SelectBoxOptionsType): boolean => o.value === value)?.label || "انتخاب کنید";

    return (
        <div
            ref={wrapperRef}
            className={cn(
                "relative w-full",
                className
            )}
        >
            <p
                className={cn(
                    "flex flex-row gap-1 font-medium mb-1 -top-3.5 right-3.5 text-sm",
                    disabled && "text-neutral-400"
                )}
            >
                {label}
                {required && <RedStarField/>}
            </p>

            <button
                type="button"
                aria-expanded={open}
                onClick={openHandler}
                onKeyDown={keyHandler}
                aria-haspopup="listbox"
                aria-controls="select-options"
                className={cn(
                    "flex justify-between text-neutral-500 font-medium items-center w-full rounded-lg border border-gray-300 outline-none px-4 py-2 text-right bg-primary-bg/40 focus:border-violet-500 focus-visible:ring-1 focus:ring-violet-500",
                    "hover:text-neutral-700 transition-all",
                    open && "ring-1 ring-violet-500 border-violet-500 rounded-b-none"
                )}
            >
                <span
                    className={"text-secondary-txt"}
                >
                    {selectedLabel}
                </span>
                <Icon
                    icon={"chevronDown"}
                    className={cn(
                        "text-secondary-txt size-4 transition-transform",
                        open && "rotate-180"
                    )}
                />
            </button>

            {!open &&
                <span
                    className={cn(
                        "absolute pr-4 pt-2 text-sm text-neutral-600",
                        hasError && "text-red-600!",
                        disabled && "text-neutral-400"
                    )}
                >
                    {helperText}
                </span>
            }

            {(open && !disabled) && (
                <ul
                    id="select-options"
                    role="listbox"
                    tabIndex={-1}
                    dir={"ltr"}
                    className="select-box-scroll min-w-max absolute max-h-96 z-20 w-full mt-2 p-1 bg-primary-bg border border-violet-500 overflow-y-auto space-y-0.5"
                >
                    {options.map((opt, index) => (
                        <li
                            dir={"rtl"}
                            role="option"
                            tabIndex={-1}
                            key={opt.value}
                            onKeyDown={keyHandler}
                            id={`option-${index}`}
                            aria-selected={value === opt.value}

                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}

                            ref={(el: HTMLLIElement): void => {
                                optionRefs.current[index] = el;
                            }}

                            className={
                                cn(
                                    "min-w-max flex flex-row items-center justify-between text-sm gap-4 cursor-pointer px-4 py-1.5 leading-7 hover:bg-black/20 dark:hover:bg-white/10",
                                    value === opt.value
                                    && "font-bold bg-violet-500/70 dark:bg-violet-500/40",
                                    focusedIndex === index && "bg-black/20 dark:bg-white/10"
                                )
                            }
                        >
                            <span className={"flex items-center gap-2"}>
                                {opt.icon
                                    && <Icon
                                        icon={opt.icon}
                                        className="text-violet-600"
                                    />
                                }
                                {opt.label}
                            </span>
                            {value === opt.value
                                && <Icon
                                    className="size-5"
                                    icon={"tick"}
                                />
                            }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};