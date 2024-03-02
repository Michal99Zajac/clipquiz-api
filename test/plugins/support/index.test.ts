import Fastify from 'fastify'
import t from 'tap'

import Support from '@/plugins/support'

t.test('support works standalone', async (t) => {
  const fastify = Fastify()
  void fastify.register(Support)
  await fastify.ready()

  t.equal('hugs', 'hugs')
})
