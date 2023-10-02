const express = require('express');
const { loginController, usersController, categoriesController, 
  postsController } = require('./controllers');
const { validateLoginFields, validateNewUserFields,
  validateNewPostFields, validateEditPostFields } = require('./middlewares/validateFields');
const authMiddleware = require('./middlewares/authMiddleware');

// ... VQV

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLoginFields, loginController.login);
app.post('/user', validateNewUserFields, usersController.newUser);

app.use(authMiddleware);

app.get('/user', usersController.getAllUsers);
app.get('/user/:id', usersController.findUserById);
app.delete('/user/me', usersController.deleteUser);
app.get('/categories', categoriesController.getAllCategories);
app.post('/categories', categoriesController.addCategory);
app.get('/post', postsController.getAllPosts);
app.get('/post/search', postsController.searchPosts);
app.get('/post/:id', postsController.findPostById);
app.post('/post', validateNewPostFields, postsController.addPost);
app.put('/post/:postId', validateEditPostFields, postsController.editPost);
app.delete('/post/:postId', postsController.deletePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
