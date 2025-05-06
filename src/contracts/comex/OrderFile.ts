import { Order } from "./Orders"

export interface OrderFile {
    id: number
    order_id: number
    description: string
    file_link: string
    created_at: Date
    updated_at: Date
    order: Order
}