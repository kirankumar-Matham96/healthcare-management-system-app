const BASE_URL = "http://localhost:3000/healthcare/api";

/* API calls */
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

const signIn = async (email, password) => {
  try {
    const url = `${BASE_URL}/auth/signin`;
    const data = {
      email,
      password,
    };

    console.log({ data });
    const options = {
      method: "POST",
      headers: {
        "Content-Tyope": "application/json",
      },
      body: JSON.stringify(data),
    };

    const resp = await fetch(url, options);
    const sigInResp = await resp.json();
    console.log({ sigInResp });
    localStorage.setItem("token", sigInResp.token);
    return sigInResp;
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
};

const verifyToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "http://localhost:3000/healthcare/api/auth/signin";
  }
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
          alert("User Signed Up!");
          signUpFormEl.reset();
        }
      });

    /* signin form submission */
    signInFormEl &&
      signInFormEl.addEventListener("submit", async (e) => {
        e.preventDefault();

        const resp = await signIn(signInEmailEl.value, signInPasswordEl.value);

        if (resp.success) {
          alert("signed in successfully!");
        }
      });

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
