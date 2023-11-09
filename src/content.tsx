import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import Modal from "~features/Modal"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    // Listen for messages from the background script
    const handleMessage = (request, _sender, _sendResponse) => {
      if (request.action === "toggleModal") {
        setShowModal((prev) => !prev)
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return showModal ? <Modal /> : null
}

export default PlasmoOverlay
