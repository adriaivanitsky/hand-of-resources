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
};
