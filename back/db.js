import pgp from 'pg-promise';

const db = pgp()('postgres://postgres:1289@localhost:5432/test')

export default db;