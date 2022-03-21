const pool = require('../utils/pool');

module.exports = class Journal {
  id;
  name;
  pages;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.pages = row.pages;
  }

  static async insert({ name, pages }) {
    const { rows } = await pool.query(
      `INSERT INTO 
            journals (name, pages)
            VALUES
            ($1, $2)
            RETURNING
            *
            `,
      [name, pages]
    );
    return new Journal(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM journals');
    return rows.map((row) => new Journal(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            journals
        WHERE
            id=$1
            `,
      [id]
    );
    return new Journal(rows[0]);
  }

  static async update(id, attributes) {
    const existingJournal = await Journal.findById(id);
    const updatedAttributes = { ...existingJournal, ...attributes };
    const { name, pages } = updatedAttributes;
    const { rows } = await pool.query(
      `
        
        UPDATE
            journals
        SET
            name=$1,
            pages=$2
        WHERE
            id=$3
        RETURNING
            *
        `,
      [name, pages, id]
    );
    return new Journal(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            journals
            WHERE
                id=$1
            RETURNING
                *
                `,
      [id]
    );
    return new Journal(rows[0]);
  }
};
