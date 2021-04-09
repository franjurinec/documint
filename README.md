![Documint Banner](https://user-images.githubusercontent.com/15126801/112904525-5b641f00-90e9-11eb-9cc2-2942d9c88b2b.png)


# About
Documint is a cross-platform application for writing and managing your project documentation. 

# Project Structure

## Client App

The client app project is located in the `documint` directory in the root of the repostitory.

`src` - contains main logic in **TypeScript**  
`src/main` - contains 'main' **Electron** script [.ts]  
`src/renderer` - contains 'renderer' **Electron** script [.ts]  
`src/layouts` - contains **React** layout components [.tsx]  

`sass` - contains **SASS** styles [.sass, .css]  
`static` - contains static files (`index.html`, fonts, etc.)  

`resources` - contains additional resources, included in `dist/resources` when packaging app

The following directories are generated when building or packaging the app

(`app`) - created with `yarn build`, contains .js files compiled from `src`  
(`styles`) - created with `yarn build`, contains `style.css` compiled from `sass`  
(`dist`) - created with `yarn dist`, contains packaged app binaries

### Usage

`yarn build` - compiles SASS into CSS (`/sass` -> `/style`) and TypeScript into JavaScript (`/src` -> `/app`)  
`yarn start` - performs `build` and starts Electron app  
`yarn dist` - performs `build` and creates platform-specific Electron binaries for distribution (distribution config defined in `package.json > "build"`)  

## Remote Host App

The remote host app project is located in the `documint-remote` directory in the root of the repostitory.

`index.js` - entry point for project, **Express.js** app setup  
`/routes` - Express routes  
`/auth` - Auth related utilities

### Usage

`config.json` - configure host settings (serverPort and password)
`node .` - run server

# License
This project is licenced under the [MIT License](https://github.com/franjurinec/documint/blob/main/LICENSE).
