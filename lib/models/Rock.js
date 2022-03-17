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

      static async insert({name, crystal_system, hardness}) {
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
}