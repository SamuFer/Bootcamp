import os from 'node:os'
import ms from 'ms'

console.log('Información del sistema operativo:')

console.log('Tipo de sistema:', os.type()) // Muestra el tipo de sistema operativo (e.g., 'Windows_NT', 'Linux', 'Darwin')
console.log('Plataforma:', os.platform()) // Muestra la plataforma del sistema operativo (e.g., 'win32', 'linux', 'darwin')
console.log('Arquitectura:', os.arch()) // Muestra la arquitectura del sistema (e.g., 'x64', 'arm64')
console.log('Memoria total (bytes):', os.totalmem())
console.log('Memoria libre (bytes):', os.freemem())
console.log('Directorio home:', os.homedir()) // Muestra el directorio home del usuario
console.log('Tiempo de actividad del sistema:', ms(os.uptime() * 1000,{ long: true })) // Muestra el tiempo de actividad del sistema en segundos

console.log('-------------------------------')
console.log('Número de CPUs:', os.cpus()) // Muestra el número de núcleos de CPU disponibles
console.log('-------------------------------')
