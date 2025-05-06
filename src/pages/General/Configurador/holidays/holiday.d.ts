import Company from "@/contracts/general/Company"
import { DateTime } from "luxon"

export interface Holiday {
    id: number
    name: string
    holidayDate: string
    fixed: boolean
    company: Company
    companyId: number
    createdAt: DateTime | null
    deletedAt: DateTime | null
}