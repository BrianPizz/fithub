// Create new outfit
const createOutfitHandler = async (event) => {
    event.preventDefault();
    // Grab values of name and products
    const outfit_name = document.querySelector('#fitName').value.trim(); // Need to add id of input field
    console.log(outfit_name)

    const productIds = []; // Need to add functionaltiy to add product ids to array

    // Iterate through all elements with the class 'piece-card' to collect their data-id attributes
    document.querySelectorAll('.piece-card').forEach((card) => {
        if (card.classList.contains('active')) {
            const id = card.getAttribute('data-id');
            productIds.push(id);
        }
    });

    console.log(productIds)

    // vVrify there is a name and products
    if (outfit_name && productIds.length > 0) {
        // Create post request to /api/outfit
        const response = await fetch('/api/outfit', {
            method: 'POST',
            body: JSON.stringify({ outfit_name, productIds }),
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
document.querySelector('#generate').addEventListener('click', createOutfitHandler); // Need to add id of form 