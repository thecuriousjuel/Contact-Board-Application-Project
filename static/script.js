// Author: Biswajit Basak

// Stores the table headings
const tableHeading = ['#', 'First Name', 'Last Name', 'Email', 'Action'];

// Stores the number of users created
let userCount = 0;

const statusBarDiv = document.createElement('div');
const statusMessage = document.createElement('p');
statusBarDiv.classList.add('status-bar')
statusMessage.setAttribute('id', 'status-message')
statusBarDiv.appendChild(statusMessage);

// Event Listeners
document.addEventListener('DOMContentLoaded', loadMainPage);


// This function will replace space with hyphen and convert the string to lower case
function replaceSpaceWithhyphenAndConvertToLower(value) {
    return value.toLowerCase().replace(' ', '-');
}

// This function takes in a list of button values and creates a button element for each user
function buttonDivFunction(listOfButtonValues) {
    let buttonDiv = document.createElement('td');
    listOfButtonValues.forEach(value => {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = value;
        buttonElement.classList.add(replaceSpaceWithhyphenAndConvertToLower(value));
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
    // Trim whitespace from both ends
    let trimmed = message.trim();

    // Remove all full stops
    let noFullStops = trimmed.replace(/\.$/, '');

    // Capitalize the first letter
    let capitalized = noFullStops.charAt(0).toUpperCase() + noFullStops.slice(1);
    console.log('capitalized', capitalized)
    statusMessage.innerText = capitalized;
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

// This function will validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        return true;
    }
    return false;
}

// This function will create the text box inside the table row
function createTextBoxInsideTableRow() {
    const numberOfTextBox = tableHeading.length;
    const userInputDiv = document.createElement('tr');
    for (let i = 1; i < numberOfTextBox - 1; i++) {
        let td = document.createElement('td');
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
        td.appendChild(inputElement);
        userInputDiv.appendChild(td);
    }
    return userInputDiv;
}

// This function will create the user input row for editing
function createUserInputRowFunction() {
    const rowNumber = document.createElement('td');
    rowNumber.innerText = userCount;
    // Creating the text box inside the table row
    const userInputDiv = createTextBoxInsideTableRow();
    userInputDiv.prepend(rowNumber);
    // Creating the action row
    const actionRow = createActionRow(addSubmitAndCancelButton = true, addUpdateAndDeleteButton = false);
    userInputDiv.appendChild(actionRow);

    return userInputDiv;

}

// 
function displayUsersInsideTableRow(userList) {
    const userTableBody = document.querySelector('tbody');
    for (let i = userList.length - 1; i >= 0; i--) {
        const userRow = document.createElement('tr');

        const rowNumber = document.createElement('td');
        const userFirstName = document.createElement('td');
        const userLastName = document.createElement('td');
        const userEmail = document.createElement('td');

        // Creating the action row
        const actionRow = createActionRow(addSubmitAndCancelButton = false, addUpdateAndDeleteButton = true);

        rowNumber.innerText = userList[i][0];
        userFirstName.innerText = userList[i][1];
        userLastName.innerText = userList[i][2];
        userEmail.innerText = userList[i][3];

        userRow.append(rowNumber, userFirstName, userLastName, userEmail, actionRow)
        userTableBody.appendChild(userRow)
    }
}

// This function creates an empty table that will contain the users and the user's inputs
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

// This function calls the API endpoints and retrives the response
async function fetchFromURL(url, request) {
    const response = await fetch(url, request);
    const data = await response.json();
    if (data.status < 200 || data.status >= 400) {
        throw new Error(data.response)
    }
    return data.response
}

// This function deletes the user using the email address
function deleteUser(event) {
    const button = event.target;
    const row = button.closest('tr');

    const userEmail = row.cells[3].textContent;
    const response = fetchFromURL('/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail
        })
    });
    response.then(res => {
        setStatusMessage(res.response)
        setTimeout(() => {
            location.reload()
        }, 2000);
    })
}

// This function updates the user using the email address
function updateUser(event) {
    const button = event.target;
    const row = button.closest('tr');
    const tableBody = row.parentElement;

    const createUserInputRow = createUserInputRowFunction();
    const createContactButtonState = document.querySelector('#create-contact');

    if (!createContactButtonState.disabled) {
        createContactButtonState.disabled = true;
    }

    setStatusMessage('Please enter User details.');

    const userID = row.cells[0].textContent;
    const userFirstName = row.cells[1].textContent;
    const userLastName = row.cells[2].textContent;
    const userEmail = row.cells[3].textContent;

    const tableRowCells = createUserInputRow.cells;

    tableRowCells[0].textContent = userID;
    tableRowCells[1].firstChild.value = userFirstName
    tableRowCells[2].firstChild.value = userLastName;
    tableRowCells[3].firstChild.value = userEmail;
    tableRowCells[3].firstChild.disabled = true

    const tableHead = document.querySelector('thead');
    const submitButton = createUserInputRow.querySelector('.submit');
    const cancelButton = createUserInputRow.querySelector('.cancel');

    submitButton.addEventListener('click', (event) => submitUserData(event, createUserInputRow, '/update'));
    cancelButton.addEventListener('click', (event) => cancelSubmission(event,
        tableHead, tableBody, createContactButtonState, row, createUserInputRow));

    tableBody.replaceChild(createUserInputRow, row);
}

