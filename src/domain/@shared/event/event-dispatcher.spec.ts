import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CreateEventWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/create-event-when-customer-address-is-changed.handler";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log1.handler";
import SendConsoleLog2Handler from "../../customer/event/handler/send-console-log2.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  // ======================================================================================================
  // CUSTOMER CREATED TESTS

  it("should register create customer event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should unregister all customer created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all customer created handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreated = new CustomerCreatedEvent({
      name: "Éric",
      age: 12,
    });

    console.log(customerCreated);

    eventDispatcher.notify(customerCreated);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});

// ======================================================================================================
// CUSTOMER ADDRESS CHANGED TESTS

it("should register customer address changed  event", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new CreateEventWhenCustomerAddressIsChangedHandler();

  eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
  ).toBeDefined();
  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
  ).toBe(1);
  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
  ).toMatchObject(eventHandler);
});

it("should unregister an customer address changed event handler", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new CreateEventWhenCustomerAddressIsChangedHandler();

  eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
  ).toMatchObject(eventHandler);

  eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
  ).toBeDefined();
  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
  ).toBe(0);
});

it("should unregister all customer address changed event handlers", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new CreateEventWhenCustomerAddressIsChangedHandler();

  eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
  ).toMatchObject(eventHandler);

  eventDispatcher.unregisterAll();

  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
  ).toBeUndefined();
});

it("should notify all customer address changed handlers", () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new CreateEventWhenCustomerAddressIsChangedHandler();
  const spyEventHandler = jest.spyOn(eventHandler, "handle");

  eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

  expect(
    eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
  ).toMatchObject(eventHandler);

  const customerAddressChangedEvent = new CustomerAddressChangedEvent({
    id: 123,
    name: "Éric",
    address: {
      street: "Rua B",
      city: "São Paulo",
      zipCode: "91029048",
      state: "SP",
    },
  });

  eventDispatcher.notify(customerAddressChangedEvent);

  expect(spyEventHandler).toHaveBeenCalled();
});
