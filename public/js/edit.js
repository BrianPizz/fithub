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

document.querySelector('').addEventListener('click', deleteOufitHandler); // Need to add delete button class