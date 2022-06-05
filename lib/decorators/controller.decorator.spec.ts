import {Keys} from '../types'
import {Controller} from './controller.decorator'
function classFactory(base?: string) {
	@Controller(base)
	class TestClass {}

	return TestClass
}

describe('controller decorator', () => {
	describe('given a custom base', () => {
		const TEST_ROUTE = '/test'
		let decoratedTestClass: ReturnType<typeof classFactory>
		beforeEach(() => {
			decoratedTestClass = classFactory(TEST_ROUTE)
		})

		it('should add some route metadata', () => {
			expect(
				Reflect.get(decoratedTestClass.prototype, Keys.Route)
			).toBe(TEST_ROUTE)
		})
	})

	describe('given no base', () => {
		let decoratedTestClass: ReturnType<typeof classFactory>
		beforeEach(() => {
			decoratedTestClass = classFactory()
		})

		it('should add some route metadata', () => {
			expect(
				Reflect.get(decoratedTestClass.prototype, Keys.Route)
			).toBe('/')
		})
	})
})
