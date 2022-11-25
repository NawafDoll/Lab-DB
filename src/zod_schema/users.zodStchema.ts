import {  z } from "zod";

export const addUserSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "ID is required !" })
      .min(3, "ID must be more than 2 !"),
    username: z
      .string({ required_error: "Name is required !" })
      .min(3, "Name must be more than 2 !"),
      password: z.number({required_error:'password is required'}),

      email:z.string({required_error:"email is required"})
      .trim().max(18).min(1),

      role:z.enum(["Admin","user"],{required_error:"role is required"}),
      joiningYear:z.string({required_error:"joiningYear is required"}),
      age:z.number({required_error:'age is required'})
       .min(8,'more than 8').max(100)
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    id: z
      .string({ required_error: "ID is required !" })
      .min(3, "ID must be more than 2 !"),
    username: z
      .string({ required_error: "Name is required !" })
      .min(3, "Name must be more than 2 !"),
      password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8, "Must be at least 8 characters in length"),

      email:z.string({required_error:"email is required"})
      .trim().max(18).min(1),

      role:z.enum(["Admin","user"],{required_error:"role is required"}),
      joiningYear:z.string({required_error:"joiningYear is required"}),
      age:z.number({required_error:'age is required'})
       .min(8,'more than 8').max(100)
  }),
  params: z.object({
    id: z.string({ required_error: 'Please send id in the params' }),
  }),
});

export const getOneUserSchema = z.object({
  query: z.object({
    id: z.string({ required_error: 'Please send id in the params' }),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please send id in the params' }),
  }),
});

export type UserSchemaType = z.infer<typeof updateUserSchema>['params'];
// export type UserSchemaType = z.infer<typeof UserSchema>['body'];

export type GetOneUserSchemaType = z.infer<
  typeof getOneUserSchema
>['query'];
