import db from "$lib/server/db.js";
import { sqlZScore } from "$lib/server/sql.js";


export async function load() {
  const ufs = await db.all(sqlZScore());
  return ufs
}
