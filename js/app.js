
//CONSTRUCTORES 
//del seguro
function seguro(marca,year,tipo){

     this.marca = marca;
     this.year = year;
     this.tipo = tipo;

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

//instanciar UI

const ui = new UI();
console.log(ui);

//event listeners

document.addEventListener('DOMContentLoaded', () =>{
     ui.llenarOpciones();
});



