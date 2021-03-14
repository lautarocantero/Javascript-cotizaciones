
//CONSTRUCTORES 
//del seguro
function Seguro(marca,year,tipo){

     this.marca = marca;
     this.year = year;
     this.tipo = tipo;

}

//realizar cotizacion de los datos
Seguro.prototype.cotizarSeguro = function (){
     /*
          1 = amer 1.15
          2 = asia 1.05
          3 = euro 1.35
     */ 

     let cantidad = 0;
     let base = 2000;

     switch (this.marca) {
          case '1':
               cantidad = base * 1.15;
               break;
          case '2':
               cantidad = base * 1.05;
               break;
          default:  cantidad = base * 1.35;
               break;
     }

     //leer año
     const diferencia = new Date().getFullYear() - this.year;

     //por cada año restar 3 porciento

     cantidad = ((diferencia * 3) * cantidad / 100 );

     /*
          si el seguro es basico se multiplica por un 30% más
          si el seguro es completo se multiplica por un 50% más
     */

     if(this.tipo === 'basico'){
          cantidad *= 1.30;
     }else{
          cantidad *= 1.50;
     }

     return cantidad;
}

//de la interfaze

function UI() {}

//llenar los year

UI.prototype.llenarOpciones =  () =>{

     const max = new Date().getFullYear();
     const min = max-20;

     const selectYear = document.querySelector('#year');

     for(let i =  max; i > min; i--){
          let opt = document.createElement('OPTION');
          opt.value = i;
          opt.textContent = i;
          selectYear.appendChild(opt);
     }

}

//muestra alertas en pantalla

UI.prototype.mostrarMensaje = (mensaje,tipo)=>{
     const div = document.createElement('DIV');

     if(tipo === 'error'){
          div.classList.add('error');
     }else{
          div.classList.add('correcto');
     }

     div.classList.add('mensaje','mt-10');
     div.textContent = mensaje;

     const formulario = document.querySelector('#cotizar-seguro');
     formulario.insertBefore(div,document.querySelector('#resultado'));

     setTimeout(() => {
          div.remove();
     }, 3000);

}

UI.prototype.mostrarResultado = (total,seguro) =>{

     const {marca,tipo,year} = seguro;

     let textoMarca;

     switch (marca) {
          case '1':
               textoMarca = 'Americano';
               break;
          case '2': textoMarca = 'Asiatico';
               break;
          default:  textoMarca = 'Europeo';
               break;
     }

     //crear el resultado
     const div = document.createElement('DIV');
     div.classList.add('mt-10');

     div.innerHTML = `
          <p class='header'>Tu resumen</p>
          <p class='font-bold'>Marca: <span class='font-normal'> ${textoMarca}</span> </p>
          <p class='font-bold'>Año: <span class='font-normal'> ${year}</span> </p>
          <p class='font-bold'>Tipo: <span class='font-normal capitalize'> ${tipo}</span> </p>
          <p class='font-bold'>Total: <span class='font-normal'> $ ${total}</span> </p>
     `;
     const resultadoDiv = document.querySelector('#resultado');
     

     //mostrar spinner
     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';

     setTimeout(() => {
          spinner.style.display = 'none';
          resultadoDiv.appendChild(div);
     }, 3000);

}

//instanciar UI

const ui = new UI();
console.log(ui);

//event listeners

document.addEventListener('DOMContentLoaded', () =>{
     ui.llenarOpciones();
});

eventListeners();

function eventListeners(){
     const formulario = document.querySelector('#cotizar-seguro');
     formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e){

     e.preventDefault();

     //leer la marca
     const marca = document.querySelector('#marca').value;

     //leer el año
     const year = document.querySelector('#year').value;

     //leer el tipo de cobertura

     const tipo = document.querySelector('input[name="tipo"]:checked').value;

     if( marca === '' || year === '' || tipo ===''){
          ui.mostrarMensaje('Error, faltan campos por llenar','error');
          return
     }
     ui.mostrarMensaje('Cotizando...','correcto');

     //ocultar cotizaciones previas

     const resultados = document.querySelector('#resultado div');
     if(resultados != null ){
          resultados.remove();
     }

     //instanciar el seguro

     const seguro = new Seguro(marca,year,tipo);
     const total = seguro.cotizarSeguro();

     //utilizar el prototipe que va a cotizar
     ui.mostrarResultado(total,seguro);

}




