document.getElementById("contactBtn" ).addEventListener("click" , (event)=>{
  event.preventDefault();
   const contct=document.getElementById("contact-section");
   contct.scrollIntoView({behavior:"smooth"})
})

// Function to change the favicon
function changeFavicon(newIconURL) {
  let favicon = document.getElementById('favicon');
  favicon.href = newIconURL;
}
fevicon.style.borderRadius="50% 50%"

// Example: change the favicon on window load
window.onload = function() {
  changeFavicon('/image/IMG-20211028-WA0007jpg.0.jpg'); // Path to your new favicon
};


document.getElementById("about").addEventListener("click", (event)=>{
  event.preventDefault();
  const about=document.getElementById("content-area");
  about.scrollIntoView({behavior:"smooth"});
})
document
.getElementById("loadProjectBtn")
.addEventListener("click", function (event) {
  event.preventDefault();
  const projectSection = document.getElementById("projects-section");
  projectSection.scrollIntoView({ behavior: "smooth" });
});