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
        timeStamp: Date.now()
    };

    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    if(blogTitle.validity.valueMissing){
        blogTitle.setCustomValidity("Blog Title is required. Please enter a Blog Title.");
    } else {
        blogTitle.setCustomValidity(''); // Clear 
    }

    blogTitleError.textContent = blogTitle.validationMessage;

    blogTitle.value = '';
    blogContent.value = '';
}