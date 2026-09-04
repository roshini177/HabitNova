import { auth, provider, signInWithPopup } from "./firebase-config.js";

let loginInProgress = false;

// Allow pressing Enter in the text box to trigger Google login
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("identityInput");
    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                window.googleLogin();
            }
        });
    }
});
window.googleLogin = async function () {
    if (loginInProgress) return;
    loginInProgress = true;

    try {
        const result = await signInWithPopup(auth, provider);
        const token = await result.user.getIdToken();

        // Optional: remember typed name/email for later display
        const typedIdentity = document.getElementById("identityInput")?.value || "";

        localStorage.setItem("token", token);
        localStorage.setItem("user", result.user.email);
        const name = result.user.displayName || result.user.email.split('@')[0];
        localStorage.setItem("name", name);
        if (typedIdentity) {
            localStorage.setItem("typedIdentity", typedIdentity);
        }

        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Firebase login error:", error);

        // Ignore "popup cancelled because another popup was opened"
        if (error.code === "auth/cancelled-popup-request") {
            // No alert, just stop.
            return;
        }

        // Show more helpful message for common setup issues
        if (error.code === "auth/operation-not-supported-in-this-environment") {
            alert("Login failed: run the app from http:// (not from a file path) – use a local server like VS Code Live Server.");
        } else if (error.code === "auth/unauthorized-domain") {
            alert("Login failed: add your app's domain (e.g. localhost) to Firebase Authentication → Authorized domains.");
        } else if (error.code === "auth/popup-blocked") {
            alert("Login failed: your browser blocked the popup. Allow popups for this site and try again.");
        } else if (error.code === "auth/popup-closed-by-user") {
            alert("Login cancelled: popup window was closed before completing sign-in.");
        } else {
            alert("Login Failed: " + (error.message || "Unknown error"));
        }
    } finally {
        loginInProgress = false;
    }
};
