import fastify from '@/index'

test('default root route', async () => {
  await fastify.ready()

  const response = await fastify.inject({
    method: 'GET',
    url: '/',
  })

  const data = JSON.parse(response.payload)

  expect(data).toEqual({ root: true })

  fastify.close()
})
