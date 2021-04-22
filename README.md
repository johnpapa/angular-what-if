# Angular What If?

What if Angular used Single File Components (SFC) by default? What if Angular used the fetch API or Axios for HTTP requests? What if Angular apps used standard import/exporting of TypeScript modules?

The web apps in this monorepo explore these ideas, using the Tour of Heroes theme.

by [John Papa](http://twitter.com/john_papa)

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/johnpapa/angular-what-if.git tour
   cd tour
   ```

1. Choose your app

   ```bash
   cd sfc
   ```

1. Install the npm packages

   ```bash
   npm install
   ```

1. Run the app

   ```bash
   npm run full-stack
   ```

## Scenarios

Here is a list of the scenarios explored in this monorepo.

| Scenario                      | Description                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SFC                           | Angular, by default, separates files for HTML, TypeScript, and CSS into three files, and places them in a folder. The Single File Component (SFC) scenario combines them into a single file, and eliminates the need for the parent folder. This reduces the files, reduces file jumping during development, and makes it easier to see the entire context of a component in one place.   |
| HTTP Requests                 | Angular offers HttpClient as its recommended HTTP library. Often the standard Fetch API is a great fit for apps. Where more robust logic is needed (e.g. interceptors) Axios is a stable, widely used, and powerful library. Both alternatives use promises and can work with the async/await syntax by default, vs RxJS default from HttpClient (though it can also work with Promises). |
| JavaScript/TypeScript Modules | Angular offers Dependency Injection, which has led to a lot of logic being placed in class based Angular Services. When an application does not need the DI, it may be simpler to create a module with your functions/var/let/const and export them, then import them.                                                                                                                    |

## Apps in this Repository

There are several apps in this repository.

| Folder | Description                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------------------------- |
| mfc    | Angular app using Multiple File Components (MFC). File extensions \*component.ts, \*.component.html, \*.component.css). |
| sfc    | Angular app using Single File Components (SFC).                                                                         |

## What's in the App

Here is a list of the features in each app (other than the angular-http-hard-way app)

- [x] Pages for home, list of movies, heroes and villains
- [x] Axios Interceptors
- [x] API
  - [x] json-server is a backend. No database needed.
  - [x] json-server-auth provides signin/out authentication and authorization routes.
  - [x] App served on one port which can access API on another port proxy or CORS)
  - [x] HTTP via Axios - Uses most common client http libraries for each framework
  - [x] API routes are restricted to those who sign in except `movies`
- [x] Viewing/Editing Pages
  - [x] Home and Movies pages are read-only, and require no authentication
  - [x] Heroes and Villains pages support editing, and require authenticatation
- [x] Styling with Bulma, same css in each app, and Font Awesome

## Problems or Suggestions

[Open an issue here](/issues)

## Resources

- [Angular Essentials for VS Code](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials&WT.mc_id=javascript-0000-jopapa)
- [Axios](https://github.com/axios/axios)
- [Axios Interceptors](https://github.com/axios/axios#interceptors)
- [Angular's HttpClient](https://angular.io/guide/http)
- [Angular HttpClient interceptors](https://angular.io/guide/http#intercepting-requests-and-responses)
- [VS Code](https://code.visualstudio.com/?WT.mc_id=javascript-0000-jopapa)
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=javascript-0000-jopapa)
