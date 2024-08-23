// Definir la clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Crear obj productos disponibles
const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// Formatear totales números con punto decimal
function formatearNumero(numero) {
    return numero.toLocaleString('es-CL');
}

// Finalizar compra mostrar boleta
function finalizarCompra(carrito) {
    alert(carrito.mostrarDetalles());
}

// Definir la clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    calcularTotal() {
        return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }

    mostrarDetalles() {
        let detalles = 'Detalles de la compra:\n';
        this.productos.forEach(item => {
            const totalItem = item.producto.precio * item.cantidad;
            detalles += `${item.producto.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${formatearNumero(item.producto.precio)} - Total: $${formatearNumero(totalItem)}\n`;
        });
        detalles += `\nTotal Compra: $${formatearNumero(this.calcularTotal())}\n \n CREADO : ETIAN PARRA \n WEB : WWW.ETIANPARRA.CL \n FONO : 979628550`;
        return detalles;
    }
}

// Iniciar proceso de compra
$(document).ready(function () {
    $('#inicio').click(function () {
        iniciarCompra();
    });
});

function iniciarCompra() {
    const carrito = new Carrito();
    const productosInfo = productosDisponibles.map((p, index) => `${index + 1} - ${p.nombre} $${p.precio}`).join('\n');

    alert(`Productos disponibles:\n${productosInfo}`);

    function agregarAlCarrito() {
        let productoValido = false;

        while (!productoValido) {
            let productoSeleccionado = prompt(`Ingrese el número del producto que desea ingresar al carrito (1-5):\n${productosInfo}`);
            if (productoSeleccionado === null) {
                location.reload();
                return;
            } else {
                productoSeleccionado = parseInt(productoSeleccionado, 10) - 1;
                if (productoSeleccionado >= 0 && productoSeleccionado < productosDisponibles.length) {
                    let cantidad = prompt('Ingrese la cantidad del producto:');
                    if (cantidad === null) {
                        location.reload();
                        return;
                    } else {
                        cantidad = parseInt(cantidad, 10);
                        if (cantidad > 0) {
                            carrito.agregarProducto(productosDisponibles[productoSeleccionado], cantidad);
                            alert(`Producto ingresado: ${productosDisponibles[productoSeleccionado].nombre} - Cantidad: ${cantidad}`);
                            productoValido = true;
                        } else {
                            alert('Cantidad inválida. Inténtelo de nuevo.');
                        }
                    }
                } else {
                    alert('Número de producto inválido. Inténtelo de nuevo.');
                }
            }
        }

        let seguirAgregando = prompt('¿Desea seguir agregando productos al carrito? (s/n)').toLowerCase();
        if (seguirAgregando === null) {
            location.reload();
            return;
        } else if (seguirAgregando === 's' || seguirAgregando === 'si') {
            agregarAlCarrito();
        } else {
            finalizarCompra(carrito);
        }
    }

    agregarAlCarrito();
}
