// ======= FORM & ERROR ELEMENTS =======

const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const addBlogBtn = document.getElementById("addBlogBtn");
const blogList = document.getElementById("blogList");
const blogTitleError = document.getElementById("blogTitleError");
const blogContentError = document.getElementById("blogContentError");
const blogForm = document.getElementById("blogForm");

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// ======= EDIT MODAL ELEMENTS =======
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editBlogTitle = document.getElementById("editBlogTitle");
const editBlogContent = document.getElementById("editBlogContent");
const editBlogTitleError = document.getElementById("editBlogTitleError");
const editBlogContentError = document.getElementById("editBlogContentError");
const cancelEditBtn = document.getElementById("cancelEditBtn");

// Track which blog is being edited
let editIndex = null;

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
  blogArray.forEach((blog, index) => {
    let blogItem = document.createElement("li");

    // Create Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit Blog";
    editBtn.addEventListener("click", () => openEditModal(index));

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


// ======= OPEN EDIT MODAL FUNCTION =======
function openEditModal(index) {
    const blog = blogs[index];
    editBlogTitle.value = blog.blogTitle;
    editBlogContent.value = blog.blogContent;
    editIndex = index;
    editModal.style.display = "flex"; // show the modal
  }

  // ======= HANDLE EDIT FORM SUBMISSION =======
  editForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
  
    let valid = true;
  
    // Validate Title
    if (!editBlogTitle.value.trim()) {
      editBlogTitleError.textContent = "Blog Title is required.";
      valid = false;
    } else {
      editBlogTitleError.textContent = "";
    }
  
    // Validate Content
    if (!editBlogContent.value.trim()) {
      editBlogContentError.textContent = "Blog Content is required.";
      valid = false;
    } else {
      editBlogContentError.textContent = "";
    }
  
    if (!valid) return; // Stop if invalid
  
    // Update the blog in the array
    blogs[editIndex] = {
      blogTitle: editBlogTitle.value.trim(),
      blogContent: editBlogContent.value.trim(),
    };
  
    // Save to localStorage
    localStorage.setItem("blogs", JSON.stringify(blogs));
  
    // Refresh the list
    displaySavedBlogs();
  
    // Close modal and reset
    closeEditModal();
  });

  // Cancel button closes modal without saving
cancelEditBtn.addEventListener("click", closeEditModal);

// Clicking outside modal closes it
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) closeEditModal();
});

// Function to close modal and clear errors
function closeEditModal() {
  editModal.style.display = "none";
  editIndex = null;
  editBlogTitleError.textContent = "";
  editBlogContentError.textContent = "";
}

// Initial Render
displaySavedBlogs();