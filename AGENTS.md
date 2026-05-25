# Overview

This project is an idle game about a tower of zeppelins.
We need to create a frontend only prototype of the game.
The type is a SPA

# Stack

- Typescript (see `.cursor/rules/typescript-standards.mdc`)
- Vite
- React 19
- Tailwind (primary styling for layout and positioning; see `.cursor/rules/css-tailwind.mdc`)

# Structure

- concept: exports ideas of the designer, never include files directly from here, always copy when needed, rename to match thee purpose
- concept/doc: documents from the game designer
- concept/art: art concepts of the game visuals
- concept/temp: temporary dir

- src: source code
- src/app: application root
- src/components: self sufficient components. The entry point of the component is index.tsx, all component files contained in the directory. Directory of the component must start from the capital, for example: Frame
- src/pages: The pages of the SPA
- src/navigation: Navigation related tools
- src/game: Background game logics

- doc: established concepts that need to be taken to consideration
- doc/spec: specs that has are either in progress or have been complete. Each spec must be a directory, have phases.md as an overall plan and the status of the spec, the rest of the files inside of that directory are considered phase plans. Do this structure even if the spec is only one state.