import AppError from "App/Exceptions/AppError";
import Holiday from "App/Models/Holiday";

export default class HolidayRepository{
    public async getCompanyHolidays(companyId: number){
        try {
            return await Holiday.query().where('company_id',companyId).orWhereNull('company_id').andWhereNull('deleted_at')
        } catch (error) {
            console.error(error)
            throw new AppError(error)
        }
    }
}