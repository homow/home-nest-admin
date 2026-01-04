'use client';

import ConfirmModal from "@/components/modals/ConfirmModal";
import useAlertModal from "@/hooks/useAlertModal";
import Overlay from "@/components/ui/Overlay";
import {useRouter} from "next/navigation";
import useToggle from "@/hooks/useToggle";

export default function useLogoutAction() {
    const {
        toggle: openConfirmModal,
        handleToggle: setOpenConfirmModal
    } = useToggle();
    const {
        toggle: openLockOverlay,
        handleToggle: setOpenLockOverlay,
    } = useToggle();

    const {AlertModalComponent, changeAlertModalData} = useAlertModal({
        initAlertType: "success",
        initIsOpen: false,
        initMessage: "خروج موفقیت آمیز بود."
    });

    const {replace} = useRouter();

    async function confirmHandler() {
        setOpenLockOverlay(true);
        changeAlertModalData({
            isOpen: true
        });
        setOpenConfirmModal(false);
        await new Promise(resolve => setTimeout(resolve, 4000));
        replace("/login");
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
                flag={openLockOverlay}
                lock
            />
            <Overlay
                flag={openConfirmModal}
                setFlag={setOpenConfirmModal}
            />
        </>
    );

    return {LogoutComponent, openLogoutModal};
};