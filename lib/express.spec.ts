import type {Express} from 'express'

import {applyRoutesToMiddleware} from './express'
import {Keys} from './types'
import * as util from './util'

function classFactory() {
	const testClass = class {
		testMethod = jest.fn()
	}
	Reflect.defineProperty(testClass.prototype, Keys.Route, {value: '/test'})

	return new testClass()
}

function mockAppFactory(): Express {
	const mockApp = {
		get: jest.fn()
	} as unknown as Express
	return mockApp
}

type TestClass = ReturnType<typeof classFactory>

describe('applyRoutesToMiddleware', () => {
	const getRouteStoreSpy = jest.spyOn(util, 'getRouteStore')
	let controllers: TestClass[]
	let app: Express
	beforeEach(() => {
		controllers = [classFactory()]
		getRouteStoreSpy.mockReturnValueOnce([{
			route: '/route',
			method: 'get',
			func: 'testMethod',
		}])
		app = mockAppFactory()

		applyRoutesToMiddleware(controllers, app)

	})

	it('should fetch the route store from the first controller', () => {
		expect(getRouteStoreSpy).toHaveBeenCalledWith(controllers[0])
	})

	it('should apply middleware to express', () => {
		expect(app.get).toHaveBeenCalledWith('/test/route', controllers[0].testMethod)
	})

})
