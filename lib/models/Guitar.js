const pool = require('../utils/pool');

module.exports = class Guitar {
  id;
  name;
  year;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.year = row.year;
  }

  static async insert({ name, year }) {
    const { rows } = await pool.query(
      `INSERT INTO 
            guitars (name, year)
            VALUES
              ($1, $2)
            RETURNING
            *
            `,
      [name, year]
    );
    return new Guitar(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM guitars');
    return rows.map((row) => new Guitar(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            guitars
        WHERE
            id=$1
        `,
      [id]
    );
    return new Guitar(rows[0]);
  }

  static async update(id, attributes) {
    const existingGuitar = await Guitar.findById(id);
    const updatedAttributes = { ...existingGuitar, ...attributes };
    const { name, year } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            guitars
        SET
            name=$1,
            year=$2
        WHERE
            id=$3
            RETURNING
            *
        `,
      [name, year, id]
    );
    return new Guitar(rows[0]);
  }
};
