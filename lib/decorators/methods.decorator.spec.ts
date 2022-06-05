import {Keys, RouteMetadata} from '../types'
import * as Methods from './methods.decorator'

function classFactory() {
	class TestClass {
		@Methods.Method('get', '/method')
		method() {
			// noop
		}

		@Methods.Get('/get')
		get() {
			// noop
		}

		@Methods.Delete('/delete')
		delete() {
			//noop
		}

		@Methods.Post('/post')
		post() {}

		@Methods.Patch('/patch')
		patch() {}

		@Methods.Put('/put')
		put() {}

		@Methods.Head('/Head')
		head() {}

		@Methods.Options('/options')
		options() {}

		@Methods.Method('get')
		withNoUrl() {}
	}

	return TestClass
}
describe('Method decorators', () => {
	let testClass: ReturnType<typeof classFactory>
	let store: RouteMetadata[]
	beforeEach(() => {
		testClass = classFactory()
		store = Reflect.get(testClass.prototype, Keys.RouteStore)
	})

	it('should initialise some class metadata', () => {
		expect(store).toBeDefined()
	})

	it('should set the appropriate metadata', () => {
		expect(store).toStrictEqual([
			{
				method: 'get',
				func: 'method',
				route: '/method',
			},
			{
				'func': 'get',
				'method': 'get',
				'route': '/get',
			},
			{
				'func': 'delete',
				'method': 'delete',
				'route': '/delete',
			},
			{
				'func': 'post',
				'method': 'post',
				'route': '/post',
			},
			{
				'func': 'patch',
				'method': 'patch',
				'route': '/patch',
			},
			{
				'func': 'put',
				'method': 'put',
				'route': '/put',
			},
			{
				'func': 'head',
				'method': 'head',
				'route': '/Head',
			},
			{
				'func': 'options',
				'method': 'options',
				'route': '/options',
			},
			{
				func: 'withNoUrl',
				method: 'get',
				route: '/',
			}
		])
	})


})
