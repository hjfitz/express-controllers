export enum Keys {
	Route = 'route',
	RouteStore = 'route-store',
}

export type Method = 
	| 'get' 
	| 'put' 
	| 'post' 
	| 'patch' 
	| 'delete' 
	| 'head' 
	| 'options'

export interface RouteMetadata {
	method: Method,
	func: string,
	route: string
}
