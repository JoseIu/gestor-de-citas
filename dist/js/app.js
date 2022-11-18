const formulario = document.getElementById('formulario');
const citas      = document.getElementById('citas');

const inputName      = document.getElementById('nombre');
const inputPhone     = document.getElementById('telefono');
const inputDate      = document.getElementById('fecha');
const inputHour      = document.getElementById('hora');
const inputSintomas  = document.getElementById('sintomas');

let clientes = [];


const eventListeners = () =>{
    formulario.addEventListener('submit', agregarCliente);

    
    inputName.addEventListener('blur', validar);
    inputPhone.addEventListener('blur', validar);
    inputDate.addEventListener('blur', validar);
    inputHour.addEventListener('blur', validar);
    inputSintomas.addEventListener('blur', validar);
    document.addEventListener('DOMContentLoaded',()=>{
        clientes = JSON.parse(localStorage.getItem('clientes') || []);
        insertarCliente();
    })
}
eventListeners();

//funciones
function validar (e){
    if(e.target.value.trim() === ''){
        console.log('esta vacio');
    }else{
        console.log('tiene algo');
    }
}
function agregarCliente  (e){
    e.preventDefault();

    const name      = inputName.value;
    const phone     = inputPhone.value;
    const date      = inputDate.value;
    const hour      = inputHour.value;
    const sintomas  = inputSintomas.value;

    const clientObjt = {
        id : Date.now(),
        name: name,
        date : date,
        phone: phone, 
        hour: hour,
        sintomas: sintomas,
    }

    clientes = [...clientes,clientObjt];
    console.log(clientes);

    insertarCliente();

    formulario.reset();

}
const insertarCliente = ()=>{
    limiarDom();
    if(clientes.length > 0){

        const fragment = document.createDocumentFragment();

        clientes.forEach( cliente =>{
            const article       = document.createElement('article');
            article.classList.add('cliente');

            //Datos
            //Nombre
            const div           = document.createElement('div');
            const nombreCliente = document.createElement('h2');
            const btn           = document.createElement('buttom');
            btn.onclick = ()=>{
                eliminarCliente(cliente.id)
            }

            nombreCliente.textContent = cliente.name;
            btn.textContent = 'X';
            
            div.classList.add('cliente__subcontainer');
            nombreCliente.classList.add('cliente__nombre');
            btn.classList.add('cliente__delete');
            
            div.append(nombreCliente, btn);
            article.append(div);

            //telefono
            const phone         = document.createElement('p');
            const phoneDate     = document.createElement('span');
            phone.textContent   = 'Telefono:';
            phoneDate.textContent = cliente.phone;

            phone.classList.add('cliente__telefono');
            phoneDate.classList.add('cliente__span');

            phone.append(phoneDate)
            article.append(phone);

            //fecha
            const date              = document.createElement('p');
            const dateDate          = document.createElement('span');
            date.textContent        = 'Fecha:';
            dateDate.textContent    = cliente.date;

            date.classList.add('cliente__fecha');
            dateDate.classList.add('cliente__span');

            date.append(dateDate)
            article.append(date);

            //hora
            const hour              = document.createElement('p');
            const hourDate          = document.createElement('span');
            hour.textContent        = 'Hora:';
            hourDate.textContent    = cliente.hour;

            hour.classList.add('cliente__fecha');
            hourDate.classList.add('cliente__span');

            hour.append(hourDate)
            article.append(hour);

            //sintomas
            const sintomas          = document.createElement('p');
            const sintomasDate      = document.createElement('span');
            sintomas.textContent    = 'Sintomas:';
            sintomasDate.textContent = cliente.sintomas;

            sintomas.classList.add('cliente__fecha');
            sintomasDate.classList.add('cliente__span');

            sintomas.append(sintomasDate);


            article.append(sintomas);
            fragment.append(article);
        })
        citas.append(fragment);
    }
    Storage();
}

const limiarDom =()=>{
    while(citas.firstChild){
        citas.removeChild(citas.firstChild)
    }
}

const eliminarCliente = (id) =>{
    clientes = clientes.filter( cliente => cliente.id !== id);
    insertarCliente();
}

const Storage = ()=>{
    localStorage.setItem('clientes', JSON.stringify(clientes));
}