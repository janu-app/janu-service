
let handle = action => (req, res, next) => action(req, res).catch(next)

module.exports = { handle }