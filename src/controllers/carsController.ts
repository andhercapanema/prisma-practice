import httpStatus from "http-status";

import { Request, Response } from "express";
import carService from "../services/carService.js";

async function getAllCars(req: Request, res: Response) {
    try {
        const cars = await carService.getCars();
        res.send(cars);
    } catch (e) {
        console.log("entrou no catch");
        console.log(e);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getSpecificCar(req: Request, res: Response) {
    const carId = parseInt(req.params.carId);
    try {
        const car = await carService.getCar(carId);
        res.send(car);
    } catch (e) {
        if (e.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
    }
}

async function createOrUpdateCar(req: Request, res: Response) {
    const { model, licensePlate, year, color } = req.body;
    const { carId } = req.params;

    try {
        await carService.createOrUpdateCar(
            Number(carId),
            model,
            licensePlate,
            year,
            color
        );
        res.sendStatus(httpStatus.OK);
    } catch (e) {
        console.log(e);
        if (e.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }

        if (e.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteCar(req: Request, res: Response) {
    const carId = parseInt(req.params.carId);

    try {
        await carService.deleteCar(carId);
        res.sendStatus(httpStatus.OK);
    } catch (e) {
        console.log(e);
        if (e.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const carController = {
    getAllCars,
    getSpecificCar,

    createOrUpdateCar,
    deleteCar,
};

export default carController;
