# Proyecto Escaleno

## Configuración del proyecto

```sh
npm install
```

### Compilar y Recargar en Caliente para Desarrollo

```sh
npm run dev
```

### Compilar y Minimizar para Producción

```sh
npm run build
```

### Ejecutar Pruebas de Componentes con [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # o `npm run test:unit` para pruebas sin cabeza
```

### Ejecutar Pruebas de Extremo a Extremo con [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```
ARCHIVO PARA TESTEAR : dogs.cy.js

Esto ejecuta las pruebas de extremo a extremo contra el servidor de desarrollo de Vite. 
Es mucho más rápido que la compilación de producción.

Pero aún se recomienda probar la compilación de producción con `test:e2e` antes de desplegar (por ejemplo, en entornos CI):

```sh
npm run build
npm run test:e2e
```
