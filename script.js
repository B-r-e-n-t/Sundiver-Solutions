






console.log("script.js loaded");

function toggleMenu() {
    console.log("Hamburger clicked");
    const menu = document.getElementById("mobileMenu");

    if (!menu) {
        console.log("Mobile menu element NOT FOUND");
        return;
    }

    menu.classList.toggle("show");
}






function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) {
      el.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
      el.scrollIntoView({ behavior: "smooth" });
  }
}


