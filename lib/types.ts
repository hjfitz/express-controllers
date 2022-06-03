export enum Keys {
	Route = 'route',
	RouteStore = 'route-store',
}

export type Method = 
	| 'GET' 
	| 'PUT' 
	| 'POST' 
	| 'PATCH' 
	| 'DELETE' 
	| 'HEAD' 
	| 'OPTIONS'

export interface RouteMetadata {
	method: Method,
	func: string,
	route: string
}
