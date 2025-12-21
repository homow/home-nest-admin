'use client';

import AlertModal, {SetDataTypes} from "@/components/modals/AlertModal";
import type {AlertModalType} from "@/lib/utils";
import useToggle from "./useToggle";
import {useState} from "react";

interface Props {
    initIsOpen?: boolean;
    initMessage: string;
    initDelay?: number;
    initAlertType: AlertModalType;
}

interface ChangeAlertModalData {
    isOpen?: boolean;
    data?: SetDataTypes;
    delay?: number;
}

export default function useAlertModal(
    {
        initIsOpen,
        initMessage,
        initAlertType,
        initDelay,
    }: Props
) {
    const [alertData, setAlertData] = useState<SetDataTypes>({
        alertType: initAlertType || null,
        message: initMessage || ""
    });
    const [currentDelay, setCurrentDelay] = useState<number>(initDelay || 4000);
    const {toggle, handleToggle} = useToggle({
        initialValue: initIsOpen || false,
    });

    function changeAlertModalData(
        {
            isOpen,
            delay,
            data,
        }: ChangeAlertModalData
    ) {
        const message: string | undefined = data?.message;
        const alertType: AlertModalType | undefined = alertData?.alertType;

        if (isOpen !== toggle) handleToggle(isOpen);

        if (
            message !== alertData.message
            || alertType !== alertData.alertType
        ) {
            setAlertData({
                alertType: alertType ??  alertData.alertType,
                message: message ?? alertData.message
            });
        }

        if (
            delay !== currentDelay
            && typeof delay === "number"
        ) setCurrentDelay(delay);
    }

    const AlertModalComponent = () => (
        <AlertModal
            {...alertData}
            isOpen={toggle}
            setData={setAlertData}
            setIsOpen={handleToggle}
            closeDelay={currentDelay}
        />
    );

    return {AlertModalComponent, changeAlertModalData};
};