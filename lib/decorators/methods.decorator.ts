import type {Method as HttpMethod} from '../types'

import {
	defineRouteMetadataIfNotExists,
	defineRouteOnPrototype,
} from '../util'

export function Method(method: HttpMethod, route = '/') {
	return function decorateControllerMethod(target: any, propertyKey: string) {
		const toDefine = target.constructor.prototype
		defineRouteMetadataIfNotExists(toDefine)

		const routeMetadata = {method, route, func: propertyKey}
		defineRouteOnPrototype(toDefine, routeMetadata)
	}
}

export function Get(route?: string) {
	return Method('get', route)
}

export function Post(route?: string) {
	return Method('post', route)
}

export function Patch(route?: string) {
	return Method('patch', route)
}

export function Put(route?: string) {
	return Method('put', route)
}

export function Delete(route?: string) {
	return Method('delete', route)
}

export function Head(route?: string) {
	return Method('head', route)
}

export function Options(route?: string) {
	return Method('options', route)
}
