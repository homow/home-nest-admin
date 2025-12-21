'use client';

import useAlertModal from "@/hooks/useAlertModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import useToggle from "@/hooks/useToggle";
import {useRouter} from "next/navigation";
import Overlay from "@/components/ui/Overlay";

export default function useLogoutAction() {
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

    function openLogoutModal() {
        setOpenConfirmModal(true);
    }

    const LogoutComponent = () => (
        <>
            <AlertModalComponent/>
            <ConfirmModal
                dangerMode
                cancelText={"نه"}
                confirmText={"بله"}
                title={"خروج از حساب"}
                isOpen={openConfirmModal}
                onConfirm={confirmHandler}
                setIsOpen={setOpenConfirmModal}
                message={
                    "مطمئنی میخوای از حسابت خارج بشی؟"
                }
                onCancel={() => setOpenConfirmModal(false)}
            />
            <Overlay
                flag={openConfirmModal}
                setFlag={setOpenConfirmModal}
            />
        </>
    );

    return {LogoutComponent, openLogoutModal};
};