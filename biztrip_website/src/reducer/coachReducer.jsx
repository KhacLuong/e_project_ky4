export const SEAT_INITIAL_STATE = {
    seatsState: [],
    countSeat: 0,
    total: 0
};
export const seatReducer = (state = SEAT_INITIAL_STATE, action) => {
    switch (action.type) {
        case "CREATE": {
            return {
                ...state,
                seatsState: action.payload.data,
            }
        }
        case "INCREMENT":
            return {
                ...state,
                seatsState: [...state.seatsState, action.payload.data],
                countSeat: state.countSeat + 1,
                total: +state.total + +action.payload.data.priceTicketId.fare
            }
        case "DECREMENT":
            return {
                ...state,
                seatsState: state.seatsState.filter(item => item.id != action.payload.data.id),
                countSeat: state.countSeat - 1,
                total: +state.total - +action.payload.data.priceTicketId.fare
            }
        default:
            return state;
    }
}