## vue-TicTacToe ##
A popular game, made as vue component, ready to use.

### What is this repo for ###
* It contains a ready-to use vue component, a tictactoe game against the computer. It is declared as a global component with `Vue.component()`, so it can be used inside the components declaration inside a vue instance or directly in the markup.

### Usage ###
* In your html document, import vue, e.g. `https://cdn.jsdelivr.net/npm/vue`
* From this library, link the compiled javascript with your script tag, e.g. `<script type="text/javascript" src="https://raw.githubusercontent.com/snakedove/vue-tictactoe/master/dist/tictactoe.js"></script>`
* From this library, link the compiled css e.g. `<link rel="stylesheet" href="https://raw.githubusercontent.com/snakedove/vue-tictactoe/master/dist/tictactoe.css"></script>`
* Create your own javascript where you create a vue instance and use the component, e.g.
```javascript
new Vue({
    el: '#app',
    template: `<div id="app"><tic-tac-toe /></div>`
});
```
* add some style for the wrapper, e.g.
```html
<style type="text/css">
    html, body {
      width: 100%;
      height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: Verdana, sans-serif;
      position: fixed;
    }

    #app {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
    }
</style>
```
* or import the `TicTacToe` component e.g. `import TicTacToe from './tictactoe'` and use it in your components
