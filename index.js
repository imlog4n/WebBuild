const router = require("./router");

module.exports = {
    get: router.get,
    file: router.file,
    post: router.post,
    put: router.put,
    delete: router.delete,
    port: router.listen
}