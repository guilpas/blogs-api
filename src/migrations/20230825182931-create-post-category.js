module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // Configuram o que deve acontecer ao atualizar ou excluir uma publicação
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'post_id',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'blog_posts',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // Configuram o que deve acontecer ao atualizar ou excluir uma categoria
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'category_id',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'categories',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
