import {join} from 'path'
import type {Express, RequestHandler} from 'express'

import {getRouteStore} from './util'
import {Keys} from './types'

export function applyRoutesToMiddleware<T extends Object>(
	controllers: T[],
	app: Express,
): void {
	controllers.forEach((controller) => {
		const baseUrl = Reflect.get(controller, Keys.Route)
		const routeStore = getRouteStore(controller)

		routeStore.forEach((meta) => {
			// ugly types, but we're key-passing
			const funcName = meta.func as keyof typeof controller
			const func = controller[funcName] as unknown as RequestHandler 
			const url = join(baseUrl, meta.route)
			app[meta.method](url, func)
		})
	})
}
