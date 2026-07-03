document.addEventListener("DOMContentLoaded", function() {

    // ============================================
    // AUTHENTICATION PAGES (Login/Registration)
    // ============================================
    
    const loginScreen = document.querySelector("#login-screen");
    const registerScreen = document.querySelector("#register-screen");
    const screenButtons = document.querySelectorAll("[data-screen]");
    const authForms = document.querySelectorAll(".auth-form");
    const messageButtons = document.querySelectorAll("[data-message]");

    screenButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const shouldShowRegister = button.dataset.screen === "register";
            if (loginScreen) loginScreen.classList.toggle("hidden", shouldShowRegister);
            if (registerScreen) registerScreen.classList.toggle("hidden", !shouldShowRegister);
        });
    });

    authForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            window.location.href = "dashboard.html";
        });
    });

    messageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showFeedback(button.dataset.message || "Action recorded");
        });
    });

    // ============================================
    // DASHBOARD & USER PAGES (Dashboard, Reservation, etc.)
    // ============================================
    
    const filterButton = document.querySelector("[data-toggle-filter]");
    const alertButtons = document.querySelectorAll(".alert-button");
    const filterMenu = document.querySelector("#filter-menu");
    const searchWrap = document.querySelector(".search-wrap");
    const dashboardSearch = document.querySelector("#dashboard-search");
    const searchResults = document.querySelector("#search-results");
    const navItems = document.querySelectorAll(".nav-item");
    const functionPanel = document.querySelector("#function-panel");
    const featureCards = document.querySelectorAll("[data-feature]");
    const goButtons = document.querySelectorAll("[data-go]");
    const reservationBooking = document.querySelector(".reservation-booking");
    const adminButtons = document.querySelectorAll("[data-admin-panel]");
    const adminTitle = document.querySelector("#admin-panel-title");
    const adminContent = document.querySelector("#admin-content");

    const dashboardSearchItems = [
        { title: "Calendar/Reservation", description: "Reserve a spot, choose a date, and view booking details.", href: "reservation.html", keywords: "calendar reservation reserve booking date time guests visit spot" },
        { title: "Menu", description: "Coffee, non-coffee drinks, snacks, and cafe specials.", href: "menu.html", keywords: "menu coffee non-coffee americano cappucino espresso drinks food snacks" },
        { title: "Check Out Our Pets", description: "View pet profiles including Mr. Silly, Bob, MingMing, Whitey, Pedro, and Browney.", href: "pets.html", keywords: "pets pet cats dogs mr silly bob mingming whitey pedro browney adoption" },
        { title: "Announcements", description: "Pinned updates, holiday hours, promos, events, and new menu notices.", href: "announcements.html", keywords: "announcements pinned recent holiday hours labor day adoption drive promo student discount events" },
        { title: "My Activity/Orders", description: "See reservations, upcoming visits, completed bookings, cancelled bookings, and orders.", href: "activity.html", keywords: "activity orders reservation history upcoming completed cancelled res order" },
        { title: "Profile Settings", description: "Edit profile, change password, and notification preferences.", href: "profile.html", keywords: "profile settings account edit password notification preferences" },
    ];

    const panelText = {
        home: { title: "Dashboard/Home", copy: "Your main cafe dashboard with quick access to reservations, menu, pets, announcements, and orders." },
        calendar: { title: "Calendar/Reservation", copy: "Reservation tools will go here, including available dates, time slots, and booking details." },
        menu: { title: "Menu", copy: "Food, drinks, pet treats, and cafe specials can be shown from this section." },
        announcements: { title: "Announcements", copy: "Cafe updates, events, promos, and adoption notices can be managed here." },
        activity: { title: "My Activity/Orders", copy: "Customer orders, booking history, saved pets, and recent activity can be tracked here." },
        pets: { title: "Check Out Our Pets", copy: "This flashcard can lead to the pet gallery, pet profiles, adoption interest, and visit schedules later." },
        reservation: { title: "Reserve A Spot", copy: "This flashcard can open booking steps for cafe seats, pet visits, and special events later." },
    };

    function setPanel(key) {
        if (!functionPanel || !panelText[key]) return;
        functionPanel.innerHTML = `<h2>${panelText[key].title}</h2><p>${panelText[key].copy}</p>`;
    }

    // --- Sidebar navigation (ONLY if navItems exist) ---
    if (navItems.length > 0) {
        navItems.forEach((item) => {
            item.addEventListener("click", () => {
                navItems.forEach((nav) => nav.classList.remove("active"));
                item.classList.add("active");
                setPanel(item.dataset.panel);
            });
        });
    }

    // --- Feature cards (ONLY if they exist) ---
    if (featureCards.length > 0) {
        featureCards.forEach((card) => {
            card.addEventListener("click", () => {
                if (card.dataset.feature === "pets") {
                    window.location.href = "pets.html";
                    return;
                }
                setPanel(card.dataset.feature);
            });
        });
    }

    // --- "Go to" buttons ---
    if (goButtons.length > 0) {
        goButtons.forEach((button) => {
            button.addEventListener("click", () => {
                window.location.href = button.dataset.go;
            });
        });
    }

    // --- Filter menu (ONLY if search elements exist) ---
    if (filterButton && filterMenu) {
        filterButton.addEventListener("click", (event) => {
            event.stopPropagation();
            filterMenu.classList.toggle("hidden");
        });
    }

    if (searchWrap && filterMenu) {
        searchWrap.addEventListener("click", () => {
            filterMenu.classList.remove("hidden");
        });
    }

    document.addEventListener("click", (event) => {
        if (searchWrap && filterMenu && searchResults) {
            if (!searchWrap.contains(event.target)) {
                filterMenu.classList.add("hidden");
                searchResults.classList.add("hidden");
            }
        }
    });

    // --- Filter buttons ---
    const filterButtons = document.querySelectorAll("[data-filter]");
    if (filterButtons.length > 0 && dashboardSearch) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                dashboardSearch.value = btn.dataset.filter === "non-coffee" ? "non-coffee" : "coffee";
                renderSearchResults(dashboardSearch.value);
                if (filterMenu) filterMenu.classList.add("hidden");
            });
        });
    }

    function renderSearchResults(query) {
        if (!searchResults) return;
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            searchResults.classList.add("hidden");
            searchResults.innerHTML = "";
            return;
        }
        const matches = dashboardSearchItems.filter((item) => {
            const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
        searchResults.classList.remove("hidden");
        searchResults.innerHTML = matches.length
            ? matches.map((item) => `
                <button class="search-result" type="button" data-href="${item.href}">
                    <strong>${item.title}</strong>
                    <span>${item.description}</span>
                </button>
            `).join("")
            : `<div class="search-empty">No matching page or item found.</div>`;
    }

    if (dashboardSearch) {
        dashboardSearch.addEventListener("input", () => {
            renderSearchResults(dashboardSearch.value);
        });
        dashboardSearch.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            const firstResult = searchResults?.querySelector(".search-result");
            if (firstResult) {
                window.location.href = firstResult.dataset.href;
            }
        });
    }

    if (searchResults) {
        searchResults.addEventListener("click", (event) => {
            const result = event.target.closest(".search-result");
            if (result) {
                window.location.href = result.dataset.href;
            }
        });
    }

    // --- Reservation form ---
    if (reservationBooking) {
        reservationBooking.addEventListener("submit", (event) => {
            event.preventDefault();
            window.location.href = "reservation-confirmation.html";
        });
    }

    // --- Admin panel switching ---
    const adminPanels = {
        dashboard: "Dashboard",
        users: "User Management",
        records: "System Records",
        reports: "Reports",
        settings: "Settings",
        approvals: "Approvals",
    };

    if (adminButtons.length > 0) {
        adminButtons.forEach((button) => {
            button.addEventListener("click", () => {
                adminButtons.forEach((item) => item.classList.remove("active"));
                button.classList.add("active");
                const title = adminPanels[button.dataset.adminPanel] || "Dashboard";
                if (adminTitle) adminTitle.textContent = title;
                if (adminContent && button.dataset.adminPanel !== "dashboard") {
                    adminContent.querySelector(".admin-grid")?.scrollIntoView({ block: "start" });
                }
            });
        });
    }

    // ============================================
    // ADMIN FEATURES (Approvals, Records, Settings, Reports)
    // ============================================
    
    const adminActionButtons = document.querySelectorAll(
        "[data-admin-action], .save-btn, .danger-row button, .report-generator button, .approval-row button, .admin-card-head button, .admin-bell"
    );
    const adminToggles = document.querySelectorAll(".toggle-row span");
    const adminSearchInputs = document.querySelectorAll(".admin-tool-row input[type='search']");
    const adminFilterSelects = document.querySelectorAll(".admin-tool-row select");
    const menuTabButtons = document.querySelectorAll(".menu-tabs button");
    const profileForms = document.querySelectorAll(".settings-card form, .reservation-form:not(.reservation-booking)");

    function showFeedback(message) {
        let feedback = document.querySelector(".app-feedback");
        if (!feedback) {
            feedback = document.createElement("div");
            feedback.className = "app-feedback";
            document.body.appendChild(feedback);
        }
        feedback.textContent = message;
        feedback.classList.remove("hidden");
        window.clearTimeout(showFeedback.timer);
        showFeedback.timer = window.setTimeout(() => {
            feedback.classList.add("hidden");
        }, 1800);
    }

    if (adminActionButtons.length > 0) {
        adminActionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const action = button.dataset.adminAction || button.textContent.trim() || button.getAttribute("aria-label") || "Button";
                const row = button.closest(".approval-row");
                if (row && /approve/i.test(action)) {
                    row.classList.add("row-approved");
                    row.classList.remove("row-rejected");
                }
                if (row && /reject/i.test(action)) {
                    row.classList.add("row-rejected");
                    row.classList.remove("row-approved");
                }
                showFeedback(`${action} action recorded`);
            });
        });
    }

    if (adminToggles.length > 0) {
        adminToggles.forEach((toggle) => {
            toggle.addEventListener("click", () => {
                toggle.classList.toggle("is-on");
                showFeedback(toggle.classList.contains("is-on") ? "Setting enabled" : "Setting disabled");
            });
        });
    }

    function filterAdminTable(control) {
        const card = control.closest(".admin-card");
        const table = card?.querySelector(".admin-data-table tbody");
        if (!table) return;
        const searchValue = card.querySelector(".admin-tool-row input[type='search']")?.value.trim().toLowerCase() || "";
        const selectValues = Array.from(card.querySelectorAll(".admin-tool-row select"))
            .map((select) => select.value.trim().toLowerCase())
            .filter((value) => value && !value.startsWith("all "));
        Array.from(table.rows).forEach((row) => {
            const rowText = row.textContent.toLowerCase();
            const matchesSearch = !searchValue || rowText.includes(searchValue);
            const matchesSelects = selectValues.every((value) => rowText.includes(value));
            row.hidden = !(matchesSearch && matchesSelects);
        });
    }

    if (adminSearchInputs.length > 0) {
        adminSearchInputs.forEach((input) => {
            input.addEventListener("input", () => filterAdminTable(input));
        });
    }

    if (adminFilterSelects.length > 0) {
        adminFilterSelects.forEach((select) => {
            select.addEventListener("change", () => filterAdminTable(select));
        });
    }

    // --- Menu tabs ---
    if (menuTabButtons.length > 0) {
        menuTabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                menuTabButtons.forEach((item) => item.classList.remove("active"));
                button.classList.add("active");
                showFeedback(`${button.textContent.trim()} selected`);
            });
        });
    }

    // --- Profile forms ---
    if (profileForms.length > 0) {
        profileForms.forEach((form) => {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                showFeedback("Changes saved");
            });
        });
    }

    // --- Alert buttons ---
    if (alertButtons.length > 0) {
        alertButtons.forEach((button) => {
            button.addEventListener("click", () => {
                showFeedback("No new notifications");
            });
        });
    }

    // --- Set initial dashboard panel (ONLY if panel exists) ---
    if (functionPanel) {
        setPanel("home");
    }

    console.log("Neil's Pet Cafe - Script loaded successfully!");
});