'use client';

import useAlertModal from "@/hooks/useAlertModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import useToggle from "@/hooks/useToggle";
import {useRouter} from "next/navigation";

export default function LogoutAction() {
    const {
        toggle: openConfirmModal,
        handleToggle: setOpenConfirmModal
    } = useToggle();
    const {AlertModalComponent, changeAlertModalData} = useAlertModal({
        initAlertType: "success",
        initIsOpen: false,
        initMessage: "خروج موفقیت آمیز بود."
    });

    const {replace} = useRouter();

    function confirmHandler() {
        replace("/login");
        changeAlertModalData({
            isOpen: true
        });
    }

    return (
        <>
            <AlertModalComponent/>
            <ConfirmModal
                dangerMode
                cancelText={"نه"}
                confirmText={"بله"}
                title={"خروج از حساب"}
                isOpen={openConfirmModal}
                message={
                    "مطمئنی میخوای از حسابت خارج بشی؟"
                }
                onCancel={() => setOpenConfirmModal(false)}
            />
        </>
    );
};