// import { create } from 'node:domain'

import { createServer } from 'node:http'
import {json} from 'node:stream/consumers'  
import {randomUUID} from 'node:crypto'

process.loadEnvFile(); // carga las variables desde el .env 

const port = process.env.PORT || 3000
 
function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
}

const users = [
  {
    id: 1,
    name: "Samu",
  },
  {
    id: 2,
    name: "Marta",
  },
  {
    id: "85ef87f9-703d-4d20-ad1c-23352c030436",
    name: "maquina",
  },
  {
    id: "de2ff1d5-9266-4a15-b685-00875b0a42e6",
    name: "Maria",
  },
];

const server = createServer(async (req, res) => { // necesitamos async porque vamos a leer el cuerpo de la petición, que es una operación asíncrona
    // {method, url} = req es lo mismo que const method = req.method y const url = req.url
    const {  method, url } = req 
    console.log(`${method} ${url}`) // para ver el método y la url de cada petición que llega al servidor

    const [pathname, querystring] = url.split('?') // separamos la url en el pathname y la query string, si es que tiene una query string

    const searchParams = new URLSearchParams(querystring) // parseamos la query string para poder acceder a sus parámetros de forma más cómoda

    // if (method !== 'GET') { // solo permitimos el método GET, si es otro método, respondemos con un error 405
    //     return sendJson(res, 405, { error: 'Method not allowed' });
    // }

    if ( method === "GET"){
        if (pathname === '/users') { // si la url es /users, respondemos con una lista de usuarios en formato JSON

            // if (
            //     Number.isNaN(Number(searchParams.get('limit') || '0')) || // '0' es un valor válido para el límite, por eso lo ponemos como valor por defecto en caso de que no se haya especificado en la query string
            //     Number.isNaN(Number(searchParams.get('offset') || '0'))) { // si el límite o el offset no son números, respondemos con un error 400, pero el 0 es un valor válido para ambos, por eso lo ponemos como valor por defecto en caso de que no se haya especificado en la query string
            //     return sendJson(res, 400, { error: 'Limit and offset must be numbers' });
            // }

            const limit = Number(searchParams.get('limit')) || users.length; // si se ha especificado un límite en la query string, lo usamos, si no, usamos el número total de usuarios
            const offset = Number(searchParams.get('offset')) || 0; // si se ha especificado un offset en la query string, lo usamos, si no, usamos 0
            const paginatedUsers = users.slice(offset, offset + limit); // obtenemos la lista de usuarios paginada según el límite y el offset
            return sendJson(res, 200, paginatedUsers); // respondemos con la lista de usuarios paginada
            }

        if (url === '/health') { // endpoint de salud para comprobar que el servicio está funcionando o si esta levantado durante mucho tiempo.
            return sendJson( res, 200, { status: 'ok', uptime: process.uptime() });
        }
    }

    if (url === '/') { // si la url es la raíz, respondemos con un mensaje de bienvenida
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        return res.end('Hello desde node 😠')
    }

    if ( method === 'POST'){
        if (url === '/users') { // si la url es /users, respondemos con una lista de usuarios en formato JSON
            const body = await json(req) // para leer el cuerpo de la petición, que se espera que sea un JSON con el nombre del usuario a crear
            
            if (!body || !body.name){
                return sendJson(res, 400, { error: 'Name is required' });
            }
            
            const newUser = { // creamos un nuevo usuario con un id aleatorio y el nombre que nos han enviado en el cuerpo de la petición
                id: randomUUID(), 
                name: body.name 
            } 
            users.push(newUser) // añadimos el nuevo usuario a la lista de usuarios

            return sendJson(res, 201, { message: 'Usuario creado' });
        }
    }

    return sendJson(res, 404, { error: 'Not found' }); // si la url no coincide con ninguna de las anteriores, respondemos con un error 404
}) 

server.listen(port, () => {
    const address = server.address() 
    console.log(`Server is listening on http://localhost:${address.port}`)
})