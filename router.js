const http = require("http");
const path = require("path");
const fs = require("fs");
const getCallbacks = {};
const postCallbacks = {};
const putCallbacks = {};
const deleteCallbacks = {};

function req(req) {
    return {}
}
function res(res) {
    return {}
}

function getCallback(requestPath, req, res) {
    const callback = getCallbacks[requestPath];

    if(typeof callback == "function") {
        callback(req, {send: res.end});
    } else {
        return `CANNOT GET ${requestPath}`;
    }
}

function postCallback(requestPath, req, res) {
    const callback = postCallbacks[requestPath];

    if(typeof callback == "function") {
        callback(req, {send: res.end});
    } else {
        return `CANNOT POST ${requestPath}`;
    }
}

function putCallback(requestPath, req, res) {
    const callback = putCallbacks[requestPath];

    if(typeof callback == "function") {
        callback(req, {send: res.end});
    } else {
        return `CANNOT PUT ${requestPath}`;
    }
}

function deleteCallback(requestPath, req, res) {
    const callback = deleteCallbacks[requestPath];

    if(typeof callback == "function") {
        callback(req, {send: res.end, __raw: res});
    } else {
        return `CANNOT DELETE ${requestPath}`;
    }
}

function get(requestPath, callback) {
    getCallbacks[requestPath] = callback;
}

function post(requestPath, callback) {
    getCallbacks[requestPath] = callback;
}

function put(requestPath, callback) {
    getCallbacks[requestPath] = callback;
}

function Delete(requestPath, callback) {
    getCallbacks[requestPath] = callback;
}

function file(filename, dirname) {
    return path.join(dirname || __dirname.split("/node_modules")[0], filename);
}

const server = http.createServer((req, res) => {
    if(req.method == "GET") {
        const err = getCallback(req.url, req, res);

        if(err) {
            res.end(err);
        }
    } else if(req.method == "POST") {
        const err = postCallback(req.url, req, res);

        if(err) {
            res.end(err);
        }
    } else if(req.method == "PUT") {
        const err = putCallback(req.url, req, res);

        if(err) {
            res.end(err);
        }
    } else if(req.method == "DELETE") {
        const err = deleteCallback(req.url, req, res);

        if(err) {
            res.end(err);
        }
    } else {
        res.end(`CANNOT ${req.method} ${req.url}`);
    }
})

module.exports = {
    get,
    post,
    put,
    delete: Delete,
    file,
    listen: server.listen,
    server
}