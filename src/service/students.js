
module.exports = (knex) => {
  return {
    async create(personId) {
      await knex('students').insert({ personId })
      return { personId }
    }
  }
}
