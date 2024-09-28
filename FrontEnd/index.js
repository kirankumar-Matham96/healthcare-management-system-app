const BASE_URL = "http://localhost:3000/healthcare/api";

/* API calls */

/**
 * Sign Ups the user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns Object
 */
const signUp = async (name, email, password) => {
  try {
    const url = `${BASE_URL}/auth/signup`;
    const data = { name: name, email: email, password: password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const resp = await fetch(url, options);
    const respData = await resp.json();
    return respData;
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};

/**
 * Signs in the user
 * @param {string} email
 * @param {string} password
 */
const signIn = async (email, password) => {
  try {
    const url = `${BASE_URL}/auth/signin`;
    const data = {
      email,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const resp = await fetch(url, options);
    const sigInResp = await resp.json();
    localStorage.setItem("token", sigInResp.token);
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};

const signOut = () => {
  localStorage.removeItem("token");
};

/**
 * Verifies the token existance.
 * @returns boolean
 */
const verifyToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    if (
      window.location.href !==
        "http://localhost:3000/healthcare/api/auth/signIn.html" &&
      window.location.href !==
        "http://localhost:3000/healthcare/api/auth/signUp.html" &&
      window.location.href !== "http://localhost:3000/healthcare/api/"
    ) {
      window.location.href =
        "http://localhost:3000/healthcare/api/auth/signIn.html";
    }
    return false;
  }
  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    const signUpNameEl = document.querySelector("#signupInputName");
    const signUpEmailEl = document.querySelector("#signupInputEmail1");
    const signUpPasswordEl = document.querySelector("#signupInputPassword1");
    const signUpConfirmPasswordEl = document.querySelector(
      "#signupInputPassword2"
    );
    const signUpFormEl = document.querySelector("#signUpForm");
    const signInFormEl = document.querySelector("#signinForm");
    const signInEmailEl = document.querySelector("#signinInputEmail1");
    const signInPasswordEl = document.querySelector("#signinInputPassword1");
    const navSignInBtnEl = document.querySelector("#signInBtn");
    const navSignOutBtnEl = document.querySelector("#signOutBtn");

    /* verifying the token/login-status */
    const isSignedIn = verifyToken();

    /* dynamic button rendering */
    if (isSignedIn) {
      navSignInBtnEl.style.display = "none";
      navSignOutBtnEl.style.display = "block";
    } else {
      navSignInBtnEl.style.display = "block";
      navSignOutBtnEl.style.display = "none";
    }

    /* Signup form submission */
    signUpFormEl &&
      signUpFormEl.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (signUpPasswordEl.value !== signUpConfirmPasswordEl.value) {
          alert("password did not match!");
          return;
        }

        const response = await signUp(
          signUpNameEl.value,
          signUpEmailEl.value,
          signUpPasswordEl.value
        );
        if (response.success) {
          signUpFormEl.reset();
          alert("User Signed Up!");
          window.location.href =
            "http://localhost:3000/healthcare/api/signIn.html";
        }
      });

    /* signin form submission */
    signInFormEl &&
      signInFormEl.addEventListener("submit", async (e) => {
        e.preventDefault();
        const resp = await signIn(signInEmailEl.value, signInPasswordEl.value);
        if (resp.success) {
          signInFormEl.reset();
          alert("signed in successfully!");
          window.location.href = "http://localhost:3000/healthcare/api/";
        }
      });

    /* signout */
    navSignOutBtnEl && navSignOutBtnEl.addEventListener("click", signOut);

    /**
     *
     */
    /* Chart JS */
    const ctx1 = document.getElementById("myChart1");
    const ctx2 = document.getElementById("myChart2");

    ctx1 &&
      new Chart(ctx1, {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "User Registrations",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

    const data = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "User Registrations",
          data: [45, 60, 50, 70],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    ctx2 &&
      new Chart(ctx2, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  } catch (error) {
    console.log(error);
  }
});
