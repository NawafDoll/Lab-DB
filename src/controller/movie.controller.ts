import { movie } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/db';
import {
    MovieSchemaType,
    GetOneMovieSchemaType,
} from '../zod_schema/movie.zodSchema';

export const getContractHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await prisma.movie.findMany();
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error !' });
  }
};
export const getOneContractHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query as GetOneMovieSchemaType;
    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error !' });
  }
};

export const addContractHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie = req.body as movie;

    await prisma.movie.create({
      data: newMovie,
    });
    return res.status(201).json({ message: 'New movie added !' });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == 'P2002') {
      return res.status(400).json({
        message: 'You phone number have been used before',
      });
    }
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};

export const updateContractHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie = req.body as movie;
    const { id } = req.params as MovieSchemaType;

    await prisma.movie.update({
      where: { id },
      data: newMovie,
    });
    return res.status(200).json({ message: 'Contact updated' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};

export const deleteContactHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as MovieSchemaType;

    await prisma.movie.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Movie Deleted !' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};