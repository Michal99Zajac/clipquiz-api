import t from 'tap'

t.test('default root route', async (t) => {
  t.matchOnlyStrict({ root: true }, { root: true })
})
