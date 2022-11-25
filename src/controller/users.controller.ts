import { user } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/db';
import {
    UserSchemaType,
    GetOneUserSchemaType,
    updateUserSchema
} from '../zod_schema/users.zodStchema';

export const getContractHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
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
    const { id } = req.query as GetOneUserSchemaType;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return res.status(200).json(user);
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
    const newMovie = req.body as user;

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
    const newUser = req.body as user;
    const { id } = req.params as UserSchemaType;

    await prisma.user.update({
      where: { id },
      data: newUser,
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
    const { id } = req.params as UserSchemaType;

    await prisma.user.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Movie Deleted !' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};

export const getEmailHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const  email  = req.query as GetOneUserSchemaType;
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error !' });
    }
  };


  export const getAgeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const  age  = req.query as GetOneUserSchemaType;
      const user = await prisma.user.findMany({
        where: { age },
      });
  
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error !' });
    }
  };



