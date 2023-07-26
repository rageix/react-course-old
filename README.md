# React Course

## Introduction

This repo is meant as a good starting point template for a TypeScript and React Project. 
This contains examples from a React course (hence the name) I am working on.

This template includes:

* [Webpack](https://webpack.js.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [React](https://react.dev/)
* [Sass](https://sass-lang.com/)
* [Bootstrap](https://getbootstrap.com/)
* [FontAwesome](https://fontawesome.com/)
* [Lazysizes](https://www.npmjs.com/package/lazysizes)
* [Gulp](https://gulpjs.com/)
* [PostCSS](https://postcss.org/)

## How to get started

1. Install the latest [Node.js LTS](https://nodejs.org).
2. Clone this repo to the directory of your choice.
3. From command line at the root of this project run `npm install`.

## Commands

* `npm start` serves a non-optimized dev version using webpack dev server
* `npm run start:prod` serves an optimized production version using webpack dev server
* `npm run build` builds an optimized production version
* `npm run build:dev` builds the non-optimized version
* `npm run deploy` runs a gulp script that builds an optimized production version and gzips .js and .css assets. You are meant to extend the gulp script to do other deploy things like upload to AWS or the like.
