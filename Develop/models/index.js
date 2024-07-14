// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// unsure if the associations are correct and unsure how to check if they are

Product.belongsTo(Category, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_location'
});

// Categories have many Products

Category.belongsToMany(Product, {
  through: {
    model: ProductTag, 
    unique: false
  },
  as: 'category_id'
});

// Products belongToMany Tags (through ProductTag)

ProductTag.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'products_id'
});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'updated_items'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
