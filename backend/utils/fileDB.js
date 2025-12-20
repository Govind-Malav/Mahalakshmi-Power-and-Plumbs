import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, "../data/productsDB.json");

// Load products from file
const loadProducts = () => {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error loading products from file:", err.message);
  }
  return [];
};

// Save products to file
const saveProducts = (products) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving products to file:", err.message);
  }
};

export { loadProducts, saveProducts };
