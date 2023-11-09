const Modal = () => {
  // Your modal content here
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "white"
      }}>
      {/* Modal Content */}
      <p className="plasmo-text-green-400">Modal Content Here</p>
    </div>
  )
}

export default Modal
