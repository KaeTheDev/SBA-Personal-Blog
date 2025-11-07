const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const addBlogBtn = document.getElementById("addBlogBtn");
const blogList = document.getElementById("blogList"); 

let blogs = JSON.parse(localStorage.getItem("blogs")) || [];