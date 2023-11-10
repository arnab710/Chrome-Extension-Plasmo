# Plasmo AI-Powered Extension Documentation

## Introduction

Welcome to our comprehensive guide for developing a **Chrome extension** using the **Plasmo framework**, a renowned toolset streamlined for extension development. Our primary objective is to leverage an advanced **AI model** to provide **real-time, user-friendly responses** in a **streamed** format.

This extension is designed to interact seamlessly with our custom-built **backend API**, developed using **Next.js 13/14**. The backend plays a pivotal role in processing and streaming AI-generated responses based on user interactions. For an in-depth understanding of our backend architecture and functionalities, you can visit our dedicated repository: [Next.js AI Backend](https://github.com/arnab710/Next.js-AI-Backend).

In this documentation, we will walk you through the key components and functionalities of our Plasmo extension, providing **step-by-step instructions** and insights into our development process.

---

## Extension Demo Video

https://github.com/arnab710/Chrome-Extension-Plasmo/assets/107277776/74554421-ff0f-485d-9405-7323cf06e9f2

## Workflow

### Step-by-Step Process

1. **Initiating the Interaction:**

   When the user clicks on the extension icon, our goal is to display a popup modal in the center of the browser window. This modal serves as the interface for users to send messages to the AI model and receive responses.

   - The popup is implemented using a content script that renders the user interface and handles user inputs.

2. **Background Worker Configuration:**

   - Before diving into the content script (`content.tsx`), it's crucial to set up the background worker (`background.tsx`) to listen for the icon click event. This is a key step as the background worker is responsible for responding to the extension icon interactions.
   - Here's how our `background.tsx` handles this task:

   ```typescript
   export {}

   chrome.action.onClicked.addListener((tab) => {
     chrome.tabs.sendMessage(tab.id, { action: "toggleModal" })
   })
   ```

**chrome.action.onClicked.addListener:**

- This line sets up a listener for the click event on the extension icon. Whenever the user clicks the icon, the specified callback function is executed.

**chrome.tabs.sendMessage:**

- Inside the callback function, this method sends a message to the content script of the current tab.

**tab.id:**

- This represents the ID of the current tab where the user clicked the extension icon.

**{ action: "toggleModal" }:**

- The message sent to the content script. It instructs the content script to toggle the visibility of the modal.

## Workflow

### 3. Content Script: `Content.tsx`

`Content.tsx` is a key component of our Chrome extension, serving as the content script responsible for the user interface and interaction logic.

#### Detailed Breakdown of `Content.tsx`

```typescript

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

```

**Modal State Management:**

- `const [showModal, setShowModal] = useState<boolean>(false)`: Declares a state variable showModal for tracking the visibility of the modal, along with a function setShowModal to update this state.

**Listening for Background Script Messages:**

- Inside useEffect, a function handleMessage is defined to handle incoming messages from the background script.
  `chrome.runtime.onMessage.addListener(handleMessage)`: Sets up the message listener.
  If handleMessage receives an action of "toggleModal", it toggles the state of showModal, thereby showing or hiding the modal.

**Rendering the Modal Component:**

- `return showModal ? <Modal setShowModal={setShowModal} /> : null`: Conditionally renders the Modal component based on the showModal state. If showModal is true, the Modal component is displayed.

### 4. Modal Component Implementation (`Modal.tsx`)

The `Modal.tsx` file is the final piece of our extension, handling the user interface where interactions with the AI model take place.

#### Detailed Explanation of `Modal.tsx`

```typescript
const Modal: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowModal }) => {
  // useCompletion hook to receive the streamed data from API (inbuilt hook)
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
        className="plasmo-absolute plasmo-top-[0.7rem] plasmo-right-[0.7rem] plasmo-text-[16px] plasmo-font-medium plasmo-cursor-pointer hover:plasmo-bg-slate-100 plasmo-h-[30px] plasmo-w-[30px] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full">
        X
      </span>

      {/* AI response Div*/}
      <div className="plasmo-p-4 plasmo-h-[370px] plasmo-overflow-y-auto plasmo-tracking-widest plasmo-text-sm plasmo-border-[1.5px] plasmo-border-gray-200 plasmo-rounded-lg">
        {completion}
      </div>

      {/* Input Field */}
      <form action="submit" onSubmit={handleSubmitCode}>
        <div className="plasmo-rounded-full plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[50px] plasmo-flex plasmo-justify-between plasmo-items-center plasmo-border-gray-200">
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
```

**Modal Functional Component:**

- The Modal component is a React functional component that receives a prop setShowModal. This function is used to toggle the visibility of the modal.

**Streamlined Data Handling with useCompletion:**

- The useCompletion hook is configured to connect to the API endpoint (http://localhost:3000/api/response). It manages the stream of data from the backend, handling both the submission of user inputs and the retrieval of AI responses.
- It exposes several variables and functions such as completion, input, setInput, stop, isLoading, handleInputChange, and handleSubmit.

**User Interface and Interactivity:**

- Close Button: A clickable icon to close the modal, enhancing user control over the interface.
  AI Response Display: A dedicated div to show the AI-generated responses, ensuring they are presented in a readable and scrollable format.
- Input Field: Allows users to input their queries or commands, limited to 400 characters for optimal performance and usability.
- Submit and Stop Buttons: Interactive buttons to submit new queries or stop the ongoing process. Icons are used for a clear and user-friendly experience.

**Form Submission Logic:**

- The form submission is handled by handleSubmitCode, which resets the input field and triggers the handleSubmit function from the useCompletion hook to send the user input to the backend.
