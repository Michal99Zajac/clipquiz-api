import t from 'tap'

import fastify from '@/index'

t.test('default root route', async (t) => {
  const res = await fastify.inject({
    url: '/',
  })

  t.matchOnlyStrict(JSON.parse(res.payload), { root: true })
})
