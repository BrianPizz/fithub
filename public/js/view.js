// View user's outfits
const userFitsHandler = async (event) => {
    event.preventDefault();
    // Outfit ID stored in data-id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // Send user to /edit/:id
        document.location.replace(`/edit/${id}`);
    }
};

// View top outfits
const topFitsHandler = async (event) => {
    event.preventDefault();
    // Outfit ID stored in data-id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // Send user to /fit/:id
        document.location.replace(`/fit/${id}`);
    }
};

document.querySelectorAll('.yours-card').addEventListener('click', userFitsHandler);