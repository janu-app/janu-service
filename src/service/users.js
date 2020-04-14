
module.exports = (knex) => {
  return {
    async me({ uid }) {
      return await knex.select()
        .from('users')
        .first()
        .leftJoin('people', 'users.person_id', 'people.id')
        .where({
          uid
        })
    }
  }
}