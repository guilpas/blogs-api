# Project Blogs API

Backend web application developed with Express and Sequelize ( ORM ).
Created an API and a database for producing content for a blog. Made in Node.js using the sequelize package to make a CRUD of posts.

<br />

<details>
  <summary><strong>🐋 Using with Docker</strong></summary>


  > Run services `node` and `db` with command `docker-compose up -d --build`.

  - Will be created container `blogs_api` and `blogs_api_db`;

  > Use command `docker exec -it blogs_api bash`.

  - It will give you access to the interactive terminal of the container created by compose, which is running in the background.

  > `npm install` for install dependencies
</details>
<br />
  

<details>
  <summary  id="diagrama"><strong>🎲 Database</strong></summary>

  #### Entity Relationship Diagram (ERD)

  ![ERD](./public/der.png)


  #### Scripts

  - Drop database
  ```json
  "drop": "npx sequelize-cli db:drop"
  ```

  - Create database and tables
  ```json
  "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
  ```

  - Add values in tables
  ```json
  "seed": "npx sequelize-cli db:seed:all"
  ```

<br />
</details>


## POST `/login`

```json
{
  "email": "lewishamilton@gmail.com",
  "password": "123456"
}
```

<details>
  <summary><strong>API response</strong></summary>

  * **If the request does not have all fields properly filled in (there cannot be blank fields), the result returned should be as shown below, with an http status of `400`:**
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **If the request receives a wrong/non-existent `email` and `password` pair, the result returned should be as shown below, with an http status of `400`:**
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **If the login was successful, the result returned should be a valid token as shown below, with an http status of `200`:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```

<br />
</details>

---

## POST `/user`

```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  // image is not required
}
```
<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## GET `/user`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## GET `/user/:id`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## POST `/categories`

```json
{
  "name": "Typescript"
}
```

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## GET `/categories`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## POST `/post`

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```
<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## GET `/post`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## GET `/post/:id`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## PUT `/post/:id`

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## DELETE `/post/:id`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## DELETE `/user/me`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>

---

## GET `/post/search?q=:searchTerm`

<details>
  <summary><strong>API response</strong></summary>

<br />
</details>
