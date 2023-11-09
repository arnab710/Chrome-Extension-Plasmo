import cssText from "data-text:~style.css"
import React, { useEffect, useState } from "react"

import Modal from "~features/Modal"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay: React.FC<{}> = () => {
  //showing modal window state
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    // Listening for messages from the background script
    const handleMessage = (request: { action: String }) => {
      // Toggle modal visibility when receiving the 'toggleModal' action
      if (request.action === "toggleModal") {
        setShowModal((prev) => !prev)
      }
    }

    // Adding a listener for messages from the background script
    chrome.runtime.onMessage.addListener(handleMessage)

    //cleaning up
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return showModal ? <Modal setShowModal={setShowModal} /> : null
}

export default PlasmoOverlay
