// Create new outfit
const creatOutfitHandler = async (event) => {
    event.preventDefault();

    const outfitName = document.querySelector('').value.trim(); // Need to add id of input field
    const productIds = []; // Need to add functionaltiy to add product ids to array

    if (outfitName && productIds.length > 0) {
        const response = await fetch('/api/outfit', {
            method: 'POST',
            body: JSON.stringify({ outfitName, productIds }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // redirect to homepage
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('').addEventListener('submit', creatOutfitHandler); // Need to add id of form 