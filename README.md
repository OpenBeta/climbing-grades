[![Develop branch](https://github.com/openbeta/climbing-grades/actions/workflows/nodejs.yml/badge.svg?branch=develop)](https://github.com/OpenBeta/climbing-grades/actions/workflows/nodejs.yml?query=develop)  [![License](https://img.shields.io/github/license/openbeta/climbing-grades?style=flat-square)](./LICENSE)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
# What is this?

Javascript utilities for working with rock climbing grades.

** Only YDS and V scale are supported at the moment. Code contributions are most welcome!**

Questions?  Join us on [Discord](https://discord.gg/fY9DbRav8h).


### How to use the library

#### Install the package

Using NPM

```
npm install @openbeta/sandbag
```
Using Yarn
```
yarn add @openbeta/sandbag
```

#### Compare YDS grades
```javascript
import { YosemiteDecimal } from '@openbeta/sandbag'

const easier = YosemiteDecimal.getScoreForSort('5.6')
const harder = YosemiteDecimal.getScoreForSort('5.10')

console.log('Is 5.6 easier than 5.10?', easier < harder)  // Output: true
```

See [unit tests](./tree/develop/src/__tests__) for more examples.

### Development (TBD)

```
yarn install
yarn test
```

### License

MIT

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AntoineMarnat"><img src="https://avatars.githubusercontent.com/u/28685732?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AntoineM</b></sub></a><br /><a href="https://github.com/OpenBeta/sandbag/commits?author=AntoineMarnat" title="Code">💻</a> <a href="#ideas-AntoineMarnat" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!