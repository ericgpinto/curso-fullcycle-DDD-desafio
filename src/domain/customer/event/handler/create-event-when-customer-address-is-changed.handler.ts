import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";
import CustomerCreated from "../customer-created.event";

export default class CreateEventWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para:
       Rua: ${event.eventData.address.street}, 
       Cidade: ${event.eventData.address.city}, 
       CEP: ${event.eventData.address.zipCode},  
       Estado: ${event.eventData.address.state}`
    );
  }
}
