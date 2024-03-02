import t from 'tap'

import fastify from '@/index'

t.test('example is loaded', async (t) => {
  const res = await fastify.inject({
    url: '/example',
  })

  t.equal(res.payload, 'this is an example')
})
