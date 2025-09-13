function validateItemCreate(req, res, next) {
  const { title, tags } = req.body || {};
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Field "title" is required (non-empty string).' });
  }
  if (tags !== undefined && !Array.isArray(tags)) {
    return res.status(400).json({ error: 'Field "tags" must be an array of strings.' });
  }
  next();
}

function validateItemUpdate(req, res, next) {
  const { title, tags } = req.body || {};
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'If provided, "title" must be a non-empty string.' });
  }
  if (tags !== undefined && !Array.isArray(tags)) {
    return res.status(400).json({ error: 'Field "tags" must be an array of strings.' });
  }
  next();
}

module.exports = { validateItemCreate, validateItemUpdate };