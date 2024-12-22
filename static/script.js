// Author: Biswajit Basak

// Stores the table headings
const tableHeading = ['#', 'First Name', 'Last Name', 'Email', 'Action'];

// Stores the number of users created
let userCount = 0;

const statusBarDiv = document.createElement('div');
const statusMessage = document.createElement('p');
statusBarDiv.appendChild(statusMessage);

// Event Listeners
document.addEventListener('DOMContentLoaded', loadMainPage);


// This function will replace space with hyphen and convert the string to lower case
function replaceSpaceWithhyphenAndConvertToLower(value) {
    return value.toLowerCase().replace(' ', '-');
}

// This function takes in a list of button values and creates a button element for each value
function buttonDivFunction(listOfButtonValues) {
    let buttonDiv = document.createElement('td');
    listOfButtonValues.forEach(value => {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = value;
        buttonElement.classList.add(value.toLowerCase());
        buttonDiv.append(buttonElement)
    });
    return buttonDiv;
}

// This function will create the submit and cancel button
function addSubmitAndCancelButtonFunction() {
    const listOfButtonValues = ['Submit', 'Cancel'];
    const actionRow = buttonDivFunction(listOfButtonValues);
    return actionRow;
}

// This function will create the update and delete button
function addUpdateAndDeleteButtonFunction() {
    const listOfButtonValues = ['Update', 'Delete'];
    const actionRow = buttonDivFunction(listOfButtonValues);
    return actionRow;
}

// This function will create the action row consisting of different buttons
function createActionRow(addSubmitAndCancelButton = false, addUpdateAndDeleteButton = false) {
    let actionRow;
    if (addSubmitAndCancelButton) {
        actionRow = addSubmitAndCancelButtonFunction();
    }
    else if (addUpdateAndDeleteButton) {
        actionRow = addUpdateAndDeleteButtonFunction();
    }
    return actionRow
}

// This function will set the status message
function setStatusMessage(message) {
    statusMessage.innerText = 'Status: ' + message;
}

// This function will create the heading of the table
function createUserInputHeadingFunction() {
    let tableHeadingDiv = document.createElement('tr');

    tableHeading.forEach(value => {
        let tableHeadingElement = document.createElement('th');
        tableHeadingElement.innerText = value;
        tableHeadingDiv.appendChild(tableHeadingElement);
    })
    return tableHeadingDiv;
}

// This function will create the text box inside the table row
function createTextBoxInsideTableRow() {
    const numberOfTextBox = tableHeading.length;
    const userInputDiv = document.createElement('tr');
    for (let i = 1; i < numberOfTextBox - 1; i++) {
        let tr = document.createElement('td');
        let inputElement = document.createElement('input');
        if (tableHeading[i].toLowerCase() === 'email') {
            inputElement.setAttribute('type', 'email');
        }
        else {
            inputElement.setAttribute('type', 'text');
        }
        inputElement.setAttribute('placeholder', tableHeading[i]);
        const inputElementClassName = replaceSpaceWithhyphenAndConvertToLower(tableHeading[i])
        inputElement.classList.add(inputElementClassName);
        tr.appendChild(inputElement);
        userInputDiv.appendChild(tr);
    }
    return userInputDiv;
}

// This function will create the user input row
function createUserInputRowFunction() {
    const rowNumber = document.createElement('td');
    rowNumber.innerText = userCount;
    // Creating the text box inside the table row
    const userInputDiv = createTextBoxInsideTableRow();
    userInputDiv.prepend(rowNumber);
    // Creating the action row
    const actionRow = createActionRow(addSubmitAndCancelButton = true);
    userInputDiv.appendChild(actionRow);

    return userInputDiv;

}

// Creating the user input row
function createMainTable() {
    const tableContainerDiv = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainerDiv.appendChild(table);
    return tableContainerDiv;

}

// Starting Point of the application
function loadMainPage(event) {
    setStatusMessage("Click on create contact button.");

    const mainContainer = document.querySelector('.main-container');

    const appNameDiv = document.createElement('div');
    const appNameText = document.createElement('p');

    appNameText.innerText = "Contacts List Application";
    appNameText.style.fontSize = '2rem';
    appNameDiv.appendChild(appNameText);

    // The user table is created here
    const tableContainerDiv = createMainTable();

    // The create contact button is created here
    const createButtonDiv = document.createElement('div');
    const createButton = document.createElement('button');


    createButton.innerText = 'Create Contact';
    createButtonDiv.appendChild(createButton);
    createButton.addEventListener('click', createContactFunction);

    mainContainer.appendChild(appNameDiv);
    mainContainer.appendChild(statusBarDiv);
    mainContainer.appendChild(tableContainerDiv);
    mainContainer.appendChild(createButtonDiv);
}

function fetchFromURL(url, request) {
    return fetch(url, request)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            setStatusMessage('Some error has occured!')
        });
}

// This function handles the user input row creation, validation and submission
function createContactFunction(event) {
    setStatusMessage('Please enter User details.');
    if (userCount == 0) {
        // Creating the heading of the table
        const tableHead = document.querySelector('thead');
        const createUserInputHeading = createUserInputHeadingFunction();
        tableHead.appendChild(createUserInputHeading);
    }
    userCount += 1
    // Creating the user input row
    const tableBody = document.querySelector('tbody');
    const createUserInputRow = createUserInputRowFunction()
    tableBody.appendChild(createUserInputRow);

    const submitButton = createUserInputRow.querySelector('.submit');
    submitButton.addEventListener('click', (event) => {
        const firstName = createUserInputRow.querySelector('.first-name').value;
        const lastName = createUserInputRow.querySelector('.last-name').value;
        const email = createUserInputRow.querySelector('.email').value;

        if (!firstName) {
            setStatusMessage('Please enter First name.');
        }
        else if (!lastName) {
            setStatusMessage('Please enter Last name.');
        }
        else if (!email) {
            setStatusMessage('Please enter Email.');
        }
        else {
            // console.log(firstName, lastName, email);
            const response = fetchFromURL('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                })
            });
            console.log(response);
        }

        // Submit the request to the server
        // Remove the text fields and add the user details to the table
        // Change the button to update and delete
    });

}


