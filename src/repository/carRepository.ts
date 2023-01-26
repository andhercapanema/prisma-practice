import prisma from "../config/database.js";

async function getCars() {
    return prisma.cars.findMany();
}

async function getCar(id: number) {
    return prisma.cars.findUnique({
        where: {
            id,
        },
    });
}

async function getCarWithLicensePlate(licensePlate: string) {
    return prisma.cars.findUnique({
        where: {
            licensePlate,
        },
    });
}

async function upsertCar(
    id: number,
    model: string,
    licensePlate: string,
    year: string,
    color: string
) {
    return prisma.cars.upsert({
        where: {
            id: id || 0,
        },
        create: {
            model,
            licensePlate,
            year,
            color,
        },
        update: {
            model,
            licensePlate,
            year,
            color,
        },
    });
}

async function deleteCar(id: number) {
    return prisma.cars.delete({
        where: {
            id,
        },
    });
}

const carRepository = {
    getCar,
    getCarWithLicensePlate,
    getCars,

    upsertCar,
    deleteCar,
};

export default carRepository;
