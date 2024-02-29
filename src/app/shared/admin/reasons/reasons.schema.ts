import { z } from "zod";

//form  zod validation schema for common tools that have onlt english and amharic name fields
export const reasonsSchema = z.object({
  reason: z.string().min(1, { message: "Report reason Is Required" }),
});

// generate form types from zod validation schema used for form
export type ReasonsSchemaValues = z.infer<typeof reasonsSchema>;
