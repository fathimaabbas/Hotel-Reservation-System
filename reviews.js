const hotelsContainer = document.getElementById('hotelsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const backendURL = 'http://localhost:3000';

// Fetch and display hotels
async function loadHotels(search='') {
    try {
        const url = search ? `${backendURL}/hotels?search=${encodeURIComponent(search)}` : `${backendURL}/hotels`;
        const res = await fetch(url);
        const hotels = await res.json();
        displayHotels(hotels);
    } catch (err) {
        console.error(err);
    }
}

// Display hotels with reviews
function displayHotels(hotels) {
    hotelsContainer.innerHTML = '';
    if(hotels.length === 0){
        hotelsContainer.innerHTML = '<p>No hotels found.</p>';
        return;
    }
    hotels.forEach(hotel => {
        const hotelDiv = document.createElement('div');
        hotelDiv.classList.add('hotel-card');
        hotelDiv.innerHTML = `
            <h2>${hotel.HotelName}</h2>
            <p><strong>Location:</strong> ${hotel.Location}</p>
            <p><strong>Email:</strong> ${hotel.Email}</p>
            <p><strong>Phone:</strong> ${hotel.Phone}</p>
            <p><strong>Average Rating:</strong> ${hotel.rating ? hotel.rating : 'N/A'}</p>
            <div class="review-section" id="reviews-${hotel.Hotelid}">
                <h3>Reviews:</h3>
            </div>
            <div class="review-form">
                <input type="text" placeholder="Your review" id="comment-${hotel.Hotelid}">
                <select id="rating-${hotel.Hotelid}">
                    <option value="">Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button onclick="submitReview('${hotel.Hotelid}')">Submit</button>
            </div>
        `;
        hotelsContainer.appendChild(hotelDiv);
        loadReviews(hotel.Hotelid);
    });
}

// Fetch reviews for a hotel
async function loadReviews(hotelId) {
    try {
        const res = await fetch(`${backendURL}/reviews?hotelId=${hotelId}`);
        const reviews = await res.json();
        const reviewsDiv = document.getElementById(`reviews-${hotelId}`);
        if(reviews.length === 0){
            reviewsDiv.innerHTML += '<p>No reviews yet.</p>';
            return;
        }
        reviews.forEach(r => {
            const rDiv = document.createElement('div');
            rDiv.classList.add('review-card');
            rDiv.innerHTML = `<p>${r.Comment}</p><p>Rating: ${r.Rating}</p>`;
            reviewsDiv.appendChild(rDiv);
        });
    } catch (err) {
        console.error(err);
    }
}

// Submit a new review
async function submitReview(hotelId){
    const commentInput = document.getElementById(`comment-${hotelId}`);
    const ratingSelect = document.getElementById(`rating-${hotelId}`);
    const comment = commentInput.value.trim();
    const rating = ratingSelect.value;

    if(!comment || !rating){
        alert('Please enter comment and rating.');
        return;
    }

    try{
        await fetch(`${backendURL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hotelId, comment, rating })
        });
        commentInput.value = '';
        ratingSelect.value = '';
        document.getElementById(`reviews-${hotelId}`).innerHTML = '<h3>Reviews:</h3>'; // clear old reviews
        loadReviews(hotelId); // reload
    } catch(err){
        console.error(err);
        alert('Failed to submit review.');
    }
}

// Search functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    loadHotels(query);
});

// Load all hotels initially
loadHotels();