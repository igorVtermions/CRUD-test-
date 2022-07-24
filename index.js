const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.getElementById('m-name')
const sFunction = document.getElementById('m-function')
const sEmail = document.getElementById('m-email')
const btnSave = document.getElementById('btnsave')

let itens
let id

function openModal (edit = false, index = 0){
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-conteiner') !== -1){
            modal.classList.remove('active')
        }
    }

    if(edit){
        sName.value = itens[index].name
        sFunction.value = itens[index].function
        sEmail.value = itens[index].email
        id = index
    }
    else{
        sName.value = ''
        sFunction.value = ''
        sEmail.value = ''
    }
}

function editItem(index){
    openModal(true, index)
}

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.function}</td>
    <td>${item.email}</td>
    <td class="action">
    <button onclick="editItem(${index})"><i class='bx bx-edit-alt'></i></button>
  </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bxs-trash-alt'></i></button>
    </td>
    `

    tbody.appendChild(tr)
}

btnSave.onclick = e => {
    if(sName.value == '' || sFunction.value == '' || sEmail.value == ''){
        return
    }

    e.preventDefault();

    if(id !== undefined){
        itens[id].name = sName.value
        itens[id].function = sFunction.value
        itens[id].email = sEmail.value
    }
    else{
        itens.push({'name': sName.value, 'function': sFunction.value, 'email': sEmail.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}
function loadItens(){
    itens = getItensBD()
    tbody.innerHTML=''
    itens.forEach((item, index) =>{
        insertItem(item,index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()