const express = require('express');
const wrap = require('../helpers/wrap');
const YAML = require('yamljs');


class CrudController {
    constructor(service) {
        this.service = service;

        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.router = express.Router();
        this.routes = {
            '/': [
                { method: 'get', cb: this.readAll },
                { method: 'post', cb: this.create }
            ],
            '/:id': [
                { method: 'get', cb: this.read },
                { method: 'put', cb: this.update },
                { method: 'delete', cb: this.delete }
            ]
        };
    }

    async readAll(req, res) {
        let data = await this.service.readChunk(req.query);
        if (req.headers.accept === 'application/x-yaml')
        {
            res.end(YAML.stringify(data));
        }
        else
        {
            res.json(data);
        }
    }

    async read(req, res) {
        let data = await this.service.read(req.params.id);
        if (req.headers.accept === 'application/x-yaml')
        {
            res.end(YAML.stringify(data.dataValues));
        }
        else
        {
            res.json(data);
        }
    }

    async create(req, res) {
        let data = await this.service.create(req.body);
        if (req.headers.accept  === 'application/x-yaml')
        {
            res.end(YAML.stringify(data.dataValues));
        }
        else
        {
            res.json(data);
        }
    }

    async update(req, res) {
        let data = await this.service.update(req.params.id, req.body);
        if (req.headers.accept  === 'application/x-yaml')
        {
            res.end(YAML.stringify(data.dataValues));
        }
        else
        {
            res.json(data);
        }
    }

    async delete(req, res) {
        let data =  await this.service.delete(req.params.id);
        if (req.headers.accept  === 'application/x-yaml')
        {
            res.end(YAML.stringify(data.dataValues));
        }
        else
        {
            res.json(data);
        }
    }

    registerRoutes() {
        Object.keys(this.routes).forEach(route => {
            let handlers = this.routes[route];
            if (!handlers || !Array.isArray(handlers)) {
                return;
            }
            for (let handler of handlers) {
                this.router[handler.method](
                    route,
                    wrap(handler.cb)
                );
            }
        });
    }
}

module.exports = CrudController;