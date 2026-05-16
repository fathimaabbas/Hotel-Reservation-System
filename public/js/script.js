document.addEventListener('DOMContentLoaded', () => {
    // This is the URL of your backend API endpoint for all hotels
    const backendURL = 'http://localhost:3000/hotels-rating';

    // Use the fetch API to get data from your backend
    fetch(backendURL)
        .then(response => {
            // Check if the response was successful (e.g., status 200 OK)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON data from the response
            return response.json();
        })
        .then(data => {
            // Get the HTML container where you'll display the hotels
            const hotelsGrid = document.getElementById('hotels-grid');

            // Loop through each hotel in the data array
            data.forEach(hotel => {
                const ratingDisplay = hotel.rating ? hotel.rating : 'N/A';
                const reviewCountDisplay = hotel.ReviewCount ? `(${hotel.ReviewCount} reviews)` : '';
                // Create a string of HTML for a single hotel card
                const hotelCard = `
                    <div class="hotel-card">
                        <div class="hotel-img-container">
                            <img src="${hotel.ImageUrl}" alt="${hotel.HotelName}">
                        </div>
                        <div class="hotel-info">
                            <div class="rating-review-section">
                                <span class="rating-badge">${ratingDisplay}</span>
                                <span class="review-text">${reviewCountDisplay}</span>
                            </div>
                            <h3 class="hotel-name">${hotel.HotelName}</h3>
                            <p class="hotel-location">${hotel.Location}</p>
                            </div>
                    </div>
                `;


                // Add the new hotel card HTML to the grid container
                hotelsGrid.innerHTML += hotelCard;
            });
        })
        .catch(error => {
            // Log any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
            hotelsGrid.innerHTML = '<p>Could not load hotels. Please try again later.</p>';
        });

        //Hotel list search
    if (window.location.pathname.endsWith('search.html')) {
    // Handle form submission for new searches
    const form = document.querySelector('#search-bar form');

    // Get query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const location = params.get('location') || '';
    const roomtype = params.get('roomtype') || '';

    // Fetch hotels matching the search
    fetch(`http://localhost:3000/search?location=${encodeURIComponent(location)}&roomtype=${encodeURIComponent(roomtype)}`)
        .then(response => response.json())
        .then(hotels => {
            const hotelList = document.getElementById('hotel-list');
            hotelList.innerHTML = '';

            if (!hotels.length) {
                hotelList.innerHTML = '<p>No hotels found.</p>';
                return;
            }

            hotels.forEach(hotel => {

                const div = document.createElement('div');
                div.classList.add('hotel-card');
                div.innerHTML = `
                    <img src="${hotel.ImageUrl}" alt="${hotel.HotelName}" class="hotel-img"/>
                    <h3>${hotel.HotelName}</h3>
                    <p><b>Location:</b> ${hotel.Location}</p>
                    <p><b>Email:</b> ${hotel.Email}</p>
                    <p><b>Phone:</b> ${hotel.Phone}</p>
                `;

                // --- Click to go to room page (roomType optional) ---
                div.addEventListener('click', () => {
                    window.location.href = `roomtype.html?hotelId=${hotel.Hotelid}&hotelName=${encodeURIComponent(hotel.HotelName)}`;
                });

                hotelList.appendChild(div);
            });
        })
        .catch(error => {
            document.getElementById('hotel-list').innerHTML = '<p>Error loading hotels.</p>';
            console.error(error);
        });
    }
});



function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('show');
}