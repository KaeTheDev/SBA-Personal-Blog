const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const addBlogBtn = document.getElementById("addBlogBtn");
const blogList = document.getElementById("blogList");
const blogTitleError = document.getElementById("blogTitleError");
const blogContentError = document.getElementById("blogContentError");
const blogForm = document.getElementById("blogForm");

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function displaySavedBlogs(blogArray = blogs) {
  blogList.innerHTML = ""; // Clear list so no duplicates are added

  // Create Header
  const header = document.createElement("li");

  header.className = "table-header";
  header.innerHTML = `
    <span class="col">Title</span>
    <span class="col">Content</span>
    `;

  blogList.appendChild(header);

  // Loop through tasks & add theme
  blogArray.forEach((blog) => {
    let blogItem = document.createElement("li");

    // Create Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit Blog";

    blogItem.innerHTML = `
        <span class="col">${blog.blogTitle}</span>
        <span class="col">${blog.blogContent}</span>
        `;

    blogItem.appendChild(editBtn);
    blogList.appendChild(blogItem);
  });
}

// Prevent Submit Until Validation Checks Pass
blogForm.addEventListener("submit", function (event) {
  if (!blogForm.checkValidity()) {
    event.preventDefault();

    if (blogTitle.validity.valueMissing) {
      blogTitle.setCustomValidity(
        "Blog Title is required. Please enter a Blog Title."
      );
    } else {
      blogTitle.setCustomValidity(""); // Clear
    }

    blogTitleError.textContent = blogTitle.validationMessage;

    if (blogContent.validity.valueMissing) {
      blogContent.setCustomValidity(
        "Blog Content is required. Please enter some content."
      );
    } else {
      blogContent.setCustomValidity(""); // Clear
    }

    blogContentError.textContent = blogContent.validationMessage;

    // --- If form is invalid, stop ---
    if (!blogForm.checkValidity()) {
      return;
    }

    // --- If valid, add blog ---
    const blog = {
      blogTitle: blogTitle.value.trim(),
      blogContent: blogContent.value.trim(),
    };

    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    displaySavedBlogs();

    blogForm.reset();
    blogTitleError.textContent = "";
    blogContentError.textContent = "";
  }
});

// Initial Render
displaySavedBlogs();