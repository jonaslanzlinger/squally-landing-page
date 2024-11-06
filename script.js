// Function to handle nav item clicks
function handleNavItemClick(event) {
   event.preventDefault(); // Prevent default anchor behavior

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

   // Remove 'active' class from all links and add to clicked link
   document.querySelectorAll("nav ul li a").forEach((navLink) => {
      navLink.classList.remove("active");
   });
   link.classList.add("active");

   // Focus on chat input if "Chatbot" section is clicked
   if (targetSectionId === "chatbot") {
      document.getElementById("chat-input").focus();
   }
}

// Initial page setup on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
   // Initially show only the first section and set the first link as active
   const sections = document.querySelectorAll("section");
   sections.forEach((section, index) => {
      section.style.display = index === 0 ? "block" : "none";
   });

   const navLinks = document.querySelectorAll("nav ul li a");
   if (navLinks.length > 0) {
      navLinks[0].classList.add("active");
   }

   // Add event listeners to nav items
   navLinks.forEach((link) => {
      link.addEventListener("click", handleNavItemClick);
   });

   // Call updateNavItems if necessary, making sure required variables are defined
   if (typeof updateNavItems === "function") {
      updateNavItems();
   }
});

document.addEventListener("DOMContentLoaded", function () {
   const visitorFeed = document.getElementById("visitor-feed");
   let scrollInterval;

   function startAutoScroll() {
      scrollInterval = setInterval(() => {
         visitorFeed.scrollBy(0, 2); // Adjust scroll speed by changing 2
         if (
            visitorFeed.scrollTop + visitorFeed.clientHeight >=
            visitorFeed.scrollHeight
         ) {
            visitorFeed.scrollTop = 0; // Reset scroll to top when reaching the end
         }
      }, 30); // Adjust interval speed by changing 30
   }

   function stopAutoScroll() {
      clearInterval(scrollInterval);
   }

   visitorFeed.addEventListener("mouseenter", stopAutoScroll);
   visitorFeed.addEventListener("mouseleave", startAutoScroll);

   startAutoScroll();
});
