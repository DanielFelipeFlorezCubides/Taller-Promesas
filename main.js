// Función para generar un tiempo de espera aleatorio entre 1 y 3 segundos
function tiempoAleatorio() {
    return Math.floor(Math.random() * 3000) + 1000; // Entre 1000ms (1s) y 4000ms (4s)
}

// Funciones de prueba que simulan promesas con tiempos aleatorios
function tareaRapida() {
    return new Promise(resolve => setTimeout(() => resolve("Tarea rápida completada"), tiempoAleatorio()));
}

function tareaMedia() {
    return new Promise(resolve => setTimeout(() => resolve("Tarea media completada"), tiempoAleatorio()));
}

function tareaLenta() {
    return new Promise(resolve => setTimeout(() => resolve("Tarea lenta completada"), tiempoAleatorio()));
}

function tareaFallida() {
    return new Promise((_, reject) => setTimeout(() => reject("Tarea fallida"), tiempoAleatorio()));
}

// Ejemplo de Promise.race
// Devuelve la primera promesa que se resuelva o rechace
function ejecutarRace() {
    return Promise.race([tareaRapida(), tareaMedia(), tareaLenta()]);
}

// Ejemplo de Promise.any
// Devuelve la primera promesa que se resuelva, ignorando las que fallan
function ejecutarAny() {
    return Promise.any([tareaFallida(), tareaRapida(), tareaMedia(), tareaLenta()]);
}

// Ejemplo de Promise.all
// Espera a que todas las promesas se resuelvan o falla si alguna falla
function ejecutarAll() {
    return Promise.all([tareaRapida(), tareaMedia(), tareaLenta()]);
}

// Menú interactivo para seleccionar qué método de promesas ejecutar
function menuInteractivo() {
    let opcion = prompt("Elige una opción:\n1. Promise.race\n2. Promise.any\n3. Promise.all\n4. Salir");
    let promesa;
    
    if (opcion === "1") {
        promesa = ejecutarRace();
    } else if (opcion === "2") {
        promesa = ejecutarAny();
    } else if (opcion === "3") {
        promesa = ejecutarAll();
    } else if (opcion === "4") {
        alert("Saliendo del menú");
        return;
    } else {
        alert("Opción no válida, intenta de nuevo");
        return menuInteractivo();
    }
    
    // Manejo de la promesa seleccionada
    promesa
        .then(resultado => alert("Resultado: " + (Array.isArray(resultado) ? resultado.join(", ") : resultado)))
        .catch(error => alert("Error: " + error))
        .finally(() => menuInteractivo()); // Reinicia el menú después de mostrar el resultado
}

// Ejecutar el menú al cargar la página
menuInteractivo();