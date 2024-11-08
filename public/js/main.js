// Initialize map for nearby cinemas
function initMap() {
    if (!document.getElementById('map')) return;

    const map = L.map('map').setView([52.520008, 13.404954], 13); // Berlin coordinates
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Berlin cinema locations
    const cinemas = [
        { name: "CineStar Original", lat: 52.520008, lng: 13.404954 },
        { name: "Zoo Palast", lat: 52.506335, lng: 13.337773 },
        { name: "Kino International", lat: 52.520431, lng: 13.419839 },
        { name: "Babylon", lat: 52.527147, lng: 13.412247 },
        { name: "Delphi Filmpalast", lat: 52.504897, lng: 13.320897 }
    ];

    // Add markers for each cinema
    cinemas.forEach(cinema => {
        L.marker([cinema.lat, cinema.lng])
            .bindPopup(`<b>${cinema.name}</b>`)
            .addTo(map);
    });

    // Force a map resize after initialization to ensure proper rendering
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initMap);

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}