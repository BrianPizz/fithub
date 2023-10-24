// Create new outfit
const creatOutfitHandler = async (event) => {
    event.preventDefault();
    // Grab values of name and products
    const outfitName = document.querySelector('').value.trim(); // Need to add id of input field
    const productIds = []; // Need to add functionaltiy to add product ids to array

    // vVrify there is a name and products
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
document.querySelector('').addEventListener('submit', creatOutfitHandler); // Need to add id of form 