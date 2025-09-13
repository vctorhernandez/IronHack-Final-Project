const Database = require('better-sqlite3');
const path = require('path');

const isTest = process.env.NODE_ENV === 'test';
const dbPath = isTest ? ':memory:' : (process.env.DATABASE_URL || path.join(__dirname, '..', 'data.sqlite3'));

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Crear tabla si no existe
db.exec(`
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT,            -- JSON array como string
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
`);

module.exports = db;
