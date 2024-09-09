export interface Order {
	id: string
	order_number: number
	date_created: Date
	status: string
}

export interface OrdersResponse {
	customer_orders: Order[]
}
