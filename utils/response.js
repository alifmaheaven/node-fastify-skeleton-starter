const created = (message = 'Success created data', values = {}, reply) => {
  return reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:201, message, data: values })
}

const ok = (message = 'Success', values = {}, reply) => {
  return reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:200, message, data: values })
}

const bad = async (message = 'Error', values = {}, reply) => {
  return reply
    .code(400)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:400, message, data: values })
}

const unauthorized = (message = 'Unauthorized', values = {}, reply) => {
  return reply
    .code(401)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:401, message, data: values })
}

const forbidden = (message = 'Forbidden', values = {}, reply) => {
  return reply
    .code(403)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:403, message, data: values })
}

const notFound = (message = 'Not Found', values = {}, reply) => {
  return reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:404, message, data: values })
}

const conflict = (message = 'Conflict', values = {}, reply) => {
  return reply
    .code(409)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:409, message, data: values })
}

const internal = (message = 'Internal Server Error', values = {}, reply) => {
  reply
    .code(500)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ code:500, message, data: values })
}

export default { created, ok, bad, unauthorized, forbidden, notFound, conflict, internal }
