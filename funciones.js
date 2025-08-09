const datosProvincias = {
    departamento_8: {
    nombre: "Provincia Norte",
    capital: "Karovgrad",
    produccion: "Hierro, madera",
    ejercito: "1200 soldados"
    }
    //---------agregar mas------------
};

document.addEventListener("DOMContentLoaded", ()=>{
    Object.keys(datosProvincias).forEach(id => {
        const path = document.getElementById(id);
        if (path){
            path.style.cursor = "pointer";
            path.addEventListener("click",()=> mostrarTarjeta(id));
        }
    });
});

function mostrarTarjeta(id) {
    const datos = datosProvincias[id];
    if (!datos)return;

    document.getElementById("nombre-provincia").textContent = datos.nombre;
    document.getElementById("info-capital").textContent = `Capital: ${datos.capital}`;
    document.getElementById("info-produccion").textContent = `Producción: ${datos.produccion}`;
    document.getElementById("info-ejercito").textContent = `Ejército: ${datos.ejercito}`;

    document.getElementById("tarjeta-provincia").classList.remove("oculto");
    document.getElementById("contenedor").style.filter = "none";
}

function cerrarTarjeta(){
    document.getElementById("tarjeta-provincia").classList.add("oculto");
    document.getElementById("contenedor").style.filter = "none";

}