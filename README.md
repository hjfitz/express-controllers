# express-controllers



## Usage

```typescript
// cats.controller.ts
import type {Request, Response} from 'express'
import {Get, Controller} from 'this-lib'

import type {ICatsService} from './cats.service'

@Controller('/Cats')
class CatsController {
	constructor(
		private readonly catsService: ICatsService
	) {}

	@Get('/')
	getCats(_: Request, res: Response) {
		res.json(this.catsService.getCats())
	}
}


// app.ts
import express from 'express'
import {applyRoutesToMiddleware} from 'this-lib'

import {CatsController, CatsService} from './cats'

const catsController = new CatsController(new CatsService())

const app = express()

applyRoutesToMiddleware([catsController], app)

app.listen(configService.get('PORT'))
```

---

A litle experiment to learn more about decorators and Reflect.

Roadmap:

- [x] Methods
- [x] Controller classes
- [x] Working middleware
- [x] test suite 
- [ ] @Req/@Res param decorator
- [ ] @Path, @Header, @Body param decorators
