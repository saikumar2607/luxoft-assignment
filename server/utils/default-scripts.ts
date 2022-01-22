import { executeQuery } from "../database/db";
import { UserRole } from "./enums";
import { hashPassword } from "./hash-utils";
import { defaultData } from "./messages";

export async function createData() {
  await deleteData();
  try {
    const updatedData = defaultData.map(dataObj => [
      dataObj.id,
      dataObj.name,
      dataObj.email,
      hashPassword(dataObj.password),
      dataObj.role
    ]);
    const baseQuery = "INSERT INTO users (id,name,email,password,role) VALUES (?,?,?,?,?)";
    let result = await Promise.all(updatedData.map(dataRecord => executeQuery(baseQuery, dataRecord)));
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteData() {
  try {
    const baseQuery = "DELETE FROM users";
    let result = await executeQuery(baseQuery);
    return result;
  } catch (error) {
    console.log(error);
  }
}
