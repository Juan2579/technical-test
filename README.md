# Technical Test Solution

Here is the solution for the programming exercise propossed. It was developed with the following tech stack:

- TypeScript
- Next.js => Frontend
- Supabase => Database 
- TailwindCSS => Styling
- Material UI => Component library for specific functionalities
- Notistack => Library to show success/warning/error notifications
- Uppy => Image uploading
- Github OAuth => Authentication

# Overview of the solution

DevsPost is a website where user can share ideas about software development. Here are the features of the website. 
- All users are able to see all the posts and comments of each post.
- Users are able to authenticate using their Github account.
- Authenticated users are able to create posts with text and images
- Authenticated users are able to create comments in their own posts or in posts from others users.

## Architecture

Folder structure:
* **Actions**: Server actions that are connected with supabase.
	* users: login, logout, getUser, getSession
	 * posts: createPost, getAllPosts
	 *	comments: createComment
 * **App**: Home page, layout and favicon.ico
	  *	api/auth: Endpoint required to Github Oauth authentication
  * **Components**: Application components organized by features and a Shared folder for components that are for general use.
	  *	Auth
	  *	Comments
	  *	Posts
	  *	Shared
  * **Context**: Application context that handles all the shared status of the application. This context also provides functions that are using the server actions from  **Actions** folder.
	  *	PostsContext
	  *	SnackbarContext => This context is needed to show notifications in the app
 * **Styles**: Application styles
	 *	globals.css => TailwindCSS initialization
	 *	uppy.css => styles modifications for Uppy library
 * **Types**: Application types
	 *	Post.d.ts
	 *	Comment.d.ts
	 *	Author.d.ts
 * **Utils**: Application functions that can be used in all the project and are not linked to an specific feature, For example: Supabase client creation

## Approach and Metodology

The project was made in the following order:
1. Create Next.js and Supabase projects and install required dependencies.
2. Connect Github OAuth with Supabase authentication.
3. Create Login and Logout features.
4. Create Posts feature.
5. Create Comments feature.
6. Create Posts image feature.

My approach was to divide the application in small tasks that allow me to work on them in a more organized way.

## Instructions on how to run the application locally

1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```
2. Create a `.env.local` file in the root of the application with the following environment variables:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://oqzmcoqbdiwvtpgazzhu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xem1jb3FiZGl3dnRwZ2F6emh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5NDc3MTgsImV4cCI6MjAzNzUyMzcxOH0.wQARGMucJjCWccXcYqvuh4-BnieeHxarmWsBY_YBe3k
```
3. Run the development server with:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
4. Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the project.
