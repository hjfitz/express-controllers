import createDebug from 'debug'

import {Keys} from '../types'

const debug = createDebug('decorator:controller')

export function Controller(baseUrl = '/') {
	return function decorateControllerClass(constructor: Function) {
		debug('Creating controller for ', baseUrl)
		Reflect.defineProperty(constructor.prototype, Keys.Route, {value: baseUrl})
	}
}
