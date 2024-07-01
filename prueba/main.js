document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        
        // Validar campos obligatorios
        if (!nombre || !apellido || !email || !telefono) {
            Swal.fire({
                title: "Error",
                text: "Por favor completa todos los campos del formulario.",
                icon: "error"
            });
            return;
        }

        // Validar formato de correo electrónico
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                title: "Error",
                text: "El correo electrónico debe ser una dirección válida de Gmail o Hotmail.",
                icon: "error"
            });
            return;
        }

        // Validar formato de teléfono (10 dígitos numéricos)
        const telefonoPattern = /^[0-9]{10}$/;
        if (!telefonoPattern.test(telefono)) {
            Swal.fire({
                title: "Error",
                text: "El número de teléfono debe contener exactamente 10 dígitos numéricos.",
                icon: "error"
            });
            return;
        }

        // Si todos los campos son válidos, mostrar mensaje de éxito y enviar el formulario
        Swal.fire({
            title: "Felicidades, entraste a la página",
            text: "¡Enviaste el formulario!",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formulario").submit(); // Enviar el formulario después de cerrar la alerta
            }
        });
    });
});
    
        
// Variable para almacenar los productos del carrito
let allProducts = [];

// Función para mostrar los productos en el carrito
const showCartProducts = () => {
    const rowProduct = document.querySelector('.row-product');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');

    // Limpiar HTML del carrito
    rowProduct.innerHTML = '';

    // Variables para calcular el total y cantidad de productos
    let total = 0;
    let totalOfProducts = 0;

    // Iterar sobre todos los productos en el carrito
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;

        rowProduct.appendChild(containerProduct);

        // Calcular el total y cantidad de productos
        total += parseInt(product.quantity) * parseInt(product.price.slice(1));
        totalOfProducts += product.quantity;
    });

    // Mostrar o ocultar mensaje de carrito vacío y total
    if (allProducts.length === 0) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Actualizar total y cantidad de productos en el carrito
    valorTotal.textContent = `$${total}`;
    countProducts.textContent = totalOfProducts;
};

// Función para agregar producto al carrito
const addToCart = (title, price) => {
    const exists = allProducts.some(product => product.title === title);

    if (exists) {
        // Incrementar la cantidad si el producto ya está en el carrito
        allProducts = allProducts.map(product => {
            if (product.title === title) {
                return { ...product, quantity: product.quantity + 1 };
            } else {
                return product;
            }
        });
    } else {
        // Agregar nuevo producto al carrito
        allProducts.push({
            title: title,
            price: price,
            quantity: 1
        });
    }

    // Guardar en localStorage
    localStorage.setItem('cartProducts', JSON.stringify(allProducts));

    // Mostrar los productos actualizados en el carrito
    showCartProducts();
};

// Event listener para los botones "Añadir al carrito"
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.item');
        const title = product.querySelector('h5').textContent;
        const price = product.querySelector('.price').textContent;

        addToCart(title, price);
    });
});

// Event listener para abrir y cerrar el carrito
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Event listener para eliminar producto del carrito
document.querySelector('.row-product').addEventListener('click', function(event) {
    if (event.target.classList.contains('icon-close')) {
        // Obtener el elemento del producto que se va a eliminar
        const productElement = event.target.closest('.cart-product');
        
        // Obtener el título del producto que se va a eliminar
        const title = productElement.querySelector('.titulo-producto-carrito').textContent;

        // Filtrar el producto del array allProducts
        allProducts = allProducts.filter(product => product.title !== title);

        // Guardar en localStorage
        localStorage.setItem('cartProducts', JSON.stringify(allProducts));

        // Mostrar los productos actualizados en el carrito
        showCartProducts();
    }
});

// Función para cargar productos del carrito desde localStorage al cargar la página
const loadCartProducts = () => {
    const storedProducts = localStorage.getItem('cartProducts');
    if (storedProducts) {
        allProducts = JSON.parse(storedProducts);
        showCartProducts();
    }
};

// Mostrar productos de yerba al cargar la página
window.onload = () => {
    // Cargar productos del carrito desde localStorage
    loadCartProducts();

    // Aquí puedes inicializar la página, cargar productos, etc.
    // En este caso, mostrar los productos de yerba al inicio
    displayYerbaProducts();
};

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

//carrusel en formas de pago
document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper('.awb-swiper', {
      slidesPerView: 6,
      spaceBetween: 13,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.awb-swiper-button-next',
        prevEl: '.awb-swiper-button-prev',
      },
    });
  });

//scroll de la pagina hacia la ubicacion
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});