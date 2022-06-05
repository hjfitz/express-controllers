import {
	defineRouteOnPrototype,
	defineRouteMetadataIfNotExists,
	getRouteStore,
} from './util'

import {Keys} from './types'
import VError from 'verror'

function classFactory() {
	class TestClass {}


	Reflect.defineProperty(TestClass.prototype, Keys.RouteStore, {value: []})

	return TestClass
}

type TestClass = ReturnType<typeof classFactory>

describe('utility methods', () => {
	describe('defineRouteOnPrototype', () => {
		let testClass: TestClass
		beforeEach(() => {
			testClass = classFactory()
			defineRouteOnPrototype(testClass.prototype, {
				route: '/route',
				method: 'GET',
				func: 'test',
			})
		})
		
		it('should define a route to the store', () => {
			expect(
				Reflect.get(testClass.prototype, Keys.RouteStore)
			).toEqual([
				{
					route: '/route',
					method: 'GET',
					func: 'test',
				}
			])
		})
	})

	describe('defineRouteMetadataIfNotExists', () => {
		describe('when the metadata exists', () => {
			let testClassForMeta: any
			let store: any[]
			beforeEach(() => {
				testClassForMeta = class {}
				store = []
				Reflect.defineProperty(
					testClassForMeta.prototype, 
					Keys.RouteStore, 
					{value: store}
				)
				defineRouteMetadataIfNotExists(testClassForMeta.prototype)
			})

			it('should not redefine the store', () => {
				expect(
					Reflect.get(testClassForMeta.prototype, Keys.RouteStore)
				).toBe(store)
			})
		})
		describe('when the metadata does not exist', () => {
			let testClassForMeta: any
			beforeEach(() => {
				testClassForMeta = class {}
			})

			it('should not redefine the store', () => {
				expect(
					Reflect.get(testClassForMeta.prototype, Keys.RouteStore)
				).toBe(undefined)
				defineRouteMetadataIfNotExists(testClassForMeta.prototype)

				expect(
					Reflect.get(testClassForMeta.prototype, Keys.RouteStore)
				).toEqual([])
			})

		})
	})

	describe('getRouteStore', () => {
		describe('when there is no store defined', () => {
			let testClassForStore: any
			beforeEach(() => {
				testClassForStore = class {}
			})

			it('should throw an error', () => {
				expect(
					() => getRouteStore(testClassForStore.prototype)
				).toThrow(
					new VError('No route store found on %s', testClassForStore.prototype)
				)

			})
		})

		describe('when the store is defined', () => {
			let classWithStore: TestClass
			beforeEach(() => {
				classWithStore = classFactory()
			})

			it('should find a store', () => {
				expect(getRouteStore(classWithStore.prototype)).toEqual([])
			})

			describe('and the store is not an array', () => {

				let testClassForStore: any
				beforeEach(() => {
					testClassForStore = class {}
					Reflect.defineProperty(testClassForStore.prototype, Keys.RouteStore, {value: 'oi'})
				})

				it('should throw an error', () => {
					expect(
						() => getRouteStore(testClassForStore.prototype)
					).toThrow(
						new VError('No route store found on %s', testClassForStore.prototype)
					)

				})
			})
		})
	})
})
