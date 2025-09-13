const db = require('../db');

function nowISO() {
  return new Date().toISOString();
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tags: row.tags ? JSON.parse(row.tags) : [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

function createItem({ title, description = null, tags = [] }) {
  const ts = nowISO();
  const stmt = db.prepare(`
    INSERT INTO items (title, description, tags, createdAt, updatedAt)
    VALUES (@title, @description, @tags, @createdAt, @updatedAt)
  `);
  const info = stmt.run({
    title,
    description,
    tags: JSON.stringify(tags),
    createdAt: ts,
    updatedAt: ts
  });
  return getItemById(info.lastInsertRowid);
}

function getItemById(id) {
  const row = db.prepare(`SELECT * FROM items WHERE id = ?`).get(id);
  return fromRow(row);
}

function updateItem(id, { title, description = null, tags }) {
  const current = getItemById(id);
  if (!current) return null;

  const updated = {
    title: title ?? current.title,
    description: (description === undefined) ? current.description : description,
    tags: (tags === undefined) ? current.tags : tags
  };

  const ts = nowISO();
  db.prepare(`
    UPDATE items
      SET title=@title, description=@description, tags=@tags, updatedAt=@updatedAt
    WHERE id=@id
  `).run({
    id,
    title: updated.title,
    description: updated.description,
    tags: JSON.stringify(updated.tags || []),
    updatedAt: ts
  });

  return getItemById(id);
}

function deleteItem(id) {
  const info = db.prepare(`DELETE FROM items WHERE id = ?`).run(id);
  return info.changes > 0;
}

/**
 * Listado con paginación y búsqueda por title y tags (?search=...)
 * page (1-based), pageSize
 */
function listItems({ page = 1, pageSize = 10, search = '' }) {
  page = Math.max(parseInt(page) || 1, 1);
  pageSize = Math.min(Math.max(parseInt(pageSize) || 10, 1), 100);

  let where = '';
  let params = {};
  if (search) {
    where = `WHERE (title LIKE @q OR tags LIKE @q)`;
    params.q = `%${search}%`;
  }

  const totalStmt = db.prepare(`SELECT COUNT(*) as total FROM items ${where}`);
  const { total } = totalStmt.get(params);

  const offset = (page - 1) * pageSize;

  const dataStmt = db.prepare(`
    SELECT * FROM items
    ${where}
    ORDER BY id DESC
    LIMIT @limit OFFSET @offset
  `);

  const rows = dataStmt.all({ ...params, limit: pageSize, offset });
  const data = rows.map(fromRow);

  return {
    data,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize)
  };
}

function dbHealth() {
  db.prepare('SELECT 1').get();
  return true;
}

module.exports = {
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  listItems,
  dbHealth
};
