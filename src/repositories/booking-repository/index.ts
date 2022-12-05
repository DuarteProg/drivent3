import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function showBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    }
  });
}

async function showBookingAllBook(id: number) {
  return prisma.booking.findFirst({
    where: {
      id,
    },
    
  });
}

async function postBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    }
  });
}
  
async function countBook(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId
    }
  });
}

async function bookUpdate(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId
    }
  });
}

async function getQTDroomCapacity(userId: number) { 
  return prisma.booking.findMany({
    where: {
      userId
    }
  });
}

const bookingRepository = {
  showBooking,
  postBooking,
  countBook,
  bookUpdate,
  showBookingAllBook,
  getQTDroomCapacity
};
    
export default bookingRepository;
