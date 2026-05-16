document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('roomId');

    if (!roomId) {
        document.getElementById('reservation-form').innerHTML = '<p>Error: Room not specified.</p>';
        return;
    }

    // Set the hidden input value
    document.getElementById('roomId').value = roomId;

    const form = document.getElementById('reservation-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        try {
            const response = await fetch('http://localhost:3000/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerName,
                    email,
                    phone,
                    roomId
                })
            });

            if (response.ok) {
                alert('Reservation confirmed successfully!');
                window.location.href = 'index.html'; // Redirect after success
            } else {
                const error = await response.json();
                alert(`Reservation failed: ${error.error}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect to the server.');
        }
    });
});