import { useCompletion } from "ai/react"
import { AiOutlineSend, AiOutlineStop } from "react-icons/ai"

const Modal: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal }) => {
  // useCompletion hook to receive the streamed data
  const {
    completion,
    input,
    setInput,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion({
    api: "http://localhost:3000/api/response",
    onError: (err: Error) => {
      //if error exists
      if (process.env.ENV === "development") console.error(err)
    }
  })

  // submitting the form data
  const handleSubmitCode = (e: React.FormEvent<HTMLFormElement>) => {
    setInput("")
    handleSubmit(e)
  }

  return (
    <div className="modalWindow">
      {/*Cross-sign*/}
      <span
        onClick={() => setShowModal(false)}
        className="plasmo-absolute plasmo-top-[1rem] plasmo-right-[1rem] plasmo-text-xl plasmo-font-medium plasmo-cursor-pointer hover:plasmo-bg-slate-100 plasmo-h-[30px] plasmo-w-[30px] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full">
        X
      </span>

      {/* AI response Div*/}
      <div className="plasmo-p-4 plasmo-h-[370px] plasmo-overflow-y-auto plasmo-tracking-widest plasmo-text-sm plasmo-border-[1px] plasmo-border-gray-300 plasmo-rounded-lg">
        {completion}
      </div>

      {/* Input Field */}
      <form action="submit" onSubmit={handleSubmitCode}>
        <div className="plasmo-rounded-full plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[50px] plasmo-flex plasmo-justify-between plasmo-items-center">
          <input
            type="text"
            className="plasmo-w-[90%] plasmo-outline-none plasmo-bg-white"
            placeholder="Enter Your Text... (Below 400 Characters)"
            value={input}
            onChange={handleInputChange}
          />

          {/* showing different buttons based on receiving Response */}
          {isLoading ? (
            <button type="button" onClick={stop}>
              <AiOutlineStop />
            </button>
          ) : (
            <button type="submit">
              <AiOutlineSend />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Modal
