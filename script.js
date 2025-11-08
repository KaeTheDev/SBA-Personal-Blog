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

let blogIdCounter = Number(localStorage.getItem("blogIdCounter")) || 1;

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

    // Create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete Blog";
    deleteBtn.addEventListener("click", () => deleteBlog(index));

    blogItem.innerHTML = `
        <span class="col">${blog.blogTitle}</span>
        <span class="col">${blog.blogContent}</span>
        `;

    blogItem.appendChild(editBtn);
    blogItem.appendChild(deleteBtn);
    blogList.appendChild(blogItem);
  });
}

blogForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  let valid = true;

  // Validate Title
  if (!blogTitle.value.trim()) {
    blogTitleError.textContent = "Blog Title is required.";
    valid = false;
  } else {
    blogTitleError.textContent = "";
  }

  // Validate Content
  if (!blogContent.value.trim()) {
    blogContentError.textContent = "Blog Content is required.";
    valid = false;
  } else {
    blogContentError.textContent = "";
  }

  if (!valid) return; // Stop if invalid

  // --- If valid, add blog ---
  const blog = {
    blogTitle: blogTitle.value.trim(),
    blogContent: blogContent.value.trim(),
    timeStamp: new Date(),
    id: blogIdCounter,
  };
  // Increment counter and save to localStorage
  blogIdCounter++;
  localStorage.setItem("blogIdCounter", blogIdCounter);

  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));

  displaySavedBlogs();
  blogForm.reset();
  blogTitleError.textContent = "";
  blogContentError.textContent = "";
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

// ======= HANDLE DELETE BLOG =======
function deleteBlog(index) {
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  displaySavedBlogs();
}

// Initial Render
displaySavedBlogs();
