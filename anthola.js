document.addEventListener('DOMContentLoaded', function() {
    // Navigation Bar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Booking Form
    const fromInput = document.querySelector('#from');
    const toInput = document.querySelector('#to');
    const departureInput = document.querySelector('#departure');
    const returnInput = document.querySelector('#return');
    const passengersSelect = document.querySelector('#passengers');
    const findTripsButton = document.querySelector('.btn-primary');

    // Destination Suggestions
    const cities = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
        'Bali', 'Santorini', 'Kyoto', 'Paris'
    ];

    // Create datalists for suggestions
    const fromDatalist = document.createElement('datalist');
    fromDatalist.id = 'from-suggestions';
    const toDatalist = document.createElement('datalist');
    toDatalist.id = 'to-suggestions';
    cities.forEach(city => {
        const optionFrom = document.createElement('option');
        optionFrom.value = city;
        fromDatalist.appendChild(optionFrom);
        const optionTo = document.createElement('option');
        optionTo.value = city;
        toDatalist.appendChild(optionTo);
    });
    document.body.appendChild(fromDatalist);
    document.body.appendChild(toDatalist);
    fromInput.setAttribute('list', 'from-suggestions');
    toInput.setAttribute('list', 'to-suggestions');

    // Validate and handle form submission
    findTripsButton.addEventListener('click', function() {
        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        const departure = departureInput.value;
        const returnDate = returnInput.value;
        const passengers = passengersSelect.value;
        if (!from || !to || !departure) {
            alert('Please fill in all required fields.');
            return;
        }
        if (!cities.includes(from) || !cities.includes(to)) {
            alert('Please select valid destinations from the suggestions.');
            return;
        }
        console.log(`Searching trips from ${from} to ${to} on ${departure} for ${passengers} passengers. Return: ${returnDate || 'N/A'}`);
    });

    // Live Seat Availability
    const seatButtons = document.querySelectorAll('.seat');
    let selectedSeats = 0;
    const selectedSeatsText = document.querySelector('.selected-seats');
    const bookSeatsButton = document.querySelector('.btn-success');
    const adminModeToggle = document.querySelector('#admin-mode-toggle');
    let isAdminMode = false;
    const adminPassword = 'admin123'; // Simple password for demo (use proper auth in production)

    // Function to randomly update seat occupancy
    function updateSeatOccupancy() {
        seatButtons.forEach(button => {
            // Skip seats that are selected, premium, or admin-locked
            if (button.classList.contains('selected') || 
                button.classList.contains('premium') || 
                button.dataset.adminLocked === 'true') {
                return;
            }
            // Randomly mark some seats as occupied (30% chance)
            if (Math.random() < 0.3) {
                button.classList.remove('available');
                button.classList.add('occupied');
            } else {
                button.classList.remove('occupied');
                button.classList.add('available');
            }
        });
    }

    // Initial seat occupancy update
    updateSeatOccupancy();

    // Periodically update seat occupancy (every 10 seconds)
    let occupancyInterval = setInterval(updateSeatOccupancy, 10000);

    // Admin Mode Toggle
    adminModeToggle.addEventListener('click', function() {
        const password = prompt('Enter admin password:');
        if (password === adminPassword) {
            isAdminMode = !isAdminMode;
            adminModeToggle.textContent = isAdminMode ? 'Exit Admin Mode' : 'Toggle Admin Mode';
            alert(isAdminMode ? 'Admin mode enabled. Click seats to toggle occupancy.' : 'Admin mode disabled.');
            // Pause random updates in admin mode
            if (isAdminMode) {
                clearInterval(occupancyInterval);
            } else {
                occupancyInterval = setInterval(updateSeatOccupancy, 10000);
            }
        } else {
            alert('Invalid password.');
        }
    });

    // Seat selection and admin update logic
    seatButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isAdminMode) {
                // Admin can toggle between occupied and available
                if (this.classList.contains('selected') || this.classList.contains('premium')) {
                    alert('Cannot modify selected or premium seats.');
                    return;
                }
                if (this.classList.contains('occupied')) {
                    this.classList.remove('occupied');
                    this.classList.add('available');
                    this.dataset.adminLocked = 'true'; // Lock seat from random updates
                } else if (this.classList.contains('available')) {
                    this.classList.remove('available');
                    this.classList.add('occupied');
                    this.dataset.adminLocked = 'true'; // Lock seat from random updates
                }
                console.log(`Admin updated seat ${this.textContent} to ${this.classList.contains('occupied') ? 'occupied' : 'available'}`);
            } else {
                // Regular user seat selection
                if (this.classList.contains('available')) {
                    this.classList.toggle('selected');
                    selectedSeats = this.classList.contains('selected') ? selectedSeats + 1 : selectedSeats - 1;
                    selectedSeatsText.textContent = `${selectedSeats} seats selected`;
                } else if (this.classList.contains('occupied')) {
                    alert('This seat is already occupied.');
                } else if (this.classList.contains('premium')) {
                    alert('This is a premium seat. Additional charges may apply.');
                }
            }
        });
    });

    bookSeatsButton.addEventListener('click', function() {
        if (selectedSeats === 0) {
            alert('Please select at least one seat.');
            return;
        }
        alert(`Booking ${selectedSeats} seats.`);
    });

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-email');

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        if (!email) {
            alert('Please enter your email.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        alert('Subscribed successfully!');
        emailInput.value = '';
    });

    // Additional Interactive Elements
    const exploreButtons = document.querySelectorAll('.explore-button');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destination = this.closest('.destination-card').querySelector('h3').textContent;
            console.log(`Exploring ${destination}`);
        });
    });

    const viewAllDestinationsButton = document.querySelector('.view-all-destinations');
    viewAllDestinationsButton.addEventListener('click', function() {
        console.log('Viewing all destinations');
    });

    const bookNowButton = document.querySelector('.book-now');
    bookNowButton.addEventListener('click', function() {
        document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
    });

    const learnMoreButton = document.querySelector('.learn-more');
    learnMoreButton.addEventListener('click', function() {
        console.log('Learning more about Anthola');
    });
    
});
const adminModeToggle = document.querySelector('#admin-mode-toggle');
adminModeToggle.addEventListener('click', function() {
    const password = prompt('Enter admin password:');
    if (password === adminPassword) {
        isAdminMode = !isAdminMode;
        adminModeToggle.textContent = isAdminMode ? 'Exit Admin Mode' : 'Toggle Admin Mode';
        alert(isAdminMode ? 'Admin mode enabled. Click seats to toggle occupancy.' : 'Admin mode disabled.');
        if (isAdminMode) {
            clearInterval(occupancyInterval);
        } else {
            occupancyInterval = setInterval(updateSeatOccupancy, 10000);
        }
    } else {
        alert('Invalid password.');
    }
});