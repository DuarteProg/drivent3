import { prisma } from "@/config";
import { Hotel, TicketStatus } from "@prisma/client";

async function showHotel(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function showTicket(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId, 
      isRemote: false, 
      includesHotel: true
    }

  });
}

async function enrollmaintId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
      status: TicketStatus.PAID

    }
  });
}

async function showPayment() {
  return prisma.payment.findMany();
}

async function getHotelByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  showHotel,
  showTicket,
  showPayment,
  enrollmaintId,
  getHotelByHotelId
};
  
export default hotelRepository;
