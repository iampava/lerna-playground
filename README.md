# lerna-playground
Example monorepo setup with lerna including a UI library in React consumed by 2 different apps

## Checklist

TODO: write all the tests/scenarios we're interested in

* source maps depending on env (development | production). See `rollup.config.js`
* extract `common.scss` inside library and import from App
* import `variables.scss` from `Checklist.scss` and use in App
* tree-shaking: only bundle what's used. To test this comment the `<Avatar>` component then compare the before/after builds


## 


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
