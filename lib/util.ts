import createDebug from 'debug'
import VError from 'verror'

import type {RouteMetadata} from './types'
import {Keys} from './types'

const debug = createDebug('decorator:util')

export function defineRouteOnPrototype<T extends Object>(prototype: T, key: RouteMetadata): void {
	const store = Reflect.get(prototype, Keys.RouteStore)
	store.push(key)
}

export function defineRouteMetadataIfNotExists<T extends Object>(prototype: T) {
	const routeMeta = Reflect.get(prototype, Keys.RouteStore)
	if (!routeMeta) {
		debug('Creating route store on ', prototype)
		Reflect.defineProperty(prototype, Keys.RouteStore, {value: []})
	}
}

export function getRouteStore<T extends Object>(prototype: T): RouteMetadata[] {
	const store = Reflect.get(prototype, Keys.RouteStore)
	if (!store || !Array.isArray(store)) {
		throw new VError('No route store found on %s', prototype)
	}
	return store as RouteMetadata[]
}
