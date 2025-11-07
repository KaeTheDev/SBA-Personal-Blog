const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const addBlogBtn = document.getElementById("addBlogBtn");
const blogList = document.getElementById("blogList"); 
const blogTitleError = document.getElementById("blogTitleError");
const blogContentError = document.getElementById("blogContentError");

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

// Calls to Event Listeners
addBlogBtn.addEventListener("click", addBlog)

function addBlog(){
    let blog = {
        blogTitle: blogTitle.value,
        blogContent: blogContent.value,
    };

    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    if(blogTitle.validity.valueMissing){
        blogTitle.setCustomValidity("Blog Title is required. Please enter a Blog Title.");
    } else {
        blogTitle.setCustomValidity(''); // Clear 
    }

    blogTitleError.textContent = blogTitle.validationMessage;

    if(blogContent.validity.valueMissing){
        blogContent.setCustomValidity("Blog Content is required. Please enter some content.");
    } else {
        blogContent.setCustomValidity(''); // Clear
    }

    blogContentError.textContent = blogContent.validationMessage;

    displaySavedBlogs(blogs); // Show all tasks again, including new ones

    blogTitle.value = '';
    blogContent.value = '';
}

function displaySavedBlogs(blogArray = blogs) {
    blogList.innerHTML = ''; // Clear list so no duplicates are added

    // Create Header
    const header = document.createElement("li");

    // Create Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit Blog";

    header.className = "table-header";
    header.innerHTML = `
    <span class="col">Title</span>
    <span class="col">Content</span>
    `;

    blogList.appendChild(header);


    // Loop through tasks & add theme
    blogArray.forEach((blog) =>{
        let blogItem = document.createElement("li");

        blogItem.innerHTML = `
        <span class="col">${blog.blogTitle}</span>
        <span class="col">${blog.blogContent}</span>
        `;

        blogList.appendChild(blogItem);
        blogItem.appendChild(editBtn);
    });

}

// Initial Render
displaySavedBlogs();