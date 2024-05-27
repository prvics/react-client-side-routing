# React - client side routing workshop

The story for this project is that we store information about popular programming languages in a MongoDB instance, and we can vote on the languages using React UI.<br>
**In this section, you'll improve the React-created UI by focusing on the implementation of client-side routing with React.**

## Install dependencies
### Install dependencies for Express server
```bash
cd backend
npm install
```
### Install dependencies for React
```bash
cd frontend
npm install
```
## Prepare the Mongo database

- Set your MongoDB URL in the `./backend/config/.env` file.<br>You can find sample setting in `./backend/config/.env.sample` file.
- Run `node backend/db/populate.js` - alternatively you can use `npm run populate` script.

## Launch the backend server

```bash
cd backend
npm run devStart
```

## Launch the frontend

```bash
cd frontend
npm run dev
```

## TASKS
If you have successfully completed all the above points, the page will load without errors but with empty content. Next, we will work on getting the functionality of the page up and running. To do this, you need to go through the listed tasks. In the `./frontend/src` directory, find a file with a comment matching the task point, for example, `TASK 1` and implement the requested functionality.

### TASK 1: BrowserRouter implementation
Implement the `BrowserRouter` component!

### TASK 2: Routes implementation
Implement the `Routes` component within the previously implemented `BrowserRouter`!

### TASK 3: *Parent* route implementation
Implement a `Route` for the `Layout` component, which should be visible when the main page ("/") is loaded!

### TASK 4-8: *Child* route for each componenets
Implement (child) routes for the following components, each associated with the following paths:
```
Main - "/"
About - "/about"
Demo - "/demo"
LanguageCreator - "/language-creator"
LanguageDetails - "/languages/:langid"
```
### TASK 9: Error route implementation
Implement an error route that loads when the address is nonexistent!

### TASK 10: Outlet component implementation
If you try the functionality of the page now, it won't work correctly because an `Outlet` component is missing from the `Layout` component. Implement this!

### TASK 11-14: Link component implementation I.
Implement `Link` components around the buttons in the `Layout`! This way, we can achieve that clicking on a particular button updates the browser's address bar with the corresponding path and loads the respective component under the `Layout` component.

### TASK 15: Link component implementation II.
Again, implement a link component around the *Show details* button! When the user clicks on it, the browser's address bar should display the following path: /languages/langid, where `langid` is the *id* of the respective language.

### TASK 16: useParams hook implementation
In the `LanguageDetails` component, we need information about which programming language details to load. To retrieve this, use the `useParams` React hook!

### TASK 17: useNavigate hook implementation
In the `ErrorPage` component, implement a button with the label *Go to the splash page*. When the user clicks on it, it should navigate to the main page. Use the `useNavigate` React hook to achieve this solution!
