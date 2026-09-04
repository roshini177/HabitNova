const token = localStorage.getItem("token");

// If there is no Firebase ID token, send the user back to login
if (!token) {
    window.location.href = "splash.html";
}

const userElement = document.getElementById("user");
if (userElement) {
    const userName = localStorage.getItem("name") || "Unknown user";
    userElement.innerText = "Logged in as: " + userName;
}

// Call protected Node.js backend using Bearer token
window.loadData = async function () {
    try {
        const res = await fetch("http://localhost:5000/dashboard-data", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        const outputEl = document.getElementById("output");
        if (outputEl) {
            outputEl.innerText = JSON.stringify(data, null, 2);
        }

    } catch (error) {
        alert("Backend Error");
        console.error(error);
    }
};

// Logout: clear token + user and go back to welcome screen
window.logout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    window.location.href = "splash.html";
};
