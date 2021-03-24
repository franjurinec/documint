![Documint Banner](https://user-images.githubusercontent.com/15126801/110640276-ec15a200-81b0-11eb-8c90-bd446af4fdf4.png)

# About
Documint is a cross-platform application for writing and managing your project documentation. 

# Project Structure

The project is located in the _documint_ directory in the root of the repostitory.

`src` - contains main logic in **typescript**  
`src/main` - contains 'main' Electron script [.ts]  
`src/renderer` - contains 'renderer' Electron script [.ts]  
`src/layouts` - contains React layout components [.tsx]  

`sass` - contains **SASS** styles [.sass, .css]  
`resources` - contains static resources  

(`app`) - created with `yarn build`, contains .js files compiled from `src`  
(`styles`) - created with `yarn build`, contains `style.css` compiled from `sass`  
(`dist`) - created with `yarn dist`, contains compiled binaries according to the build config in `package.json`  

# License
This project is licenced under the [MIT License](https://github.com/franjurinec/documint/blob/main/LICENSE).
