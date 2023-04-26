const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const currentDate = new Date();
const submit = document.querySelector(".submit_btn");
const ageDays = document.querySelector(".age_days span");
const ageMonths = document.querySelector(".age_months span");
const ageYears = document.querySelector(".age_years span");
const errorPars = document.querySelectorAll(".errorPar");
const form = document.querySelector(".form_birth");

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const emptyInputs = empty();
    const overflowInputs = overflow();
    if(emptyInputs !== 3) {
        if(overflowInputs === 0) {
            setAge();
            clearErrors();
        }
    }
});

day.addEventListener("input", isValid);
month.addEventListener("input", isValid);
year.addEventListener("input", isValid);

function isValid() {
    if(this.validity.valid) {
        this.parentElement.setAttribute("class", "");
    }
}

async function setAge() {
    const birthDate = new Date(year.value, month.value -1, day.value);
    const age = new Date(currentDate - birthDate);

    ageYears.textContent = "0";
    ageMonths.textContent = "0";
    ageDays.textContent = "0";

    const agedYears = age.getUTCFullYear() - 1970;
    for(let i = 0; i < agedYears; i++) {
        await animateNum(ageYears);
    }

    const agedMonths = age.getUTCMonth();
    for(let i = 0; i < agedMonths; i++) {
        await animateNum(ageMonths);
    }
    
    const agedDays = age.getUTCDate() -1;
    for(let i = 0; i < agedDays; i++) {
        await animateNum(ageDays);
    }
}

function animateNum(ageObj) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ageObj.textContent = parseInt(ageObj.textContent) + 1);
        }, 20);
    });
}

function daysInMonth(year, month) {
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
}

function empty() {
    const inputs = [day, month, year];
    let empty = 0;

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === "") {
            inputs[i].parentElement.setAttribute("class", "alert");
            errorPars[i].textContent = "This field is required";
            empty++;
        }
    }

    return empty;
}

function overflow() {
    let overflow = 0;

    if(day.value > 31) {
        day.parentElement.setAttribute("class", "alert");
        errorPars[0].textContent = "Must be a valid day";
        overflow++;
    } else if (day.value > daysInMonth(year.value, month.value)) {
        day.parentElement.setAttribute("class", "alert");
        errorPars[0].textContent = "Must be a valid date";
        overflow++;
    }
    if(month.value > 12) {
        month.parentElement.setAttribute("class", "alert");
        errorPars[1].textContent = "Must be a valid month";
        overflow++;
    }
    if(year.value > currentDate.getUTCFullYear()) {
        year.parentElement.setAttribute("class", "alert");
        errorPars[2].textContent = "Must be in the past";
        overflow++;
    }
    return overflow;
}

function clearErrors() {
    for(const error of errorPars) {
        error.style.display = "none";
    }
}