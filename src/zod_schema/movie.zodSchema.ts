import { z } from 'zod';

export const addMovieSchema = z.object({
  body: z.object({
    id:z.string({required_error:"ID is required"})
       .min(3,"more than 3"),
    name: z
      .string({ required_error: 'name is required !' })
      .min(2, 'Name must be more than 2 char'),
    genre:z.enum(["Drama","Action","Comedy"],{ required_error: 'genre is required !' }),
    rating: z.number({ required_error: 'rating is required !' })
    .min(1, 'must be more than 1')
    .max(5, 'must be less than 5'),
    duration: z.number({ required_error: 'duration is required !' })
    .min(60, 'Your movie must be more than 60 minutes'),
    
  }),
});

export const updateMovieSchema = z.object({
  body: z.object({
    id:z.string({required_error:"ID is required"})
       .min(3,"more than 3"),
    name: z
      .string({ required_error: 'name is required !' })
      .min(2, 'Name must be more than 2 char'),
    genre:z.enum(["Drama","Action","Comedy"],{ required_error: 'genre is required !' }),
    rating: z.number({ required_error: 'rating is required !' })
    .min(1, 'must be more than 1')
    .max(5, 'must be less than 5'),
    duration: z.number({ required_error: 'duration is required !' })
    .min(60, 'Your movie must be more than 60 minutes'),
  }),
  params: z.object({
    id: z.string({ required_error: 'Please send id in the params' }),
  }),
});

export const deleteMovieSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please send id in the params' }),
  }),
});

export const getOneMovieSchema = z.object({
  query: z.object({
    id: z.string({ required_error: 'Please send id in the params' }),
  }),
});

export type MovieSchemaType = z.infer<typeof updateMovieSchema>['params'];

export type GetOneMovieSchemaType = z.infer<
  typeof getOneMovieSchema
>['query'];
