const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const currentDate = new Date();
const submit = document.querySelector(".submit_btn");
const ageDays = document.querySelector(".age_days span");
const ageMonths = document.querySelector(".age_months span");
const ageYears = document.querySelector(".age_years span");
const errorPars = document.querySelectorAll(".errorPar");

submit.addEventListener("click", (event) => {
    event.preventDefault();

    isEmpty();

    if(day.value > daysInMonth(year.value, month.value)) {
        day.parentElement.setAttribute("class", "alert");
    }
});

function setAge() {
    const birthDate = new Date(year.value, month.value -1, day.value);
    const age = new Date(currentDate - birthDate);

    ageYears.textContent = age.getUTCFullYear() - 1970;
    ageMonths.textContent = age.getUTCMonth();
    ageDays.textContent = age.getUTCDate() -1;
}

function daysInMonth(year, month) {
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
}

function isEmpty() {
    const inputs = [day, month, year];

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === "") {
            inputs[i].parentElement.setAttribute("class", "alert");
            errorPars[i].textContent = "This field is required";
        }
    }
}