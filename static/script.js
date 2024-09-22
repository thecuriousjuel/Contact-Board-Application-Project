// Creating Elements


const actionRow = document.createElement('th');
const createContact = document.createElement('div');
const createButton = document.createElement('button');
const statusBar = document.createElement('div');
const statusMessage = document.createElement('p');

let userCount = 0;

//Assign Values to the created elements



// Event Listeners
document.addEventListener('DOMContentLoaded', loadMainPage);
// createButton.addEventListener('click', createContactFunction);


// Methods
function buttonDivFunction(listOfButtonValues) {
    let buttonDiv = document.createElement('div');
    listOfButtonValues.forEach(value => {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = value;
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

function createUserInputHeading() {
    const tableHeading = ['#', 'First Name', 'Last Name', 'Email', 'Action'];
    let tableHeadingDiv = document.createElement('div');

    tableHeading.forEach(value => {
        let tableHeadingElement = document.createElement('th');
        tableHeadingElement.innerText = value;
        tableHeadingDiv.appendChild(tableHeadingElement);
    })
    return tableHeadingDiv;
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

function createTextBoxInsideTableRow(numberOfTextBox = 0) {
    const userInputDiv = document.createElement('tr');
    for (let i = 0; i < numberOfTextBox; i++) {
        let tr = document.createElement('td');
        let inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        tr.appendChild(inputElement);
        userInputDiv.appendChild(tr);
    }
    return userInputDiv;
}

function createMainTable(){
    const tableContainer = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
}

function loadMainPage(event) {
    const mainContainer = document.querySelector('.main-container');
    
    const appName = document.createElement('div');
    const appNameText = document.createElement('p');

    appNameText.innerText = "Contacts";
    appNameText.style.fontSize = '2rem';
    appName.appendChild(appNameText);

    createButton.innerText = 'Create Contact';
    setStatusMessage("Click on create contact button.");

    statusBar.appendChild(statusMessage);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);

    tableContainer.appendChild(table);

    createContact.appendChild(createButton);

    mainContainer.appendChild(appName);
    mainContainer.appendChild(statusBar);
    mainContainer.appendChild(tableContainer);
    mainContainer.appendChild(createContact);
}

function createContactFunction(event) {

    actionRow.innerText = 'Action';

    const number = document.createElement('div');
    const firstNameInput = document.createElement('input');
    const lastNameInput = document.createElement('input');
    const emailInput = document.createElement('input');

    const actionsInput = document.createElement('div');
    const submitInput = document.createElement('button');
    const cancelInput = document.createElement('button');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');

    firstNameInput.setAttribute('type', 'text');
    firstNameInput.setAttribute('placeholder', 'First Name');
    lastNameInput.setAttribute('type', 'text');
    lastNameInput.setAttribute('placeholder', 'Last Name');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', 'Email');
    cancelInput.classList.add('cancel-input');

    userCount += 1;
    number.innerText = userCount;
    submitInput.innerText = 'Submit';
    cancelInput.innerText = 'Cancel';
    setStatusMessage('Please enter User details.');

    actionsInput.appendChild(submitInput);
    actionsInput.appendChild(cancelInput);

    td1.appendChild(number);
    td2.appendChild(firstNameInput);
    td3.appendChild(lastNameInput);
    td4.appendChild(emailInput);
    td5.appendChild(actionsInput);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);

    submitInput.addEventListener('click', (event) => {
        firstName = firstNameInput.value;
        lastName = lastNameInput.value;
        email = emailInput.value;
        if (!firstName) {
            setStatusMessage('Firstname not provided.')
        }
        else if (!lastName) {
            setStatusMessage('Lastname not provided.')
        }
        else if (!email) {
            setStatusMessage('Email not provided.')
        }
        else {
            setStatusMessage(`Contact '${firstName} ${lastName}' is saved.`);
            const submitButtonParentElement = submitInput.parentElement.parentElement.parentElement;
            let count = 0;
            while (submitButtonParentElement.firstChild) {
                if (!count) {
                    count = submitButtonParentElement.firstChild.innerText;
                }
                submitButtonParentElement.removeChild(submitButtonParentElement.firstChild);
            }
            const countElement = document.createElement('p');
            const firstNameElement = document.createElement('p');
            const lastNameElement = document.createElement('p');
            const emailElement = document.createElement('p');
            const actionsInput = document.createElement('div');
            const updateInput = document.createElement('button');
            const deleteInput = document.createElement('button');

            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            countElement.innerText = count;
            firstNameElement.innerText = firstName;
            lastNameElement.innerText = lastName;
            emailElement.innerText = email;
            updateInput.innerText = 'Update';
            deleteInput.innerText = 'Delete'

            countElement.style.textAlign = 'center';
            firstNameElement.style.textAlign = 'center';
            lastNameElement.style.textAlign = 'center';
            emailElement.style.textAlign = 'center';

            actionsInput.appendChild(updateInput);
            actionsInput.appendChild(deleteInput);

            td1.appendChild(countElement);
            td2.appendChild(firstNameElement);
            td3.appendChild(lastNameElement);
            td4.appendChild(emailElement);
            td5.appendChild(actionsInput);

            submitButtonParentElement.appendChild(td1);
            submitButtonParentElement.appendChild(td2);
            submitButtonParentElement.appendChild(td3);
            submitButtonParentElement.appendChild(td4);
            submitButtonParentElement.appendChild(td5);

        }
        console.log(firstName, lastName, email);
    });
    cancelInput.addEventListener('click', (event) => {
        const cancelButtonParentElement = cancelInput.parentElement.parentElement.parentElement;
        cancelButtonParentElement.remove();
    });
}

