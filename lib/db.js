import sql from "better-sqlite3";
import { GraphQLError } from "graphql";

const db = sql("posts.db");

export const getPosts = () => {
  const posts = db.prepare(`SELECT * FROM posts`).all();

  return posts;
};

export const getPost = (id) => {
  const post = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);

  if (!post) {
    throw new GraphQLError("Post not found", {
      extensions: {
        code: "POST_NOT_FOUND",
      },
    });
  }

  return post;
};

export const savePost = (title, content) => {
  const postData = {
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  const stmt = db.prepare(`
      INSERT INTO posts
        (title, content, createdAt)
      VALUES (
        @title,
        @content,
        @createdAt
      )
    `);

  const result = stmt.run(postData);

  return getPost(result.lastInsertRowid);
};

export const deletePost = (id) => {
  const stmt = db.prepare(`DELETE FROM posts WHERE id = ?`);

  const result = stmt.run(id);

  if (result.changes !== 1) {
    throw new GraphQLError("Post not found", {
      extensions: {
        code: "POST_NOT_FOUND",
      },
    });
  }

  return true;
};

export const updatePost = (id, data) => {
  const updatedPostData = {
    id,
    title: data.title,
    content: data.content,
  };

  const stmt = db.prepare(`
      UPDATE posts
      SET title = @title, content = @content
      WHERE id = @id
    `);

  const result = stmt.run(updatedPostData);

  if (result.changes !== 1) {
    throw new GraphQLError("Post not found", {
      extensions: {
        code: "POST_NOT_FOUND",
      },
    });
  }

  return getPost(id);
};
