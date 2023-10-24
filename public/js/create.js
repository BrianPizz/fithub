// Create new outfit
const createOutfitHandler = async (event) => {
    // Changed to click event listener
    // event.preventDefault();
    // Grab values of name and products
    const outfitName = document.querySelector('#fitNameInput').value.trim(); // Need to add id of input field
    const productIds = []; // Need to add functionaltiy to add product ids to array

    // Verify there is a name and products
    if (outfitName && productIds.length > 0) {
        // Create post request to /api/outfit
        const response = await fetch('/api/outfit', {
            method: 'POST',
            body: JSON.stringify({ outfitName, productIds }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Redirect if complete
        if (response.ok) {
            document.location.replace('/'); // redirect to homepage
        } else {
            alert(response.statusText)
        }
    }
};

// Event listener
document.querySelector('.saveBtn').addEventListener('click', createOutfitHandler); // Need to add id of form 