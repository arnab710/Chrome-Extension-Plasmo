import { AiOutlineSend } from "react-icons/ai"

const Modal: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal }) => {
  // Your modal content here
  return (
    <div className="modalWindow">
      {/* Modal Content */}
      <span
        onClick={() => setShowModal(false)}
        className="plasmo-absolute plasmo-top-[1.1rem] plasmo-right-[1.1rem] plasmo-text-xl plasmo-font-medium plasmo-cursor-pointer hover:plasmo-bg-slate-300 plasmo-h-[30px] plasmo-w-[30px] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full">
        X
      </span>
      <div className="plasmo-p-4 plasmo-h-[370px] plasmo-overflow-y-auto plasmo-tracking-widest plasmo-text-lg plasmo-border-[1px] plasmo-border-gray-300 plasmo-rounded-lg"></div>
      <div>
        <div className="plasmo-rounded-full plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[50px] plasmo-flex plasmo-justify-between plasmo-items-center">
          <input
            type="text"
            className="plasmo-w-[90%] plasmo-outline-none"
            placeholder="Enter Your Text..."
          />
          <AiOutlineSend />
        </div>
      </div>
    </div>
  )
}

export default Modal
