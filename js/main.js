// Cargar servicios desde el json local
fetch('./data/services.json')
  .then((response) => response.json())
  .then((data) => {
    console.log('Datos de servicios:', data); // Verificar datos devueltos

    // Verificar que data exista y sea un array
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('El formato de los datos no es válido.');
    }

    const services = data.data.filter((service) => service.activo); // Filtrar servicios activos
    const servicesContainer = document.getElementById('services-container');

    if (services.length === 0) {
      servicesContainer.innerHTML =
        '<p>No se encontraron servicios disponibles.</p>';
    } else {
      services.forEach((service) => {
        const serviceCard = `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${service.titulo.esp}</h5>
                <p class="card-text">${service.descripcion.esp}</p>
              </div>
            </div>
          </div>
        `;
        servicesContainer.innerHTML += serviceCard;
      });
    }
  })
  .catch((error) => {
    console.error('Error cargando los servicios:', error);
    document.getElementById(
      'services-container'
    ).innerHTML = `<p>Error al cargar los servicios. ${error.message}</p>`;
  });

// Cargar datos de "Nosotros" desde el json local
fetch('./data/about-us.json')
  .then((response) => response.json())
  .then((data) => {
    console.log('Datos de "Nosotros":', data); // Verificar datos devueltos

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('El formato de los datos no es válido.');
    }

    const aboutUsContainer = document.getElementById('about-us-content');
    aboutUsContainer.innerHTML = '';

    data.data.forEach((section) => {
      const sectionContent = `
        <h3>${section.titulo.esp}</h3>
        <p>${section.descripcion.esp}</p>
      `;
      aboutUsContainer.innerHTML += sectionContent;
    });
  })
  .catch((error) => {
    console.error('Error cargando "Nosotros":', error);
    document.getElementById(
      'about-us-content'
    ).innerHTML = `<p>Error al cargar la información de "Nosotros". ${error.message}</p>`;
  });

// Validar y manejar el formulario de contacto
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const service = document.getElementById('service').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validación
  if (!name || !service || !message) {
    alert(
      'Por favor, complete todos los campos antes de enviar el formulario.'
    );
    return;
  }

  document.getElementById('form-response').innerText =
    'Mensaje enviado exitosamente.';
});
