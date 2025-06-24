// Global variables
let currentGalleryIndex = 0
let activeTab = "text"
let mobileMenuOpen = false

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
})

function initializeWebsite() {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Initialize scroll tracking for navigation
  initializeScrollTracking()

  // Initialize gallery
  initializeGallery()

  // Add loading animations
  addLoadingAnimations()

  // Initialize form validation
  initializeFormValidation()
}

// Navigation functionality
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = document.querySelector(".navbar").offsetHeight
    const elementPosition = element.offsetTop - navHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }

  // Close mobile menu if open
  if (mobileMenuOpen) {
    toggleMobileMenu()
  }
}

function initializeScrollTracking() {
  window.addEventListener("scroll", () => {
    const sections = ["services", "gallery", "about", "contact", "testimonials"]
    const navLinks = document.querySelectorAll(".nav-link")

    let currentSection = ""

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = sectionId
        }
      }
    })

    // Update active navigation link
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.dataset.section === currentSection) {
        link.classList.add("active")
      }
    })
  })
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links")
  const toggleButton = document.querySelector(".mobile-menu-toggle")

  mobileMenuOpen = !mobileMenuOpen

  if (mobileMenuOpen) {
    navLinks.style.display = "flex"
    navLinks.style.flexDirection = "column"
    navLinks.style.position = "absolute"
    navLinks.style.top = "100%"
    navLinks.style.left = "0"
    navLinks.style.right = "0"
    navLinks.style.background = "white"
    navLinks.style.padding = "1rem"
    navLinks.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    toggleButton.innerHTML = '<i class="fas fa-times"></i>'
  } else {
    navLinks.style.display = "none"
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>'
  }
}

// Gallery functionality
function initializeGallery() {
  const slides = document.querySelectorAll(".gallery-slide")
  if (slides.length > 0) {
    showGallerySlide(0)
  }
}

function showGallerySlide(index) {
  const slides = document.querySelectorAll(".gallery-slide")

  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active")
  })

  // Show current slide
  if (slides[index]) {
    slides[index].classList.add("active")
    currentGalleryIndex = index
  }
}

function nextGalleryImage() {
  const slides = document.querySelectorAll(".gallery-slide")
  const nextIndex = (currentGalleryIndex + 1) % slides.length
  showGallerySlide(nextIndex)
}

function prevGalleryImage() {
  const slides = document.querySelectorAll(".gallery-slide")
  const prevIndex = (currentGalleryIndex - 1 + slides.length) % slides.length
  showGallerySlide(prevIndex)
}

// Tab functionality
function switchTab(tabName) {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanels = document.querySelectorAll(".tab-panel")

  // Remove active class from all buttons and panels
  tabButtons.forEach((button) => button.classList.remove("active"))
  tabPanels.forEach((panel) => panel.classList.remove("active"))

  // Add active class to selected button and panel
  const activeButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`)
  const activePanel = document.getElementById(`${tabName}-tab`)

  if (activeButton && activePanel) {
    activeButton.classList.add("active")
    activePanel.classList.add("active")
    activeTab = tabName
  }
}

// Contact functionality
function handleTextBrent() {
  const message = encodeURIComponent("Hi Brent, I'm interested in a quote for landscaping services.")
  const smsUrl = `sms:6014545426?body=${message}`

  // Try to open SMS app
  window.location.href = smsUrl
}

function handleFormSubmit(event) {
  event.preventDefault()

  // Get form data
  const formData = new FormData(event.target)
  const data = {}

  // Convert FormData to regular object
  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      // Handle multiple values (like checkboxes)
      if (Array.isArray(data[key])) {
        data[key].push(value)
      } else {
        data[key] = [data[key], value]
      }
    } else {
      data[key] = value
    }
  }

  // Get selected services
  const selectedServices = []
  const serviceCheckboxes = document.querySelectorAll('input[name="services"]:checked')
  serviceCheckboxes.forEach((checkbox) => {
    selectedServices.push(checkbox.value)
  })

  // Simulate form submission
  console.log("Form submitted with data:", {
    ...data,
    services: selectedServices,
  })

  // Show success message
  showFormSuccessMessage()

  // Reset form
  event.target.reset()
}

function showFormSuccessMessage() {
  // Create and show success message
  const successMessage = document.createElement("div")
  successMessage.className = "success-message"
  successMessage.innerHTML = `
        <div style="
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
            font-weight: 600;
        ">
            Thanks! We'll get back to you within a few hours.
        </div>
    `

  const form = document.querySelector(".contact-form")
  form.appendChild(successMessage)

  // Remove message after 5 seconds
  setTimeout(() => {
    successMessage.remove()
  }, 5000)
}

function initializeFormValidation() {
  const form = document.querySelector(".contact-form")
  if (!form) return

  const inputs = form.querySelectorAll("input[required], textarea[required]")

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      clearFieldError(this)
    })
  })
}

function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name

  // Remove existing error
  clearFieldError(field)

  // Check if required field is empty
  if (field.hasAttribute("required") && !value) {
    showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`)
    return false
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      showFieldError(field, "Please enter a valid email address")
      return false
    }
  }

  return true
}

function showFieldError(field, message) {
  const errorElement = document.createElement("div")
  errorElement.className = "field-error"
  errorElement.style.color = "#ef4444"
  errorElement.style.fontSize = "0.875rem"
  errorElement.style.marginTop = "0.25rem"
  errorElement.textContent = message

  field.parentNode.appendChild(errorElement)
  field.style.borderColor = "#ef4444"
}

function clearFieldError(field) {
  const errorElement = field.parentNode.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
  field.style.borderColor = ""
}

// Loading animations
function addLoadingAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded")
      }
    })
  }, observerOptions)

  // Add loading class to elements and observe them
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .testimonial-card, .tip-card, .about-content, .about-image",
  )

  elementsToAnimate.forEach((element) => {
    element.classList.add("loading")
    observer.observe(element)
  })
}

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  // Gallery navigation with arrow keys
  if (event.key === "ArrowLeft") {
    const gallerySection = document.getElementById("gallery")
    if (isElementInViewport(gallerySection)) {
      prevGalleryImage()
    }
  } else if (event.key === "ArrowRight") {
    const gallerySection = document.getElementById("gallery")
    if (isElementInViewport(gallerySection)) {
      nextGalleryImage()
    }
  }

  // Tab navigation
  if (event.key === "Tab" && event.target.classList.contains("tab-button")) {
    event.preventDefault()
    const buttons = document.querySelectorAll(".tab-button")
    const currentIndex = Array.from(buttons).indexOf(event.target)
    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + buttons.length) % buttons.length
      : (currentIndex + 1) % buttons.length

    buttons[nextIndex].focus()
  }
})

// Utility function to check if element is in viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Touch/swipe support for gallery
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX
})

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX
  handleGallerySwipe()
})

function handleGallerySwipe() {
  const gallerySection = document.getElementById("gallery")
  if (!isElementInViewport(gallerySection)) return

  const swipeThreshold = 50
  const swipeDistance = touchEndX - touchStartX

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      prevGalleryImage()
    } else {
      nextGalleryImage()
    }
  }
}

// Resize handler for responsive behavior
window.addEventListener("resize", () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && mobileMenuOpen) {
    toggleMobileMenu()
  }
})

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  // Add smooth scroll polyfill for older browsers
  const smoothScrollPolyfill = (target, duration = 800) => {
    const targetPosition = target.offsetTop - document.querySelector(".navbar").offsetHeight
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Override scrollToSection for older browsers
  window.scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      smoothScrollPolyfill(element)
    }
  }
}


