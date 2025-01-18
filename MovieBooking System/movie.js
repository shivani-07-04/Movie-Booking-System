// Movie and Seat Selection Logic
const movieCards = document.querySelectorAll('.movie-card');
const seatSelection = document.getElementById('seatSelection');
const seatMap = document.getElementById('seatMap');
const selectedMovieName = document.getElementById('selectedMovieName');
const totalPriceSpan = document.getElementById('totalPrice');
const bookTicketBtn = document.getElementById('bookTicketBtn');
const bookingConfirmation = document.getElementById('bookingConfirmation');
const ticketDetails = document.getElementById('ticketDetails');

let selectedMovie = null;
let selectedSeats = [];

// Generate Seat Map
function generateSeatMap() {
    for (let i = 0; i < 64; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat', 'bg-blue-200', 'p-2', 'text-center', 'rounded');
        seat.textContent = String.fromCharCode(65 + Math.floor(i / 8)) + (i % 8 + 1);
        
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
                updateSelectedSeats();
            }
        });

        seatMap.appendChild(seat);
    }
}

// Update Selected Seats
function updateSelectedSeats() {
    selectedSeats = Array.from(document.querySelectorAll('.seat.selected'));
    const moviePrice = selectedMovie ? parseInt(selectedMovie.dataset.price) : 0;
    const totalPrice = selectedSeats.length * moviePrice;
    totalPriceSpan.textContent = totalPrice;
}

// Movie Selection Event Listeners
movieCards.forEach(card => {
    card.addEventListener('click', () => {
        selectedMovie = card;
        selectedMovieName.textContent = card.dataset.movie;
        document.getElementById('movieSelection').classList.add('hidden');
        seatSelection.classList.remove('hidden');
    });
});

// Book Ticket Button
bookTicketBtn.addEventListener('click', () => {
    if (selectedSeats.length > 0) {
        const seatNumbers = selectedSeats.map(seat => seat.textContent);
        
        ticketDetails.innerHTML = `
            <h3 class="text-xl font-bold">Ticket Details</h3>
            <p>Movie: ${selectedMovie.dataset.movie}</p>
            <p>Seats: ${seatNumbers.join(', ')}</p>
            <p>Total Price: ₹${totalPriceSpan.textContent}</p>
            <p>Booking Time: ${new Date().toLocaleString()}</p>
        `;

        seatSelection.classList.add('hidden');
        bookingConfirmation.classList.remove('hidden');

        // Save booking to local storage
        saveBookingToLocalStorage({
            movie: selectedMovie.dataset.movie,
            seats: seatNumbers,
            price: totalPriceSpan.textContent,
            time: new Date().toLocaleString()
        });
    } else {
        alert('Please select at least one seat!');
    }
});

// Save Booking to Local Storage
function saveBookingToLocalStorage(bookingData) {
    let bookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('movieBookings', JSON.stringify(bookings));
}

// Initialize
generateSeatMap();