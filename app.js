// =====================
// PORTFOLIO PROJECT DATA
// =====================
const portfolioProjects = [
  { title: 'Logo Design', category: 'mobile', image: 'home pageee.png' },
  { title: 'Name Project', category: 'website', image: 'portfolio-3.jpg' },
  { title: 'Branding', category: 'desktop', image: 'Artboard 1-8.png' },
  { title: 'Name Project', category: 'branding', image: 'Artboard4-8.png' },
  { title: 'Name Project', category: 'mobile', image: 'Two (1).jpg' },
  { title: 'Name Project', category: 'mobile', image: 'iOS Mobile 1 (1).jpg' },
  { title: 'Name Project', category: 'mobile', image: 'Home page (1).png' },
  { title: 'Name Project', category: 'mobile', image: 'Splash Screen (2).jpg' },
  { title: 'Name Project', category: 'website', image: 'WhatsApp Image 2024-06-21 at 15.19.48 (1).jpeg' },
  { title: 'Name Project', category: 'desktop', image: 'Artboard 155-8.png' },
  { title: 'Name Project', category: 'branding', image: 'eqabo-8.png' },
  { title: 'Name Project', category: 'branding', image: 'Artboard-2-8.png' },
  { title: 'Name Project', category: 'branding', image: 'sadex-8.png' },
  { title: 'Name Project', category: 'branding', image: 'Artboard 14-8.png' },
  { title: 'Name Project', category: 'mobile', image: 'hmn.png' },
  { title: 'Name Project', category: 'website', image: 'Screenshot 2026-02-03 151439.png' },
  { title: 'Name Project', category: 'desktop', image: 'shantaban-8.png' },
  { title: 'Name Project', category: 'desktop', image: 'Artboard 15-8.png' },
  { title: 'Name Project', category: 'desktop', image: '472470026_476472912149365_3613852240761454143_n.jpg' },
];

// =====================
// MENU TOGGLE
// =====================
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

