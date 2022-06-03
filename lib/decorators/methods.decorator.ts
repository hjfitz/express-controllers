import {
	defineRouteMetadataIfNotExists,
	defineRouteOnPrototype,
} from '../util'
import type {Method} from '../types'

function Method(method: Method, route = '/') {
	return function decorateControllerMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		defineRouteMetadataIfNotExists(target.constructor.prototype)

		const routeMetadata = {method, route, func: propertyKey}
		defineRouteOnPrototype(target.constructor.prototype, routeMetadata)
	}
}

// mess
export function Get(route?: string) {
	return Method('GET', route)
}

export function Post(route?: string) {
	return Method('POST', route)
}

export function Patch(route?: string) {
	return Method('PATCH', route)
}

export function Put(route?: string) {
	return Method('PUT', route)
}

export function Delete(route?: string) {
	return Method('DELETE', route)
}

export function Head(route?: string) {
	return Method('DELETE', route)
}

export function Options(route?: string) {
	return Method('DELETE', route)
}
