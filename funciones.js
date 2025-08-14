const svg = document.getElementById('svg1');
const grupo = document.getElementById('grupo-provincias');
const paths = Array.from(grupo.querySelectorAll('path'));
const originalViewBox = svg.getAttribute('viewBox'); // guarda para restaurar

// Datos (ejemplo)
const datosProvincias = {
  departamento_1: {
    nombre: "Zelenik",
    habitantes: "2,150,000",
    produccion: "----",
    ejercito: "1200 soldados",
  },
  departamento_2: {
    nombre: "Drovnik",
    habitantes: "850,000",
    produccion: "Explotación maderera ",
    ejercito: "---------"
  },
  departamento_3: {
    nombre: " Karnov",
    habitantes: "1,500,000",
    produccion: "-----",
    ejercito: "-------"
    // No tiene capital
  },
   departamento_4: {
    nombre: "Volshka",
    habitantes: "1,800,000",
    produccion: "------",
    ejercito: "------"
    // No tiene capital
  },
   departamento_5: {
    nombre: "Tarnovia",
    habitantes: "1,200,000",
    produccion: "-----",
    ejercito: "----"
    // No tiene capital
  },
   departamento_6: {
    nombre: "Belgor",
    habitantes: "1,100,000",
    produccion: "-----",
    ejercito: "-----"
    // No tiene capital
  },
   departamento_7: {
    nombre: "Rostek",
    habitantes: "950,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  },
   departamento_8: {
    nombre: "Svetograd",
    habitantes: "800,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  },
   departamento_9: {
    nombre: "Mirovia",
    habitantes: "700,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  },
   departamento_9: {
    nombre: "Kresnik",
    habitantes: "650,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  },
   departamento_10: {
    nombre: "Vladek",
    habitantes: "600,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  },
   departamento_11: {
    nombre: "Novagrad",
    habitantes: "3,600,000",
    produccion: "-----",
    ejercito: "-----",
    capital: "Novagrad" 
  },
   departamento_12: {
    nombre: "Orlovia",
    habitantes: "550,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  },
   departamento_13: {
    nombre: "Zarnov",
    habitantes: "400,000",
    produccion: "-----",
    ejercito: "-----",
    // No tiene capital
  }
};

function zoomToPath(el, scale = 1.8, padding = 6, duration = 500) {
  const bbox = el.getBBox();

  // Centro del path
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  // ViewBox original
  const [origX, origY, origW, origH] = originalViewBox.split(' ').map(Number);

  // Medidas reales del contenedor
  const contenedor = document.querySelector('.contenedor');
  const rect = contenedor.getBoundingClientRect();
  const aspectRatio = rect.width / rect.height;

  // Tamaño escalado
  let w = bbox.width * scale + padding;
  let h = bbox.height * scale + padding;

  // Mantener proporción del contenedor
  if (w / h > aspectRatio) {
    h = w / aspectRatio;
  } else {
    w = h * aspectRatio;
  }

  // Calcular coordenadas para centrar en el contenedor
  let x = cx - w / 2;
  let y = cy - h / 2;

  // Evitar que se salga del área original
  x = Math.max(origX, Math.min(x, origX + origW - w));
  y = Math.max(origY, Math.min(y, origY + origH - h));

  // Animación suave usando requestAnimationFrame
  const [startX, startY, startW, startH] = svg.getAttribute('viewBox').split(' ').map(Number);
  const startTime = performance.now();

  function animateZoom(time) {
    const t = Math.min((time - startTime) / duration, 1); // progreso 0 → 1

    // interpolación lineal
    const newX = startX + (x - startX) * t;
    const newY = startY + (y - startY) * t;
    const newW = startW + (w - startW) * t;
    const newH = startH + (h - startH) * t;

    svg.setAttribute('viewBox', `${newX} ${newY} ${newW} ${newH}`);

    if (t < 1) requestAnimationFrame(animateZoom);
  }

  requestAnimationFrame(animateZoom);
}

function mostrarInfo(datos) {
  const nombre = document.getElementById("info-Nombre");
  const produccion = document.getElementById("info-produccion");
  const habitantes = document.getElementById("info-habitantes");
  const ejercito = document.getElementById("info-ejercito");
  const capital = document.getElementById("info-capital");

  nombre.textContent = `Nombre: ${datos?.nombre ?? "?"}`;
  produccion.textContent = `Producción: ${datos?.produccion ?? "?"}`;
  habitantes.textContent = `Habitantes: ${datos?.habitantes ?? "?"}`;
  ejercito.textContent = `Guarnición: ${datos?.ejercito ?? "?"}`;

  if (datos?.capital) {
    capital.style.display = "block";
    capital.textContent = `Capital: ${datos.capital}`;
  } else {
    capital.style.display = "none";
  }
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


const sidebar2 = document.querySelector(".sidebar2");
const mainToggle2 = document.querySelector(".main-toggle2");

// Mostrar/ocultar el panel completo
mainToggle2.addEventListener("click", function () {
  sidebar2.classList.toggle("oculto2");
});

// Subpaneles individuales
const accordions2 = document.querySelectorAll(".accordion2");

accordions2.forEach(btn => {
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
    zoomToPath(p, 5.0, 30);

    
    // Mostrar info (tu tarjeta)
    const datos = datosProvincias[p.id];
    mostrarInfo(datos);
  });
});

// clic fuera del mapa para cerrar/volver
svg.addEventListener('click', () => {
  resetZoom();
});



// botón cerrar
function cerrarTarjeta() { resetZoom(); }
