const router = require("./router");
const path = require("path");

module.exports = {
    get: router.get,
    getFile: router.getFile
    post: router.post,
    put: router.put,
    delete: router.delete,
    port: router.listen
}