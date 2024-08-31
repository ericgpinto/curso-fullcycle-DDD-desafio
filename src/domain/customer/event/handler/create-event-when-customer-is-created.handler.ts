import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";
import CustomerCreated from "../customer-created.event";

export default class CreateEventWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreated): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated.");
  }

  handle2(event: CustomerCreated): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated.");
  }
}
