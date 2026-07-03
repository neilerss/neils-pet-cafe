const loginScreen = document.querySelector("#login-screen");
const registerScreen = document.querySelector("#register-screen");
const screenButtons = document.querySelectorAll("[data-screen]");
const authForms = document.querySelectorAll(".auth-form");

screenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const shouldShowRegister = button.dataset.screen === "register";

    loginScreen?.classList.toggle("hidden", shouldShowRegister);
    registerScreen?.classList.toggle("hidden", !shouldShowRegister);
  });
});

authForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = "dashboard.html";
  });
});

const filterButton = document.querySelector("[data-toggle-filter]");
const filterMenu = document.querySelector("#filter-menu");
const searchWrap = document.querySelector(".search-wrap");
const navItems = document.querySelectorAll(".nav-item");
const functionPanel = document.querySelector("#function-panel");
const featureCards = document.querySelectorAll("[data-feature]");
const goButtons = document.querySelectorAll("[data-go]");
const reservationBooking = document.querySelector(".reservation-booking");
const adminButtons = document.querySelectorAll("[data-admin-panel]");
const adminTitle = document.querySelector("#admin-panel-title");
const adminContent = document.querySelector("#admin-content");

const panelText = {
  home: {
    title: "Dashboard/Home",
    copy: "Your main cafe dashboard with quick access to reservations, menu, pets, announcements, and orders.",
  },
  calendar: {
    title: "Calendar/Reservation",
    copy: "Reservation tools will go here, including available dates, time slots, and booking details.",
  },
  menu: {
    title: "Menu",
    copy: "Food, drinks, pet treats, and cafe specials can be shown from this section.",
  },
  announcements: {
    title: "Announcements",
    copy: "Cafe updates, events, promos, and adoption notices can be managed here.",
  },
  activity: {
    title: "My Activity/Orders",
    copy: "Customer orders, booking history, saved pets, and recent activity can be tracked here.",
  },
  pets: {
    title: "Check Out Our Pets",
    copy: "This flashcard can lead to the pet gallery, pet profiles, adoption interest, and visit schedules later.",
  },
  reservation: {
    title: "Reserve A Spot",
    copy: "This flashcard can open booking steps for cafe seats, pet visits, and special events later.",
  },
};

function setPanel(key) {
  if (!functionPanel || !panelText[key]) {
    return;
  }

  functionPanel.innerHTML = `<h2>${panelText[key].title}</h2><p>${panelText[key].copy}</p>`;
}

filterButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  filterMenu?.classList.toggle("hidden");
});

searchWrap?.addEventListener("click", () => {
  filterMenu?.classList.remove("hidden");
});

document.addEventListener("click", (event) => {
  if (!searchWrap?.contains(event.target)) {
    filterMenu?.classList.add("hidden");
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");
    setPanel(item.dataset.panel);
  });
});

featureCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.dataset.feature === "pets") {
      window.location.href = "pets.html";
      return;
    }

    setPanel(card.dataset.feature);
  });
});

goButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = button.dataset.go;
  });
});

reservationBooking?.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = "reservation-confirmation.html";
});

const adminPanels = {
  dashboard: "Dashboard",
  users: "User Management",
  records: "System Records",
  reports: "Reports",
  settings: "Settings",
  approvals: "Approvals",
};

adminButtons.forEach((button) => {
  button.addEventListener("click", () => {
    adminButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const title = adminPanels[button.dataset.adminPanel] || "Dashboard";
    if (adminTitle) {
      adminTitle.textContent = title;
    }

    if (adminContent && button.dataset.adminPanel !== "dashboard") {
      adminContent.querySelector(".admin-grid")?.scrollIntoView({ block: "start" });
    }
  });
});