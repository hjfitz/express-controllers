import createDebug from 'debug'
import VError from 'verror'

import type {RouteMetadata} from './types'
import {Keys} from './types'

const debug = createDebug('decorator:util')

export function defineRouteOnPrototype(prototype: Function, key: RouteMetadata): void {
	const store = Reflect.get(prototype, Keys.RouteStore)
	store.push(key)
}

export function defineRouteMetadataIfNotExists(prototype: Function) {
	const routeMeta = Reflect.get(prototype, Keys.RouteStore)
	console.log('Creating store. meta', routeMeta)
	if (!routeMeta) {
		debug('Creating route store on ', prototype)
		Reflect.defineProperty(prototype, Keys.RouteStore, {value: []})
	}
}

export function getRouteStore(prototype: Function): RouteMetadata[] {
	const store = Reflect.get(prototype, Keys.RouteStore)
	if (!store || !Array.isArray(store)) {
		throw new VError('No route store found on %s', prototype)
	}
	return store as RouteMetadata[]
}
