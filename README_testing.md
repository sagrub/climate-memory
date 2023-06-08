# Testing report

## Manual Testing


## Validation
The webpage was evaluated from several perspectives:
- the markup validity, see [HTML](#html)
- the css properties, see [CSS](#css)
- the web accessibility, see [Accessibility](#accessibility)
- the coding rules of the JavaScript source code, see [JavaScript](#javascript)

### HTML 
The [Nu Html Checker](https://validator.w3.org/nu/) web-based tool by W3 was used to validate the pages of the webpage. The checker did not detect any errors, see the detailed reports for each pages below:
- [Homepage](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2Findex.html)
- [Game Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2Fgame.html)
- [404 Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2F404.html)
- [Thank You Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2Fthank_you.html)

### CSS
The [jigsaw](jigsaw.w3) web-based tool by W3 was taken to validate the CSS of webpage. The validator did not find any errors, see the detailed reports below:
- [Homepage](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- [Game Page](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2Fgame.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- [404 Page](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2F404.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- [Thank You Page](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbrodsa.github.io%2Fclimate-memory%2Fthank_you.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

### Accessibility
The [WAVE](https://wave.webaim.org/) web-based tool was consider for the evaluation of the web accessibility. No errors were detected, see the detailed reports below:
- [Homepage](https://wave.webaim.org/report#/https://brodsa.github.io/climate-memory/)
- [Game Page](https://wave.webaim.org/report#/https://brodsa.github.io/climate-memory/game.html)
- [404 Page](https://wave.webaim.org/report#/https://brodsa.github.io/climate-memory/404.html)
- [Thank You Page](https://wave.webaim.org/report#/https://brodsa.github.io/climate-memory/thank_you.html)

Several alerts were reported, which the developer is aware of. The font-siez in the cards was marked as too small. However, this was the intention in order to fit the text in the cards. The readable font-size is used in the card modal. The redundant link for the GitHub profile of the developer was removed. 

### Lighthouse

### JavaScript
The [JShint](https://jshint.com/) statit tool was considered to check the code rules of the Javascript source code. The source code is split into two js-files. No errors were found, see the detailed reports bellow:
- [index.js](./assets/docs/validation/validation_js_index.png)
- [game_board.js](./assets/docs/validation/validation_js_game_board.png)

Two warnings were reported. Both warnings are related to the tool configurations. The comments on the warnings are provided below
- *missing semicolon*: This warning is not directly related to the missing semicolon but rather to the fact that it does not recognise the `await` operator. The JShint probably requires that the operator should be used inside the async function. There was attemp to refactor the code. However, the change fired out more changes and fixing. Due to the lack of time, the process was stopped. The changes will be considered in a next iteration. It should also be noted, that based on the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await), the usage of the operator in this way should be allowed.
- *object spread property*: This warning is related to the usage of ES9 version, which cannot be configurated directly in configuration setup. There should be a walkaround by using `/* jshint esversion: 9 */` at the top of the code (a hint from the CI slack community).