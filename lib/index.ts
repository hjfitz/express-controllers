import 'reflect-metadata'
import createDebug from 'debug'

const debug = createDebug('decorator:any')

enum Keys {
	Method = 'method',
	Route = 'route',
	RouteStore = 'route-store',
}

type Method = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

interface RouteMetadata {
	method: Method,
	func: string,
	route: string
}


function defineRouteOnPrototype(prototype: Function, key: RouteMetadata): void {
	const store = Reflect.get(prototype, Keys.RouteStore)
	store.push(key)
}

function defineRouteMetadataIfNotExists(prototype: Function) {
	const routeMeta = Reflect.get(prototype, Keys.RouteStore)
	console.log('Creating store. meta', routeMeta)
	if (!routeMeta) {
		debug('Creating route store on ', prototype)
		Reflect.defineProperty(prototype, Keys.RouteStore, {value: []})
	}
}

// @Controller('/hello/world') - class decorator
function Controller(baseUrl = '/') {
	return function decorateControllerClass(constructor: Function) {
		debug('Creating controller for ', baseUrl)
		Reflect.defineProperty(constructor.prototype, Keys.Route, {value: baseUrl})
	}
}

// Will be hidden in lieu of GET('/')
function Method(method: Method, route = '/') {
	return function decorateControllerMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		Reflect.defineProperty(descriptor.value, Keys.Method, {value: {route, method}})

		// create the route metadata store if it doesn't exist
		defineRouteMetadataIfNotExists(target.constructor.prototype)

		const routeMetadata = {method, route, func: propertyKey}
		defineRouteOnPrototype(target.constructor.prototype, routeMetadata)
	}
}

function Get(route = '/') {
	return Method('GET', route)
}

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
		const routeStore = Reflect.get(controller, Keys.RouteStore)

		// create router
		debug('Creating router for ', {baseUrl})
		routeStore.forEach((route: RouteMetadata) => {
			const func = controller[route.func]
			debug(`router[${route.method}](${route.route}, ${func})`)
			debug('router[route.method](route.method, func)')
		})
	})
}


const myControler = new ExampleController()

console.log(Reflect.get(myControler, Keys.Route))
console.log(Reflect.get(myControler, Keys.RouteStore))


applyRoutesToMiddleware([myControler])

// instantiate controller
