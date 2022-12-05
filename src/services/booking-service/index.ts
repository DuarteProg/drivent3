import { notFoundError, unauthorizedError, paymentRequiredError, forbidden } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import bookingRepository from "@/repositories/booking-repository";
import { TicketStatus } from "@prisma/client";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";

async function getBooking(userId: number) {
  const getBooking = await bookingRepository.showBooking(userId);
  
  if (!getBooking) {
    throw notFoundError();
  }

  return getBooking;
}

async function createBooking(userId: number, roomId: number) {
  const getBooking = await bookingRepository.showBooking(userId);
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticketeTciketType = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticketeTciketType) throw notFoundError();

  if (ticketeTciketType.status === TicketStatus.RESERVED) throw paymentRequiredError();

  if (ticketeTciketType.TicketType.isRemote === true || ticketeTciketType.TicketType.includesHotel === false)
    throw unauthorizedError();
  
  if (!getBooking) throw notFoundError();
  
  const bookingsRoom = await bookingRepository.countBook(roomId);
 
  if(bookingsRoom >= getBooking.Room.capacity ) throw forbidden();
  return getBooking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const book = await bookingRepository.showBooking(userId);
  const getBooking = await bookingRepository.showBooking(userId);
  const getallBook = await bookingRepository.showBookingAllBook(bookingId);

  const room = await hotelRepository.getHotelByHotelId(roomId);
  if(!room) throw notFoundError();

  if(!book || book.id !== bookingId) throw unauthorizedError();

  if(getallBook.userId !== userId) throw forbidden();

  const bookingsRoom = await bookingRepository.getQTDroomCapacity(userId);
  const bookList = bookingsRoom.length + 1;
  if(bookList >= Number(book.Room.capacity)) throw forbidden();

  const bookingUpdate = await bookingRepository.bookUpdate(bookingId, roomId);
  return bookingUpdate;
}

const bookingService = {
  getBooking,
  createBooking,
  updateBooking
};

export default bookingService;
