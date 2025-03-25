document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            // Add form validation and AJAX submission logic here
        });
    }

    // Modal functionality
    const modal = document.querySelector('.modal');
    const openModalButton = document.querySelector('.open-modal');
    const closeModalButton = document.querySelector('.close-modal');

    if (openModalButton && modal) {
        openModalButton.addEventListener('click', () => {
            modal.style.display = 'block'; // Show modal
        });
    }

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none'; // Hide modal
        });
    }

    // Dynamic content loading example
    const loadDataButton = document.querySelector('.load-data');
    if (loadDataButton) {
        loadDataButton.addEventListener('click', () => {
            // Fetch data and update the DOM
            fetch('/api/data')
                .then(response => response.json())
                .then(data => {
                    // Update the DOM with fetched data
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    }
});
