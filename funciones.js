const svg = document.getElementById('svg1');
const grupo = document.getElementById('grupo-provincias');
const paths = Array.from(grupo.querySelectorAll('path'));
const originalViewBox = svg.getAttribute('viewBox'); // guarda para restaurar

// Datos (ejemplo)
const datosProvincias = {
  departamento_8: {
    nombre: "Provincia Norte",
    capital: "Karovgrad",
    produccion: "Hierro, madera",
    ejercito: "1200 soldados"
  }
};

function zoomToPath(el, scale = 1.8, padding = 6) {
  const bbox = el.getBBox();
  
  // Centro del path
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  
  // Tamaño escalado
  let w = bbox.width * scale + padding;
  let h = bbox.height * scale + padding;

  // Ajustar proporción al del SVG
  const vb = svg.viewBox.baseVal; // viewBox actual
  const aspectRatio = vb.width / vb.height;

  if (w / h > aspectRatio) {
    // Muy ancho → aumentar altura
    h = w / aspectRatio;
  } else {
    // Muy alto → aumentar ancho
    w = h * aspectRatio;
  }

  // Calcular nueva esquina sup izq
  const x = cx - w / 2;
  const y = cy - h / 2;

  svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
}

function resetZoom() {
  svg.setAttribute('viewBox', originalViewBox);
  paths.forEach(p => p.style.opacity = '');
  document.getElementById('tarjeta-provincia').classList.add('oculto');
}




const sidebar = document.querySelector(".sidebar");
const mainToggle = document.querySelector(".main-toggle");

// Mostrar/ocultar el panel completo
mainToggle.addEventListener("click", function () {
  sidebar.classList.toggle("oculto");
});

// Subpaneles individuales
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(btn => {
  btn.addEventListener("click", function () {
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});


paths.forEach(p => {
  p.style.cursor = 'pointer';
  p.addEventListener('click', e => {
    e.stopPropagation();
    // Traer al frente para que no quede tapado (opcional)
    grupo.appendChild(p);

    // Atenuar las demás provincias
    paths.forEach(pp => pp.style.opacity = (pp === p ? '1' : '0.25'));

    // Zoom centrado
    zoomToPath(p, 1.8, 10);

    // Mostrar info (tu tarjeta)
    const datos = datosProvincias[p.id];
    if (datos) {
      document.getElementById("nombre-provincia").textContent = datos.nombre;
      document.getElementById("info-capital").textContent = `Capital: ${datos.capital}`;
      document.getElementById("info-produccion").textContent = `Producción: ${datos.produccion}`;
      document.getElementById("info-ejercito").textContent = `Ejército: ${datos.ejercito}`;
      document.getElementById("tarjeta-provincia").classList.remove("oculto");
    }
  });
});

// clic fuera del mapa para cerrar/volver
svg.addEventListener('click', () => resetZoom());
document.getElementById('tarjeta-provincia').addEventListener('click', e => e.stopPropagation());

// botón cerrar
function cerrarTarjeta() { resetZoom(); }

