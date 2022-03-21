const pool = require('../utils/pool');

module.exports = class Rock {
  id;
  name;
  crystal_system;
  hardness;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.crystal_system = row.crystal_system;
    this.hardness = row.hardness;
  }

  static async insert({ name, crystal_system, hardness }) {
    const { rows } = await pool.query(
      `INSERT INTO 
            rocks (name, crystal_system, hardness)
            VALUES
              ($1, $2, $3)
            RETURNING
            *
            `,
      [name, crystal_system, hardness]
    );
    return new Rock(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM rocks');
    return rows.map((row) => new Rock(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          rocks
        WHERE
          id=$1
      `,
      [id]
    );
    return new Rock(rows[0]);
  }

  static async update(id, attributes) {
    const existingRock = await Rock.findById(id);
    const updatedAttributes = { ...existingRock, ...attributes };
    const { name, crystal_system, hardness } = updatedAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        rocks
      SET
        name=$1,
        crystal_system=$2,
        hardness=$3
      WHERE
        id=$4
        RETURNING
        *
        `,
      [name, crystal_system, hardness, id]
    );
    return new Rock(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        rocks
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Rock(rows[0]);
  }
};
