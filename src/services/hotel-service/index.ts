import { notFoundError, unauthorizedError, paymentRequiredError } from "@/errors";
import paymentRepository, { PaymentParams } from "@/repositories/payment-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { TicketStatus } from "@prisma/client";

async function getHoltel(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketeTciketType = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticketeTciketType) throw notFoundError();

  if (ticketeTciketType.status === TicketStatus.RESERVED) throw paymentRequiredError();

  if (ticketeTciketType.TicketType.isRemote === true || ticketeTciketType.TicketType.includesHotel === false)
    throw unauthorizedError();

  const gethotel = await hotelRepository.showHotel();
  return gethotel;
}

async function getHotelId(hotelId: number, userId: number) {
  const hotel = await hotelRepository.getHotelByHotelId(hotelId);
  if(!hotel) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  
  const ticketeTciketType = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticketeTciketType) throw notFoundError();
  
  if (ticketeTciketType.status !== TicketStatus.PAID) throw paymentRequiredError();
  
  if (ticketeTciketType.TicketType.isRemote === true || ticketeTciketType.TicketType.includesHotel === false)
    throw unauthorizedError();

  return hotel;
}

const hotelService = {
  getHoltel,
  getHotelId,
};

export default hotelService;
