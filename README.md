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
- View blog posts and comments (both with pagination and infinite scroll)
- Create, edit and delete posts and comments
- User permissions
  - Unauthenticated visitors can view the posts and comments
  - Create, edit and delete actions require a logged in user
  - Only the same user can edit/delete an item who created it
  - Users with ADMIN role can edit/delete anything

### You can try it out here (Hosted on my NAS using Docker. My Azure subscription expired)

- [vsimon.hu/spring-react-blog](https://www.vsimon.hu/spring-react-blog/)

  You can register with a fake email address as long as it's the right format.<br>
  (Admin user login: admin@admin.com - admin123)

### Backend repo

https://github.com/simon-vajda/blog-server
