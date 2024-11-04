// Function to handle nav item clicks
function handleNavItemClick(event) {
   event.preventDefault();
   const link = event.target;
   const targetSectionId = link.getAttribute("href").substring(1);
   const targetSection = document.getElementById(targetSectionId);

   // Hide all sections
   document.querySelectorAll("section").forEach((section) => {
      section.style.display = "none";
   });

   // Show the target section if it exists
   if (targetSection) {
      targetSection.style.display = "block";
   }

   // Update active class
   document.querySelectorAll("nav ul li a").forEach((navLink) => {
      navLink.classList.remove("active");
   });
   link.classList.add("active");
}

// Initial page setup on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
   const sections = document.querySelectorAll("section");
   sections.forEach((section, index) => {
      section.style.display = index === 0 ? "block" : "none";
   });

   const navLinks = document.querySelectorAll("nav ul li a");
   if (navLinks.length > 0) {
      navLinks[0].classList.add("active");
   }

   navLinks.forEach((link) => {
      link.addEventListener("click", handleNavItemClick);
   });
});
