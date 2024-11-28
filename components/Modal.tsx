import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalTypes {
  children: ReactNode;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
}

const ModalWrapper: React.FC<ModalTypes> = ({
  children,
  setOpenModal,
  openModal,
}) => {

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpenModal(false);
        }
      }}
      className={`fixed inset-0 bg-[#000]/30 w-full flex items-center justify-center overflow-y-auto z-50 pt-[100px] ${
        openModal
          ? "scale-100 opacity-100"
          : "scale-90 opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border-b-[10px] border-[#46A358] md:px-[100px] sm:px-[50px] px-[10px] py-[30px] relative shadow-lg sm:w-auto">
        <button
          aria-label="Close modal"
          className="absolute top-3 right-3 text-[#46A358] hover:text-[#34A050] transition-colors"
          onClick={() => setOpenModal(false)}
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