// =====================
// PORTFOLIO RENDER FUNCTION
// =====================
function renderPortfolio(filter = "all") {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered =
    filter === "all"
      ? portfolioProjects
      : portfolioProjects.filter(project => project.category === filter);

  filtered.forEach(project => {
    const card = document.createElement("div");
    card.className = "portfolio-card";

    card.innerHTML = `
      <img src="img/${project.image}" alt="${project.title}">
      <div class="portfolio-overlay">
        <div class="portfolio-title">${project.title}</div>
        <div class="portfolio-category">${project.category}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Portfolio Filters
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    renderPortfolio(this.dataset.filter);
  });
});

// =====================
// CONTACT FORM LOGIC
// =====================
const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactService = document.getElementById("contactService");
const contactMessageText = document.getElementById("contactMessageText");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const serviceError = document.getElementById("serviceError");
const messageError = document.getElementById("messageError");

const successMessage = document.getElementById("successMessage");
const contactList = document.getElementById("contactList");
const whatsappBtn = document.getElementById("whatsappBtn");

// Array for messages (NO localStorage so refresh clears it)
let messages = [];

function showError(input, errorElement, message) {
  errorElement.style.display = "block";
  errorElement.textContent = message;
  input.style.border = "1px solid var(--destructive)";
}

function clearError(input, errorElement) {
  errorElement.style.display = "none";
  errorElement.textContent = "";
  input.style.border = "1px solid var(--border)";
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function displayMessages() {
  // Hide Recent if no messages
  if (messages.length === 0) {
    contactList.innerHTML = "";
    contactList.style.display = "none";
    whatsappBtn.style.display = "none";
    return;
  }

  // Show Recent Section
  contactList.style.display = "block";

  // Fade Animation Restart
  contactList.classList.remove("fade-in");
  void contactList.offsetWidth;
  contactList.classList.add("fade-in");

  contactList.innerHTML = `
    <h3 style="margin-bottom: 12px; font-size: 18px; color: var(--primary);">📩 Recent Messages</h3>
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${messages.map(msg => `
        <div style="padding:16px; border-radius:12px; border:1px solid var(--border); background: var(--background);">
          <p style="margin-bottom:6px;"><strong>Name:</strong> ${msg.name}</p>
          <p style="margin-bottom:6px;"><strong>Email:</strong> ${msg.email}</p>
          <p style="margin-bottom:6px;"><strong>Service:</strong> ${msg.service}</p>
          <p><strong>Message:</strong> ${msg.message}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function generateWhatsAppLink(msg) {
  const whatsappMessage =
    `Hello Shagaaza,%0A%0A` +
    `Name: ${msg.name}%0A` +
    `Email: ${msg.email}%0A` +
    `Service: ${msg.service}%0A%0A` +
    `Message: ${msg.message}`;

  return `https://wa.me/252617643972?text=${whatsappMessage}`;
}

// Hide Recent & WhatsApp initially
if (contactList) contactList.style.display = "none";
if (whatsappBtn) whatsappBtn.style.display = "none";

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    successMessage.style.display = "none";
    whatsappBtn.style.display = "none";

    let valid = true;

    // Name Validation
    if (contactName.value.trim() === "") {
      showError(contactName, nameError, "Name is required.");
      valid = false;
    } else if (contactName.value.trim().length < 3) {
      showError(contactName, nameError, "Name must be at least 3 characters.");
      valid = false;
    } else {
      clearError(contactName, nameError);
    }

    // Email Validation
    if (contactEmail.value.trim() === "") {
      showError(contactEmail, emailError, "Email is required.");
      valid = false;
    } else if (!validateEmail(contactEmail.value.trim())) {
      showError(contactEmail, emailError, "Please enter a valid email address.");
      valid = false;
    } else {
      clearError(contactEmail, emailError);
    }

    // Service Validation
    if (contactService.value === "") {
      showError(contactService, serviceError, "Please select a service.");
      valid = false;
    } else {
      clearError(contactService, serviceError);
    }

    // Message Validation
    if (contactMessageText.value.trim() === "") {
      showError(contactMessageText, messageError, "Message cannot be empty.");
      valid = false;
    } else if (contactMessageText.value.trim().length < 10) {
      showError(contactMessageText, messageError, "Message must be at least 10 characters.");
      valid = false;
    } else {
      clearError(contactMessageText, messageError);
    }

    // If valid
    if (valid) {
      const newMessage = {
        name: contactName.value.trim(),
        email: contactEmail.value.trim(),
        service: contactService.value,
        message: contactMessageText.value.trim()
      };

      // Add to recent list
      messages.unshift(newMessage);

      // Display recent messages
      displayMessages();

      // Success message fade
      successMessage.style.display = "block";
      successMessage.classList.remove("fade-in");
      void successMessage.offsetWidth;
      successMessage.classList.add("fade-in");

      // Show WhatsApp button BELOW recent messages
      whatsappBtn.href = generateWhatsAppLink(newMessage);
      whatsappBtn.style.display = "block";
      whatsappBtn.classList.remove("fade-in");
      void whatsappBtn.offsetWidth;
      whatsappBtn.classList.add("fade-in");

      // Reset form
      contactForm.reset();

      // Auto hide success
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    }
  });
}

// =====================
// Price Calculator Cards
// =====================
const priceCards = document.querySelectorAll('.price-card');
const dynamicPriceDiv = document.getElementById('dynamicPrice');
const selectedService = document.getElementById('selectedService');
const priceQuantity = document.getElementById('priceQuantity');
const calculatePrice = document.getElementById('calculatePrice');
const unitPrice = document.getElementById('unitPrice');
const totalPrice = document.getElementById('totalPrice');
const priceResult = document.getElementById('priceResult');
const whatsappPriceBtn = document.getElementById('whatsappPriceBtn');

let currentService = null;
let currentPrice = 0;

// Show quantity input when Add is clicked
priceCards.forEach(card => {
  card.querySelector('.addServiceBtn').addEventListener('click', () => {
    currentService = card.dataset.service;
    currentPrice = parseInt(card.dataset.price);
    selectedService.textContent = `Service Selected: ${currentService}`;
    priceQuantity.value = 1;
    priceResult.style.display = "none";
    whatsappPriceBtn.style.display = "none";
    dynamicPriceDiv.style.display = "block";
    window.scrollTo({ top: dynamicPriceDiv.offsetTop - 100, behavior: 'smooth' });
  });
});

// Calculate Price
if (calculatePrice) {
  calculatePrice.addEventListener('click', () => {
    const quantity = parseInt(priceQuantity.value);

    if (!currentService) {
      alert("Please select a service.");
      return;
    }
    if (!quantity || quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }

    const total = currentPrice * quantity;

    unitPrice.textContent = `Price per item: $${currentPrice}`;
    totalPrice.textContent = `Total Price: $${total}`;
    priceResult.style.display = "block";

    // WhatsApp Link
    const whatsappMessage =
      `Hello Shagaaza,%0A%0A` +
      `I would like to order the following:%0A` +
      `Service: ${currentService}%0A` +
      `Quantity: ${quantity}%0A` +
      `Total Price: $${total}`;

    whatsappPriceBtn.href = `https://wa.me/252617643972?text=${whatsappMessage}`;
    whatsappPriceBtn.style.display = "block";
  });
}



// Live clear errors
contactName.addEventListener("input", () => clearError(contactName, nameError));
contactEmail.addEventListener("input", () => clearError(contactEmail, emailError));
contactService.addEventListener("change", () => clearError(contactService, serviceError));
contactMessageText.addEventListener("input", () => clearError(contactMessageText, messageError));
