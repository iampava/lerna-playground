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


## Questions:

* do we need named exports in `ui-library` or can we also do `default` ones? Do all the checklist items still pass?
* what if the common library has some big images we don't want inlined as Base64?
