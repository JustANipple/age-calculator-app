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

//TO-DO 24-09-1984 = 38 years, 3 months, 26 days
//TO-DO days must be checked to be right for the month, otherwise show "Must be a valid date"
//TO-DO days, months and years that overflow the pattern give different errors
//TO-DO if the field is empty, it shows "this field is required"

submit.addEventListener("click", (event) => {
    event.preventDefault();
    
    const emptyInputs = empty();
    const overflowInputs = overflow();
    if(emptyInputs !== 3) {
        if(overflowInputs !== 3 || overflowInputs !== 4) {
            setAge();
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
    if(year.value > currentDate.getUTCFullYear) {
        year.parentElement.setAttribute("class", "alert");
        errorPars[2].textContent = "Must be in the past";
        overflow++;
    }
    return overflow;
}