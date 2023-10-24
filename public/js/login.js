// Sign up function
const signupHandler = async (event) => {
    event.preventDefault();
    // grab values from form
    const username = document.querySelector('').value.trim(); // Need to add id of input field
    const email = document.querySelector('').value.trim(); // Need to add id of input field
    const password = document.querySelector('').value.trim(); // Need to add id of input field

    if (username && email && password) {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/'); //redirect to homepage
        } else {
          alert(response.statusText);
        }
      }
};
// Log in function
const loginHandler = async (event) => {
    event.preventDefault();
    // grab values from form
    const email = document.querySelector('').value.trim(); // Need to add id of input field
    const password = document.querySelector('').value.trim(); // Need to add id of input field

    if (email && password) {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/'); //redirect to homepage
        } else {
          alert('Incorrect Email or Password.');
        }
      }
};

document.querySelector('').addEventListener('submit', signupHandler); // Need to add id of form
document.querySelector('').addEventListener('submit', loginHandler); // Need to add id of form