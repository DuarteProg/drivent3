import { ApplicationError } from "@/protocols";

export function paymentRequiredError() {
  return {
    name: "PaymentRequiredError",
    message: "Pay the bills",
  };
}
