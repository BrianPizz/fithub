// log out function
const logoutHandler = async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/"); // send to homepage
    } else {
      alert(response.statusText);
    }
  };

// Event listener
document.querySelector("").addEventListener("click", logoutHandler); // Need to add id of logout button
// Logout button only to be visible when logged in