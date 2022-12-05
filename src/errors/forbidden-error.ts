import { ApplicationError } from "@/protocols";

export function forbidden(): ApplicationError {
  return {
    name: "ForbiddenError",
    message: "No Vacancy",
  };
}
