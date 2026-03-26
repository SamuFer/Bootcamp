import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {join, basename, extname} from 'node:path'

let content = ''

if (process.permission.has('fs.read','archivo.txt')) { // Verifica si el proceso tiene permisos de lectura y escritura en el sistema de archivos usando process.permission.has()
    content = await readFile('archivo.txt', 'utf8'); // Lee el contenido del archivo como una cadena de texto si se especifica 'utf8' como segundo argumento o parámetro
    console.log(content);
} else {
    console.log('No tienes permisos para leer el archivo');
}

if(process.permission.has('fs.write','output/files/documents')) { // Verifica si el proceso tiene permisos de escritura en el sistema de archivos usando process.permission.has()
    
    const outputDir = join('output','files','documents') // Construye la ruta del directorio de salida usando join() para asegurar que los separadores de ruta sean correctos según el sistema operativo
    await mkdir(outputDir, {recursive: true}) // Crea el directorio de salida usando mkdir() con la opción recursive para crear cualquier carpeta intermedia que no exista

    const uppercaseContent = content.toUpperCase() // Convierte el contenido a mayúsculas usando el método toUpperCase()
    const outputFilePath = join(outputDir, 'archivo-uppercase.txt') // Construye la ruta completa del archivo de salida usando join()

    console.log('El nombre del archivo es: ',basename(outputFilePath)); // Obtiene el nombre del archivo de la ruta completa usando basename()
    console.log('La extensión del archivo es: ',extname(outputFilePath)); // Obtiene la extensión del archivo de la ruta completa usando extname()

    await writeFile(outputFilePath, uppercaseContent) // Escribe el contenido modificado de nuevo en el archivo usando writeFile() pero await se usa para esperar a que la operación de escritura se complete y no uso async porque el entorno lo soporta de forma nativa
    console.log('Archivo creado con contenido en mayusculas usando join')

} else {
    console.log('No tienes permisos para escribir en el directorio especificado.'); 
}