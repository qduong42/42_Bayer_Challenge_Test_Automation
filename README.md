## Setup

install `nvm` https://github.com/nvm-sh/nvm

`nvm install npm` `nvm install node` to install `nvm` and `node` 

append `--lts` for latest LTS version

### Javascript Basic

`npm init` to init a package.json

`npm install` to install modules according to the json

### Cypress Basic
npm install cypress --save-dev

#### To run cypress
from a npm script, example: `npm run cy:open`

using npx: `npx cypress open`

## XSS

https://owasp.org/www-community/attacks/xss/

`<script>alert('XSS attack!');</script>`
