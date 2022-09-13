// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitButton = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearButton = document.querySelector('.clear-btn');
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
window.addEventListener('DOMContentLoaded', setupItems);
// submit form
form.addEventListener('submit', addItem);
// clear items
clearButton.addEventListener('click', clearItems);
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value.length && !editFlag){
        const element = document.createElement('article');
        // add class to element
        element.classList.add('grocery-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`; 
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        // append child
        list.appendChild(element);
        // displayAlert
        displayAlert('item added to the list', 'success');
        // show container
        container.classList.add('show-container');
        addToLocalStorage(id, value);
        setBackToDefault();
    }else if(value.length && editFlag){
        editElement.innerHTML = grocery.value;
        displayAlert('value changed successfully', 'success');
        editLocalStorage(editID, value);
        setBackToDefault();
    }else{
        displayAlert('Please enter a value', 'danger');
    }
}
// Display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 3000);
}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((item) => {
            list.removeChild(item);
            removeFromLocalStorage(item.dataset.id);
        });
    }
    container.classList.remove('show-container');
    displayAlert('Items cleared successfully', 'success');
    // localStorage.removeItem('list');
    setBackToDefault();
}
// delete function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert('Items deleted successfully', 'danger');
    setBackToDefault();
    removeFromLocalStorage(id);
}
// edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitButton.innerHTML = "edit";
}
// ****** LOCAL STORAGE **********
function setBackToDefault(){
  console.log("setBackToDefault");
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitButton.textContent = "submit";
}

function addToLocalStorage(id, value){
    const grocery = {id:id, value:value};
    let items = localStorage.getItem('list');
    if(!items){
        items = [];
    }else{
        items = JSON.parse(items);
    }
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = JSON.parse(localStorage.getItem('list'));
    items = items.filter((item) => {
        if (item.id !== id){
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value){
    let items = JSON.parse(localStorage.getItem('list'));
    items = items.map((item) => {
        if(item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}
// localstorage API
// setItem
// getItem
// removeItem
// save as string
// localStorage.setItem('orange', JSON.stringify([1, 2, 3, 4, 5]));
// let oranges = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges);
// localStorage.removeItem('orange');

// ****** SETUP ITEMS **********
function setupItems(){
    let items = localStorage.getItem('list');
    if(!items){
        return;
    }else{
        items = JSON.parse(items);
    }
    items.forEach((item) => {
        const value = item.value;
        const id = item.id;
        const element = document.createElement('article');
        // add class to element
        element.classList.add('grocery-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`; 
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        // append child
        list.appendChild(element);
        // show container
        container.classList.add('show-container');
        setBackToDefault();
    });
}