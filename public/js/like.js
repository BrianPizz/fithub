const likeOufitHandler = async (event) => {
    event.preventDefault();
    // Outfit id will be stored in data id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/outfit/like/${id}`, {
            method: 'POST',
        });

        if(response.ok){
            document.location.reload() // reload page
        } else {
            alert('Failed to like outfit');
        }
    }
};

document.querySelector('').addEventListener('click', likeOufitHandler);