// 'use client';
//
// import ConfirmModal, {type Props} from "@/components/modals/ConfirmModal";
// import useToggle from "@/hooks/useToggle";
// import {useState} from "react";
//
// interface ChangeConfirmModalProps {
//     msg?: string;
//     isOpen?: boolean;
//     title
// }
//
// export default function useConfirmModal(
//     {
//         z,
//         title,
//         isOpen,
//         message,
//         loading,
//         onCancel,
//         onConfirm,
//         cancelText,
//         dangerMode,
//         confirmText,
//     }: Props
// ) {
//     const {toggle: openConfirmModal, handleToggle} = useToggle();
//     const [currentMessage, setCurrentMessage] = useState<string | undefined>(
//         message || undefined
//     );
//
//     function changeConfirmModalData(
//         {
//             msg
//         }
//     ) {
//
//     }
//
//     const ConfirmModalComponent = () => (
//         <ConfirmModal
//             z={z}
//             title={title}
//             loading={loading}
//             onCancel={onCancel}
//             onConfirm={onConfirm}
//             dangerMode={dangerMode}
//             cancelText={cancelText}
//             message={currentMessage}
//             confirmText={confirmText}
//             isOpen={openConfirmModal}
//         />
//     );
// };