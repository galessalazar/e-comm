const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories

  Category.findAll({
    include: [
      Product, {
        model: Tag,
        through: ProductTag,
      },
    ],
  }).then((categories) => res.json(categories))
  .catch((err) => {
    res.status(500).json(err);
  })
  })


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: Product, as: 'categorized_products'}]
      // not sure if this model and through above will work
    });

    if (!categoryData) {
      res.status(404).json({ message: 'nada'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value

    try {
      const categoryData = await Category.put(req.params.id, {      
     });
     if (!categoryData) {
      res.status(404).json({ message: 'nada to report'});
      return;
    }
    res.status(200).json(categoryData);

    } catch (err) {
      res.status(500).json(err);
    } 

});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryData) {
      res.status(404).json({ message: 'nothing to destroy'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
