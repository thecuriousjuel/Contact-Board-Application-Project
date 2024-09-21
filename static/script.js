// Selectors
const mainContainer = document.querySelector('.main-container');
const cancelButton = document.querySelector('.cancel-input');

// Creating Elements
const appName = document.createElement('div');
const tableContainer = document.createElement('div');
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const th1 = document.createElement('th');
const th2 = document.createElement('th');
const th3 = document.createElement('th');
const th4 = document.createElement('th');
const actionRow = document.createElement('th');
const createContact = document.createElement('div');
const createButton = document.createElement('button');

// Assign Properties to the created elements
// mainContainer.className = "main-container";
// appName.className = "app-name";
// tableContainer.className = "table-container";
// createContact.className = "create-contact"
let userCount = 0;

//Assign Values to the created elements
appName.innerText = "Contacts";
appName.style.fontSize = '2rem';
th1.innerText = '#';
th2.innerText = 'First Name'
th3.innerText = 'Last Name';
th4.innerText = 'Email';
actionRow.innerText = 'Action'

// Event Listeners
document.addEventListener('DOMContentLoaded', loadMainPage);
createButton.addEventListener('click', createContactFunction);


// Methods
function loadMainPage(event){
    const tr = document.createElement('tr');
    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    tr.append(th4);
    tr.append(actionRow);

    createButton.innerText = 'Create Contact';

    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);

    tableContainer.appendChild(table);

    createContact.appendChild(createButton);

    mainContainer.appendChild(appName);
    mainContainer.appendChild(tableContainer);
    mainContainer.appendChild(createContact)

    // console.log(mainContainer);
    // fetch function call to retrieve the records from the database.

}

function createContactFunction(event){
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

    submitInput.addEventListener('click', (event) =>{
        firstName = firstNameInput.value;
        lastName = lastNameInput.value;
        email = emailInput.value;
        console.log(firstName, lastName, email);
    });
    cancelInput.addEventListener('click', (event) =>{
        console.log(event);
        const cancelButtonParentElement = cancelInput.parentElement;
        cancelButtonParentElement.remove()
    });

}

