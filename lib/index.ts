import 'reflect-metadata'
import createDebug from 'debug'

import {getRouteStore} from './util'
import {Keys} from './types'
import {Controller, Get} from './decorators'

const debug = createDebug('decorator:any')

@Controller('/')
class ExampleController {

	@Get('/hello')
	hello(req: any, res: any) {
		return 'hello'
	}
}

function applyRoutesToMiddleware(controllers: any[]): void {
	controllers.forEach((controller) => {
		const baseUrl = Reflect.get(controller, Keys.Route)
		const routeStore = getRouteStore(controller)

		// create router
		debug('Creating router for ', {baseUrl})
		routeStore.forEach((route) => {
			const func = controller[route.func]
			debug(`router[${route.method}](${route.route}, ${func})`)
			debug('router[route.method](route.method, func)')
		})
	})
}


const myControler = new ExampleController()

applyRoutesToMiddleware([myControler])

export * from './decorators'
