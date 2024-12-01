/* HEADER/DISCLAIMER
 
Project:  Responsive Site
Name: Josh Whitney
Submitted: 30 Nov 2024
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs):  Changes made: Created this form.js file to handle validation form.
Adding the form wasn't nearly as bad as I thought. Still frustrating in ways I think could have been avoided. I would have loved to have done this project *after* the zyBook assignments for FormsB opened up. There was a great amount of struggle, not because I didn't know how to implement the form, but because troubleshooting something you only half understand (from the FormsA assignment we did first) leads to frustrations, especially when the answers aren't readily on the internet. This may also partially be due to me having more experience with compiled languages than interpreted languages.
*/

//info regexes

let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[/s.-]\d{4}$/
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

//array of valid state abbreviations
let states = [
    "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "Fl", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY", "ALABAMA", "ALASKA", "AMERICAN SAMOA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORODO", "CONNECTICUT", "DELEWARE", "DISTRICT OF COLUMBIA", "FLORIDA", "GEORGIA", "GUAM", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUESETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEW HAMPSHIRE", "NEW JERSEY", "NEW MEXICO", "NEW YORK", "NORTH CAROLINA", "NORTH DAKOTA", "NORTHERN MARIANA ISLANDS", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "PUERTO RICO", "RHODE ISLAND", "SOUTH CAROLINA", "SOUTH DAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "VIRGIN ISLANDS", "WASHINGTON", "WEST VIRGINIA", "WISCONSIN", "WYOMING"
]

//other vars
let formEl = null;
let successMsg = null;

//functions

//for success
function initValidation(form, success) {
    formEl = document.getElementById(form);
    successMsg = document.getElementById(success);

    let inputs = document.querySelectorAll("input");
    for (const input of inputs) {
        input.addEventListener("change", inputChanged); 
    }
    formEl.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
    let el = ev.currentTarget;
    validateForm();
    el.classList.add("was-validated");
}

function submitForm(ev) {
    let form = ev.currentTarget;

    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    if (!form.checkValidity()) {
        let inputs = document.querySelectorAll("input");
        for (const input of inputs) {
            input.classList.add("was-validated");
        }
    } else {
        document.getElementById("form").style.display = "none";
        document.getElementById("success").style.display= "flex";
    }
}

function validateForm() {
    checkRequired("name", "First Name is Required");
    checkRequired("surname", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is required");

    if(checkRequired("state", "State is Required")) {
        validateState("state", "Not a valid state, check spelling or enter two-digit abbreviation");
    }

    if (checkRequired("email", "Email Address is Required")) {
        checkFormat("email", "email format is bad", emailRegex);
    }
    if (checkRequired("zip", "Zip Code is Required")) {
        checkFormat("zip", "malformed zip, please use either '#####' or '#####-####' format", zipRegex);
    }
    if (checkRequired("phone", "Phone is Required")) {
        checkFormat("phone", "phone format is bad", phoneRegex);
    }
    
    checkRequired("google", "You must select an option");
}

function validateState(id, msg) {
    let el = document.getElementById(id).value;
    let valid = false;
    
    let string = el.toUpperCase();

    for (const state of states) {
        if (string == state) {
            valid = true;
        }
    }

    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    let str = document.getElementById(id).value;
    let valid = regex.test(str);

    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, msg) {
    let el = document.getElementById(id);
    let valid = false;

    let type = el.type;
    switch (type) {
        case "text":
            if (el.value !== "") {
                valid = true;
            }
            break;
        case "radio":
            radio = document.getElementsByClassName("radio");
            //loop through all radio buttons until a checked radio is found
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].checked) {
                    valid = true;
                    break;
                }
            }
            break;
    }

    setElementValidity(id, valid, msg);
    return valid;
}

function setElementValidity(id, valid, msg) {
    let el = document.getElementById(id);
    let eMsg = null;

    if (id != "google") {
        eMsg = el.nextElementSibling;
    } else {
        eMsg = document.getElementsByClassName("radioError")[0];
    }
    
    //error div

    if (valid) {
        el.setCustomValidity(""); //clears error msg, valid is true
        eMsg.textContent = "";
    } else {
        el.setCustomValidity(msg); //sets error msg, valid is false
        eMsg.textContent = msg;
    }
}