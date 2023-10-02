const { BlogPost, User, Category, Sequelize } = require('../models');

const { Op } = Sequelize;

const searchPosts = async (q) => {
  const query = `%${q}%`;
  const data = await BlogPost.findAll({ where: {
    [Op.or]: [
       { content: { [Op.like]: query } },
       { title: { [Op.like]: query } },
    ],
  },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { status: 'SUCCESSFUL', data };
};

module.exports = { searchPosts };