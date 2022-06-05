import express, {Express, Request, Response} from 'express'
import request from 'supertest'
import {Get, Post, applyRoutesToMiddleware, Controller, Put} from '../lib'

function createExampleApp(): Express {
	const app = express()

	@Controller()
	class ControllerOne {

		@Get('/')
		helloWorld(_: Request, res: Response) {
			res.send('hello')
		}
	}

	@Controller('/base')
	class ControllerTwo {

		@Post('/route')
		sayHello(_: Request, res: Response) {
			res.send('route')
		}
	}

	applyRoutesToMiddleware([
		new ControllerOne(),
		new ControllerTwo()
	], app)
	

	return app
}

describe('e2e tests', () => {
	let req: request.SuperTest<request.Test>
	beforeEach(() => {
		req = request(createExampleApp())
	})

	it('should configure a base controller', async () => {
		const resp = await req.get('/').expect(200)
		expect(resp.text).toBe('hello')
	})

	it('should nest routes', async () => {
		const resp = await req.post('/base/route')
		expect(resp.text).toBe('route')
	})

})
