# Patrones Creacionales 
---
## Patrón Adapter


* Convierte la interfaz de una clase en otra interfaz que es la que esperan los clientes.
* Permite que cooperen clases con interfaces incompatibles.

---

## Escenario 01:

Supongamos que en una Empresa de almacenamiento existe la necesidad de registrar la temperatura en diferentes bloques del edificio. 
Se han comprado dispositivos que miden en **Celsius**, pero luego se compró un dispositivo que almacenaba en **Fahrenheit**.  
Es este contexto, necesitamos una interfaz que me permita trabajar con los datos de temperatura retornados por los diferentes dispositivos de una sola manera adaptada para los sistemas internos.


