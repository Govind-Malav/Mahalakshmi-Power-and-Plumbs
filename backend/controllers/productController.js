import Product from "../models/product.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const { category, filter, search } = req.query;

    let query = {};

    // Filter by category
    if (category) {
      query.category = category.toLowerCase();
    }

    // Filter by section (deals, best-sellers, new-arrivals)
    if (filter) {
      query.section = filter.toLowerCase();
    }

    // When viewing a category (without a section filter), exclude items assigned to special sections
    // so 'deals', 'new-arrivals', 'best-sellers' only show on their respective filter pages.
    if (category && !filter) {
      query.section = null;
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product"
    });
  }
};

// POST /api/products (admin)
export const createProduct = async (req, res) => {
  try {
    const { name, category, subcategory, price, stock, description, image, section, sku } = req.body;

    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, category, and price are required"
      });
    }

    // Allowed subcategories per category
    const allowedSubcategories = {
      electrical: ["products", "appliances"],
      sanitary: ["products", "essentials"]
    };

    const allowedSections = ["deals", "best-sellers", "new-arrivals"];

    const cat = category.toLowerCase();
    const sub = subcategory ? subcategory.toLowerCase() : "products";
    const sect = section && section !== "none" ? section.toLowerCase() : null;

    // Validate category/subcategory pairing
    if (allowedSubcategories[cat] && !allowedSubcategories[cat].includes(sub)) {
      return res.status(400).json({ success: false, message: `Subcategory '${sub}' is not valid for category '${cat}'` });
    }

    // Validate section
    if (sect && !allowedSections.includes(sect)) {
      return res.status(400).json({ success: false, message: `Section '${sect}' is not allowed` });
    }

    const newProduct = new Product({
      name,
      category: cat,
      subcategory: sub,
      price,
      stock: stock || 0,
      description,
      image,
      sku,
      section: sect
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create product"
    });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    // Normalize and validate updates
    const updates = { ...req.body };
    if (updates.category) updates.category = updates.category.toLowerCase();
    if (updates.subcategory) updates.subcategory = updates.subcategory.toLowerCase();
    if (updates.section && updates.section !== "none") updates.section = updates.section.toLowerCase();

    // Validate pairing if category or subcategory provided
    const allowedSubcategories = {
      electrical: ["products", "appliances"],
      sanitary: ["products", "essentials"]
    };
    const allowedSections = ["deals", "best-sellers", "new-arrivals"];

    if (updates.category && updates.subcategory) {
      const cat = updates.category;
      const sub = updates.subcategory;
      if (allowedSubcategories[cat] && !allowedSubcategories[cat].includes(sub)) {
        return res.status(400).json({ success: false, message: `Subcategory '${sub}' is not valid for category '${cat}'` });
      }
    }

    if (updates.section && !allowedSections.includes(updates.section)) {
      return res.status(400).json({ success: false, message: `Section '${updates.section}' is not allowed` });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update product"
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      product
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product"
    });
  }
};
