// Initialize map for nearby cinemas
function initMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Sample cinema locations
    const cinemas = [
        { name: "Cinema City", lat: 51.505, lng: -0.09 },
        { name: "MoviePlex", lat: 51.51, lng: -0.1 },
        { name: "Star Cinema", lat: 51.498, lng: -0.085 }
    ];

    // Add markers for each cinema
    cinemas.forEach(cinema => {
        L.marker([cinema.lat, cinema.lng])
            .bindPopup(cinema.name)
            .addTo(map);
    });
}

// Initialize map if element exists
if (document.getElementById('map')) {
    initMap();
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}