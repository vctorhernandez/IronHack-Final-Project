const itemService = require('../services/item.service');

async function create(req, res, next) {
  try {
    const { title, description, tags } = req.body || {};
    const item = itemService.createItem({ title, description, tags });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const { page, pageSize, search } = req.query;
    const result = itemService.listItems({ page, pageSize, search });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const item = itemService.getItemById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, description, tags } = req.body || {};
    const item = itemService.updateItem(id, { title, description, tags });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const ok = itemService.deleteItem(id);
    if (!ok) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function health(req, res) {
  try {
    itemService.dbHealth();
    res.json({ status: 'ok', db: 'connected' });
  } catch {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
}

module.exports = {
  create,
  list,
  getById,
  update,
  remove,
  health
};
