# Project Title

This Project is live in [Synapsis Test](https://synapsis-test-ihda.vercel.app/)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
- [Additional Information](#additional-information)
- [Contact Information](#contact-information)

## Introduction

Synapsis Test is a web application built with NextJS, providing features like browsing posts and users from the Go Rest API. It is designed to be responsive and includes a dark mode feature.

## Installation

```bash
# Clone the repository
git clone https://github.com/ihda06/synapsis-test.git

# Navigate to the project directory
cd synapsis-test

# Install dependencies using pnpm
pnpm install

```

## Usage

Setting env file by creating .env.local

```bash
NEXT_PUBLIC_API_URL=https://gorest.co.in/public/v2
NEXT_PUBLIC_ACCESS_TOKEN=yourtoken
```

Run the project

```bash
pnpm run dev
```

## Pages

### Home ("/")

The Home page serves as the landing page for the application, providing an overview and easy navigation to other sections of the website.

#### Features:

- Welcome message and introduction to the application.
- Navigation links to posts, My posts, and Lucky Coin pages.

#### How to Access:

- Simply navigate to the root URL of the application.

### Posts ("/posts")

The Posts page lists all the available post fetched from the Go Rest API. Users can browse through these posts and select any to view its details.

#### Features:

- List of post with titles and body.
- Links to view detailed information about each post.
- Pagination controls for navigating through multiple pages of posts.

#### How to Access:

- Click on the "posts" link from the Home page, navbar or go directly to `/posts`.

### Detail post ("/posts/[id]")

The Detail post page provides information about a specific post.

#### Features:

- Detailed information about the selected post.

#### How to Access:

- From the posts page, click on the detail of any post to be redirected to its detail page (URL pattern: `/posts/[id]`).

### users ("/users")

The users page lists all the available user fetched from the Go Rest API. Users can browse through these users and select any to view its details.

#### Features:

- List of user with name, email, gender, status.
- Dialog to view and update detailed information about each user.
- Create user feature to add new user
- Pagination controls for navigating through multiple pages of users.

#### How to Access:

- Click on the "users" link from the Home page, navbar or go directly to `/users`.

### Navigation Summary

- **Home:** Start here to get an overview and navigate to other pages.
- **posts:** Browse all available posts and select any to see more details.
- **Detail post:** View detailed information about a selected post.
- **users:** Browse all available users and select any to see more details.

By following the navigation and utilizing these pages, users can fully engage with the web application, exploring posts, and enjoying interactive features.

## Additional Information

### Tech stack

- NextJS app router
- HeadlessUi
- Tanstack useQuery
- Axios
- Tailwind
- React Hook Form
- Next Themes
- zod
- Radix icon

### Notes

This web application is designed to be as responsive as possible and includes a dark mode feature.

## Contact Information

If you have any questions, feedback, or suggestions regarding this project, feel free to contact us using the following methods:

- **Email:** [ihdaanwari5@gmail.com](mailto:ihdaanwari5@gmail.com)
- **Instagram:** [@ihda.anwari](https://instagram.com/ihda.anwari)
- **GitHub:** [ihda06](https://github.com/ihda06)
- **Linkedin:** [Ihda Anwari](https://www.linkedin.com/in/ihda-anwari/)
