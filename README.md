# Fullstack Blog Application

This is a fullstack blog web application using the following technologies:

- React JS
- Material UI
- Spring Framework
- Json Web Token based authentication
- PostgreSQL
- Microsoft Azure
- GitHub Actions CI/CD

### Functionality

- Login and Registration (form validation)
- Listing all posts (with pagination and lazy loading)
- Create, Edit, Delete posts
- User permissions
  - Every action requires a logged in user, except for viewing posts
  - Only the same user can edit/delete a post who created it
  - Users with ADMIN role can edit/delete anything

### You can try it out here (Hosted on Microsoft Azure)

- [Frontend](https://zealous-dune-0654bd403.1.azurestaticapps.net/)
- [Backend Rest API](https://blog-server.azurewebsites.net/api/v1/post)

  You can register with a fake email address as long as it's the right format.<br>
  (Admin user login: admin@admin.com - admin123)

### Backend repo

https://github.com/simon-vajda/blog-server
