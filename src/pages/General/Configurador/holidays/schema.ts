import * as z from "zod";

export const holidaySchema = z.object({
    name: z.string().trim().min(1,'Informe qual o feriado.'),
    holidayDate: z.date({
        required_error: "Informe a data do feriado",
        invalid_type_error: 'Data inválida'
    }),
    fixed: z.boolean().optional(),
    companyId: z.any().optional()
})

export type HolidayType = z.infer<typeof holidaySchema>