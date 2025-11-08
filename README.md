# SBA 5 – Interactive Personal Blog Platform

## Overview
In this Skills-Based Assessment (SBA), I developed an **Interactive Personal Blog Platform** from scratch. This project tested my ability to manipulate the DOM, handle user events, implement form validation, and utilize `localStorage` for data persistence. The primary focus is on **client-side JavaScript functionality** to create a dynamic and interactive web application.

----------

## Learning Objectives

By completing this SBA, you will:

- Gain hands-on experience with **DOM manipulation** and event handling.
- Implement **form validation** with custom error messages.
- Learn to **persist data using localStorage**.
- Practice creating dynamic, interactive content without a backend.
- Strengthen problem-solving and debugging skills in JavaScript.
    

----------

## Description
This project is a simple, client-side only **personal blog/journal platform** that allows users to:

- **Create new posts** with a title and content.
- **Display all posts** dynamically on the page.
- **Edit posts** with live updates to the display and localStorage.
- **Delete posts** with immediate reflection in the UI and localStorage.
- **Persist data** so that posts remain after refreshing or reopening the browser.

The application is fully functional without a backend, focusing on **JavaScript-driven interactivity**.

----------

## Resources

- [MDN Web Docs – DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN Web Docs – localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [JavaScript Event Handling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
----------

## Getting Started

### Requirements

-   A modern browser (Chrome, Firefox, Safari, or Edge)
    
-   **Node.js**  (optional, only needed if using npm scripts)
    
-   **Live Server**  extension for VS Code (or any similar local server)
    

### OS Compatibility

This lab can be completed on  **Windows**,  **macOS**, or  **Linux**.

----------

## Installation

1.  **Clone this repository**  to your computer:
    
    `git clone https://github.com/KaeTheDev/SBA-Personal-Blog.git
    
2.  **Open the project folder**  in your code editor:
    
    `cd SBA_BlogPost
    
3.  **Preview your project**:
    
    -   Open  `index.html`  in VS Code.
        
    -   Right-click and select  **“Open with Live Server.”**


# REFLECTION

I started the project by setting up the HTML structure and basic CSS styling. This visual foundation helped me plan the logic and layout of the application, making it easier to see how each component would interact.

Since this is a CRUD project, I followed the natural sequence: Create, Read, Update, Delete. I first focused on the Create functionality, coding a function to allow new blog posts to be added with a title and content. Once creating a blog post worked, I implemented localStorage so that data could persist across page reloads.

Next, I tackled the Read functionality, ensuring that blog posts would display correctly after being created. After that, I moved on to Update and Delete features.

I faced a few challenges along the way. For instance, initially the timestamp was not displaying a readable date; it appeared as a string of numbers. I realized I needed to instantiate a new Date() object to generate a proper timestamp. Another challenge was assigning a unique ID to each blog post. I found it easier to implement the timestamp and unique ID after the core CRUD operations were functioning, which allowed me to focus first on getting the application logic correct.

Overall, this project reinforced the importance of tackling functionality in stages, debugging incrementally, and ensuring that the core logic is solid before adding additional features like timestamps or unique IDs. I am also feeling a lot more confident with the DOM and vanilla JavaScript.