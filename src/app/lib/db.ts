import mysql from "mysql2/promise";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(sql: any, params: any) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "rohan123",
    database: process.env.DB_DATABASE || "schooldb",
  });

  try {
    const result = await connection.execute(sql, params);
    return result;
  } finally {
    await connection.end();
  }
}
