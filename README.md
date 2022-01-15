# lerna-playground
Example monorepo setup with lerna including a UI library in React consumed by 2 different apps

## Checklist

1. Monorepo with Lerna
2. TypeScript
3. source maps depending on env (development | production). See `rollup.config.js`
4. tree-shaking: only bundle what's used. To test this comment the `<Avatar>` component then compare the before/after builds
5. Basic component import `from "ui-library"`
6. JS component -> import asset `from "ui-library"`
7. SCSS modules -> import asset `from "ui-library"`
8. from root componen -> import `ui-library/style/common.scss`
9. `ui-library` can import and use it's own asset
10. Lazy-loading packages

PS: to see the checklist in progress run either of the apps or see the `Checklist.tsx` component.

## How to start and build the projects

In the root directory run

```
$ yarn install
$ yarn bootstrap
```

This will install and link dependencies in all packages.


### To start

Warning: technically running `yarn start` in root should work. Unfortunately, `create-react-app` crashes when the `ui-library` is in `start` mode and we perform changes. Thus, to run the projects, we'll have to separately build the `ui-library` and then run the apps.

```
yarn build // this will build everything

---

cd packages/create-react-app
yarn start

---

cd packages/next
yarn dev
```

### To build

Simply run `yarn build` in root and all packages will be build in the correct order.


## publishConfig

In `ui-library/package.json` we added this config:

```
"publishConfig": {
    "directory": "dist"
}
```

This allows us to correcly link to the `dist` directory when running locally, via `lerna`.


## Next custom config


1. Had to add `react` to alias for it to work:

```
// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Without this `next` doesn't correctly import the package.
    config.resolve.alias['react'] = path.resolve(__dirname, 'node_modules/react');

    return config;
  },
}

module.exports = nextConfig

```

## Questions / Problems:


1. How to handle styling for both SPA and SSR apps?

We want this library to handle both SPA apps (eg: [create-react-app](https://create-react-app.dev/)) and SSR apps (eg: [NextJS](https://nextjs.org/)).  Not sure what is the best approach... I'll have to do some more research on libraries that manage to achieve this, like [material-ui](https://github.com/mui-org/material-ui).

In the meantime, the compromise solution is to extract the CSS into one `index.css` file, which we'll have to **manually import** into all consuming apps. This works but with one **major downside**, we bundle all the CSS even if we use just parts of it.


2. Will default exports from `ui-library` work as well?

All components in `ui-library` use named exports. I assume default exports would work as well, but we'll have to test this, making sure all checklists pass.

3. How to handle big images in the component library?

Right now images get converted to `base64` which heavily increases the JS payload. What is the best way to handle big images in the `ui-library`? Or do we simply make sure our components are built in a generic way, and the image will be provided by the consuming apps?

<hr/>

<p align="center"> Made with ❤ by <a href="https://iampava.com"> Pava </a></p>
