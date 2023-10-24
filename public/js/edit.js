// Update an outfit
const updateOutfitHandler = async (event) => {
    event.preventDefault();

    const outfitName = document.querySelector('').value.trim(); // Need to add id of input field
    const productIds = []; // Need to add functionaltiy to add product ids to array
    // store outfit id in data id attribute
    const id = document.querySelector('').getAttribute('data-id'); // add edit button class

    if (outfitName && productIds.length > 0 && id){
        const response = await fetch(`/api/outfit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ outfitName, productIds }),
            headers: { 'Content-type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/') // reload or relocate
        } else {
            alert('Failed to update outfit')
        }
    }; 
};

// Delete an outfit
const deleteOufitHandler = async (event) => {
    event.preventDefault();
    // Outfit id will be stored in data id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/outfit/${id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            document.location.replace('/') // reload page or relocate
        } else {
            alert('Failed to delete outfit');
        }
    }
};

document.querySelector('').addEventListener('click', updateOutfitHandler); // Need to add update button class
document.querySelector('').addEventListener('click', deleteOufitHandler); // Need to add delete button class