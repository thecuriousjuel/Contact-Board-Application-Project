const tableHeading = ['#', 'First Name', 'Last Name', 'Email', 'Action'];

let userCount = 0;

const statusBarDiv = document.createElement('div');
const statusMessage = document.createElement('p');
statusBarDiv.appendChild(statusMessage);

// Event Listeners
document.addEventListener('DOMContentLoaded', loadMainPage);


// Helper Methods
function replaceSpaceWithhyphenAndConvertToLower(value) {
    return value.toLowerCase().replace(' ', '-');
}

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

function addSubmitAndCancelButtonFunction() {
    const listOfButtonValues = ['Submit', 'Cancel'];
    const actionRow = buttonDivFunction(listOfButtonValues);
    return actionRow;
}

function addUpdateAndDeleteButtonFunction() {
    const listOfButtonValues = ['Update', 'Delete'];
    const actionRow = buttonDivFunction(listOfButtonValues);
    return actionRow;
}

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

function setStatusMessage(message) {
    statusMessage.innerText = 'Status: ' + message;
}

function createUserInputHeadingFunction() {
    let tableHeadingDiv = document.createElement('tr');

    tableHeading.forEach(value => {
        let tableHeadingElement = document.createElement('th');
        tableHeadingElement.innerText = value;
        tableHeadingDiv.appendChild(tableHeadingElement);
    })
    return tableHeadingDiv;
}

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

function createUserInputRowFunction() {
    const rowNumber = document.createElement('td');
    rowNumber.innerText = userCount;

    const userInputDiv = createTextBoxInsideTableRow();
    userInputDiv.prepend(rowNumber);

    const actionRow = createActionRow(addSubmitAndCancelButton = true);
    userInputDiv.appendChild(actionRow);

    return userInputDiv;

}

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

function loadMainPage(event) {
    setStatusMessage("Click on create contact button.");

    const mainContainer = document.querySelector('.main-container');

    const appNameDiv = document.createElement('div');
    const appNameText = document.createElement('p');

    appNameText.innerText = "Contacts List Application";
    appNameText.style.fontSize = '2rem';
    appNameDiv.appendChild(appNameText);

    const tableContainerDiv = createMainTable();

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


// Starting Point of the application
function createContactFunction(event) {
    setStatusMessage('Please enter User details.');
    if (userCount == 0) {
        const tableHead = document.querySelector('thead');
        const createUserInputHeading = createUserInputHeadingFunction();
        tableHead.appendChild(createUserInputHeading);
    }
    userCount += 1

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
            console.log(firstName, lastName, email);
        }
    });

}


