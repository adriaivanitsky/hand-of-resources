const pool = require('../utils/pool');

module.exports = class Coffee {
  id;
  name;
  roast;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.roast = row.roast;
  }
  static async insert({ name, roast }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            coffees (name, roast)
        VALUES
        ($1, $2)
        RETURNING
        *
        `,
      [name, roast]
    );
    return new Coffee(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM coffees');
    return rows.map((row) => new Coffee(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          coffees
        WHERE
          id=$1
      `,
      [id]
    );
    return new Coffee(rows[0]);
  }

  static async update(id, attributes) {
    const existingCoffee = await Coffee.findById(id);
    const updatedAttributes = { ...existingCoffee, ...attributes };
    const { name, roast } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
            coffees
        SET
            name=$1,
            roast=$2
        WHERE
            id=$3
        RETURNING
            *
        `,
      [name, roast, id]
    );
    return new Coffee(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            coffees
        WHERE
            id=$1
        RETURNING
            *
        `,
      [id]
    );
    return new Coffee(rows[0]);
  }
};
