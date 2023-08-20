
export const BOOKING_TICKET_INITIAL_STATE = () => JSON.parse(localStorage.getItem("bookingTickets"))
export const bookingTicketReducer = (state = BOOKING_TICKET_INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD": {
            return {
                ticket: action.payload.data,
                timeToAdd: action.payload.timeToAdd,
                timeToExpire: action.payload.timeToExpire,
            }
        }
        case "REMOVE": {
            return {
                ticket: {},
                timeToAdd: "",
                timeToExpire: "",
            }
        }
        default:
            return state;
    }
};
