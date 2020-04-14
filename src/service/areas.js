
module.exports = (knex) => {
    return {
      async list() {
        const results = await knex.select().from('areas')
        return { results }
      },

    }
  }