# 📌 Explicación de los Métodos de Promise

En JavaScript, las promesas son una forma de manejar operaciones asíncronas. Existen métodos como `Promise.race()`, `Promise.any()` y `Promise.all()` que permiten gestionar múltiples promesas de diferentes maneras.

---

## 🔹 Promise.race()

### 📌 **¿Qué es?**
`Promise.race()` devuelve una promesa que se resuelve o se rechaza tan pronto como la primera promesa del array dado finaliza (ya sea resuelta o rechazada). Es útil cuando queremos obtener el resultado más rápido de varias promesas sin importar su estado.

### ✅ **Ejemplo:**
```javascript
const promise1 = new Promise((resolve) => setTimeout(resolve, 500, '🟢 Resuelta en 500ms'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 300, '✅ Resuelta en 300ms'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 700, '🔵 Resuelta en 700ms'));

Promise.race([promise1, promise2, promise3]).then(console.log);  
// Salida: ✅ Resuelta en 300ms
```

### 📌 **Caso de uso real:**
Se puede usar `Promise.race()` cuando queremos obtener la respuesta más rápida de múltiples servidores para mejorar el rendimiento de una aplicación web.

---

## 🔹 Promise.any()

### 📌 **¿Qué es?**
`Promise.any()` devuelve la primera promesa que se resuelve con éxito, ignorando las promesas rechazadas. Si todas las promesas fallan, devuelve un error `AggregateError`.

### ✅ **Ejemplo:**
```javascript
const p1 = new Promise((_, reject) => setTimeout(reject, 200, '❌ Falló 1'));
const p2 = new Promise((resolve) => setTimeout(resolve, 400, '✅ Éxito 2'));
const p3 = new Promise((_, reject) => setTimeout(reject, 300, '❌ Falló 3'));

Promise.any([p1, p2, p3])
  .then(console.log) // ✅ Éxito 2
  .catch((error) => console.log('Todas fallaron:', error));
```

### 📌 **Caso de uso real:**
`Promise.any()` es útil cuando queremos probar múltiples fuentes de datos y obtener el primer resultado exitoso. Por ejemplo, conectarse a diferentes servidores y utilizar el primero que responda.

---

## 🔹 Promise.all()

### 📌 **¿Qué es?**
`Promise.all()` espera a que todas las promesas se resuelvan correctamente. Si alguna falla, toda la operación se rechaza con el error de la primera promesa que falle.

### ✅ **Ejemplo:**
```javascript
const fetchUser = new Promise((resolve) => setTimeout(resolve, 400, { name: "Juan" }));
const fetchPosts = new Promise((resolve) => setTimeout(resolve, 600, ["Post 1", "Post 2"]));

Promise.all([fetchUser, fetchPosts])
  .then(([user, posts]) => console.log("Usuario:", user, "Posts:", posts))
  .catch(console.error);
```

### 📌 **Caso de uso real:**
Se usa `Promise.all()` cuando necesitamos obtener múltiples recursos antes de continuar con la ejecución del programa. Un caso típico es cargar datos de usuario y publicaciones en una aplicación antes de renderizar la interfaz.

---