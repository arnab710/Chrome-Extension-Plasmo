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

   - When the user clicks on the extension icon, our goal is to display a popup modal in the center of the browser window. This modal serves as the interface for users to send messages to the AI model and receive responses.
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
