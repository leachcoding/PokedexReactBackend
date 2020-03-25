require('dotenv').config()



describe('Server operating in correct environment', () => {
  it('Server working in test environoment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
})
