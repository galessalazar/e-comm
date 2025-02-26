const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags

  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData, productData);
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as:' products'}
        // will this work, if not maybe move the brackets around or add the word include again?
        [{ model: ProductTag, as: 'product_tags'}]
      ]
    });

    if (!tagData) {
      res.status(404).json({ message: 'no tag data here'});
      return;
    }

    res.status(200).json(tagData, productData);
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.put(req.params.id, {
     });
     if (!tagData) {
      res.status(404).json({ message: 'no tags here'});
      return;
     }
     res.status(200).json(tagData);

  } catch(err) {
    res.status(500).json(err);
  }

});


router.delete('/:id', async  (req, res) => {
  // delete on tag by its `id` value

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tagData) {
      res.status(404).json({ message: 'its been destroyed'});
      return;
    }

    res.status(200).json(tagData);

  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
