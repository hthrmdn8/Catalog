const uri = 'items';
let todos = [];

function getItems() {

  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addPriceTextbox = document.getElementById('add-price');

  const item = {
    didWork: false,
    name: addNameTextbox.value.trim(),
    price: addPriceTextbox.value,

  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addPriceTextbox.value = '';

    })
    //.catch(error => console.error('Unable to add item.', error));
};

function deleteItem(event) {
  event.preventDefault();
  const providedId = event.target.dataset.itemId
  fetch(`${uri}/${providedId}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(event) {
  event.preventDefault();
  
  //console.dir(event)
 // console.dir(event.target)
  //console.log(event.target.dataset)
  const providedId = event.target.dataset.itemId

  const item = todos.find(item => item.id === providedId);

  // console.log(item)


  // let item = {
  //   '98-ty-336-ugbn':""
  // }
  // item.98-ty-336-ugbn
  // let todos = [
  //     {
  //       createdDate: "7/2/22",
  //       id: "ddddfffeee-fafea-....-.....",
  //       name: "",
  //       price: 0
  //     },
  //     {
  //       createdDate: "7/2/22",
  //       id: "ddddfffeee-fafea-....-.....",
  //       name: "",
  //       price: 0
  //     },
  //     {
  //       createdDate: "7/2/22",
  //       id: "ddddfffeee-fafea-....-.....",
  //       name: "",
  //       price: 0
  //     },
  // ]
  // item.ddddfffeee-fafea-....-.....
  // The issue with the line below was that you were attempting to access the object (item) by a property key eqaul to id provided as an argument to this function.
  // const item = todos.find(item => item.providedId === providedId);
  
  // const item = todos.find(item => item.id === providedId[0]);

  // for (let i = 0; i < todos.length; i++) {
  //   const item = todos[i];
    
  // }

  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-price').value = item.price;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    name: document.getElementById('edit-name').value.trim(),
    price: document.getElementById('edit-price').value
  };
  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));
  closeInput();
  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  //if statement (ternary statement) condition ? if : else
  const name = (itemCount === 1) ? 'catalog' : 'catalogs';
  // What the ternary statement is doing:
  // let name;
  // if(itemCount === 1){
  //   name = 'catalog'
  // }else{
  //   name = 'catalogs'
  // }

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    // console.log(item)
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;

    // console.dir(isCompleteCheckbox)
    // console.log(isCompleteCheckbox)

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.dataset.itemId = item.id;

    editButton.addEventListener('click', displayEditForm)
    // editButton.setAttribute('onclick', `displayEditForm(${idArr})`);
    // createdImg.setAttribute('src', `https://www,imgae.com`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.dataset.itemId = item.id;
    deleteButton.addEventListener('click', deleteItem)

    //deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let textNode = document.createTextNode(item.name);
    td1.appendChild(textNode);

    let td2 = tr.insertCell(1);
    let priceNode = document.createTextNode(item.price);
    td2.appendChild(priceNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  todos = data;
  // console.log(todos)
}