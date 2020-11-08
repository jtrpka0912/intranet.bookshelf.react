# intranet.bookshelf.react

#### The frontend part of the SHELF project.

This project is a **(M)ongoDB (E)xpress (R)eact (N)ode.js** stack with Node and Express being the backend. 

*Refer to intranet.bookshelf.nodejs*.

## Technologies Used

#### Frontend

+ **Font Awesome**: The popular icon library with a React component to use. I will be using the solid icon library only.
  - `npm install --save @fortawesome/fontawesome-svg-core`
  - `npm install --save @fortawesome/free-solid-svg-icons`
  - `npm install --save @fortawesome/react-fontawesome`

+ **SASS**: A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).  
  - `npm install node-sass`

+ **TypeScript**: A strict syntactical superset of JavaScript and adds optional static typing to the language. This was installed with *Create React App*.
  - `npx create-react-app my-app --template typescript`

## Directory Structure

+ **public** - The public folder where static content resides.
+ **src** - The source folder
  - **components** - All of the React components.
    + **app** - The *app* component.
    + **common** - My collection of common React components that I will reuse for future React projects.
    + **contexts** - The state contexts.
    + **pages** - The page layout, and if any additional pages of the web application.
    + **project** - The project specific collection of React components.
  - **sass** - Most of the SASS stylesheets including the index.
    + **common-project** - Overriding styles for the common components for this project.
    + **general** - The general or global styles.
    + **mixins** - SASS Mixins
    + **variables** - Global variables to use through the other SASS style sheets.
  - **types** - All of the custom object types used for the project.


## Coming Soon

+ User Login: Allow a user to make their own `Shelves` and flag the `Files` as read. Furthermore, the users will be stored outside of the MongoDB database, and it will be in its own user database.