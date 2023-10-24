// Update an outfit
const updateOutfitHandler = async (event) => {
    event.preventDefault();
    // Grab values of name and products
    const outfitName = document.querySelector('').value.trim(); // Need to add id of input field
    const productIds = []; // Need to add functionaltiy to add product ids to array
    //Sstore outfit id in data id attribute
    const id = document.querySelector('').getAttribute('data-id'); // add edit button class

    // Verify name, products, and id
    if (outfitName && productIds.length > 0 && id){
        // Rreate a put request to /api/outfit/id
        const response = await fetch(`/api/outfit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ outfitName, productIds }),
            headers: { 'Content-type': 'application/json' },
        });
        // Reload once completed
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
        // Create delete request to /api/outfit/id
        const response = await fetch(`/api/outfit/${id}`, {
            method: 'DELETE',
        });
        // Reload once outfit is deleted
        if(response.ok){
            document.location.replace('/') // reload page or relocate
        } else {
            alert('Failed to delete outfit');
        }
    }
};

// Edit an outfit
const toggleEditFit = async () => {
    const editFitSection = document.getElementById('editFitSecton');
    if (editFitSection.style.display === 'none') {
        editFitSection.style.display === 'block'
    };
};

// Event listeners
document.querySelector('.updateBtn').addEventListener('click', updateOutfitHandler); // Need to add update button class
document.querySelector('.deleteBtn').addEventListener('click', deleteOufitHandler); // Need to add delete button class
document.querySelector('.showEditBtn').addEventListener('click', toggleEditFit);