
import fs from "fs/promises";

/*This imports the file system module (fs) from Node.js but
 specifically uses the promise-based version of it. 
This allows the use of async/await for file operations like reading and writing.*/

import path, { dirname } from "path";//used to craete file path
import { fileURLToPath } from "url";//used to craete file path
const __dirname = dirname(fileURLToPath(import.meta.url));//used to craete file path



const dataFilePath = path.join(__dirname, "tasks.json");//used to craete file path

const readTasksFromFile = async () => {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const writeTasksToFile = async (tasks) => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
};