// This function processes the user's input and requests to store the user's data
function submitUserData(event, createUserInputRow, url) {
    const firstName = createUserInputRow.querySelector('.first-name');
    const lastName = createUserInputRow.querySelector('.last-name');
    const email = createUserInputRow.querySelector('.email');
    if (!firstName.value) {
        setStatusMessage('Please enter First name.');
        firstName.classList.add('invalid');
    }
    else if (!lastName.value) {
        setStatusMessage('Please enter Last name.');
        lastName.classList.add('invalid');
        firstName.classList.remove('invalid');
    }
    else if (!email.value) {
        setStatusMessage('Please enter Email.');
        email.classList.add('invalid');
        firstName.classList.remove('invalid');
        lastName.classList.remove('invalid');
    }
    else if (!validateEmail(email.value)) {
        setStatusMessage('Please enter a valid email.');
        email.classList.add('invalid');
        firstName.classList.remove('invalid');
        lastName.classList.remove('invalid');
    }
    else {
        firstName.classList.remove('invalid');
        lastName.classList.remove('invalid');
        email.classList.remove('invalid');


        if (url === '/create') {
            const response = fetchFromURL(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value
                })
            });

            response.then(data => {
                setStatusMessage(data.response);
                setTimeout(() => {
                    location.reload()
                    // createContactButtonState.disabled = false;
                }, 2000);
            });
        }
        else if (url === '/update') {
            const response = fetchFromURL(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value
                })
            })

            response.then(data => {
                setStatusMessage(data.response);
                setTimeout(() => {
                    location.reload()
                }, 2000);
            });
        }
    }
}

// This function is used to cancel the user's inputs and returns to the previous users data.
function cancelSubmission(event, tableHead, tableBody, createContactButtonState, row, createUserInputRow) {
    if (row) {
        tableBody.replaceChild(row, createUserInputRow);
    }
    else {
        tableBody.removeChild(tableBody.firstChild);
    }
    createContactButtonState.disabled = false;
    userCount -= 1;

    if (userCount === 0) {
        tableHead.removeChild(tableHead.firstChild)
        setStatusMessage('No User data is present')
    }
    setStatusMessage('Displaying all the User Data')
}

// This function handles the user input row creation, validation and submission
function createContactFunction(event) {
    const createContactButtonState = document.querySelector('#create-contact')
    if (!createContactButtonState.disabled) {
        createContactButtonState.disabled = true;
    }

    setStatusMessage('Please enter User details.');
    const tableHead = document.querySelector('thead');
    if (userCount === 0 && tableHead.childNodes.length === 0) {
        // Creating the heading of the table
        const createUserInputHeading = createUserInputHeadingFunction();
        tableHead.appendChild(createUserInputHeading);
    }
    userCount += 1
    // Creating the user input row
    const tableBody = document.querySelector('tbody');

    const createUserInputRow = createUserInputRowFunction()
    tableBody.prepend(createUserInputRow);


    const submitButton = createUserInputRow.querySelector('.submit');
    const cancelButton = createUserInputRow.querySelector('.cancel');

    submitButton.addEventListener('click', (event) => submitUserData(event, createUserInputRow, '/create'));
    cancelButton.addEventListener('click', (event) => cancelSubmission(event, tableHead, tableBody, createContactButtonState));

}

// This function is the starting point of the application
function loadMainPage(event) {
    const mainContainer = document.querySelector('.main-container');

    const appNameDiv = document.createElement('div');
    const appNameText = document.createElement('p');

    appNameText.innerText = "Contacts List Application";
    appNameText.setAttribute('id', 'title')
    appNameDiv.appendChild(appNameText);

    // The empty user table is created here
    const tableContainerDiv = createMainTable();

    const userListPromise = fetchFromURL('/users', {
        method: 'GET'
    });
    userListPromise.then(users => {
        if (users.length == 0) {
            const message = 'No User data is present'
            setStatusMessage(message)
        }
        else if (users.length > 0) {
            userCount = +users[users.length - 1][0];
            setStatusMessage("Displaying all the User data.");
            // Creating the heading of the table
            const tableHead = document.querySelector('thead');
            const createUserInputHeading = createUserInputHeadingFunction();
            tableHead.appendChild(createUserInputHeading);
            displayUsersInsideTableRow(users)
            const tableBody = document.querySelector('tbody');

            tableBody.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    if (event.target.classList.contains('delete')) {
                        deleteUser(event)
                    }
                    if (event.target.classList.contains('update')) {
                        updateUser(event)
                    }
                }
            })
        }
    }).catch(error => {
        setStatusMessage(error.message)
    })

    // The create contact button is created here
    const createButtonDiv = document.createElement('div');
    const createButton = document.createElement('button');

    createButton.setAttribute('id', 'create-contact')

    createButton.innerText = 'Create contact';
    createButtonDiv.appendChild(createButton);
    createButton.addEventListener('click', createContactFunction);

    mainContainer.appendChild(appNameDiv);
    mainContainer.appendChild(statusBarDiv);
    mainContainer.appendChild(createButtonDiv);
    mainContainer.appendChild(tableContainerDiv);

}

