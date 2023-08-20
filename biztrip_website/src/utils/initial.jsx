export const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}
export const initialUserFormState = {
    email: "",
    phoneNumber: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: ""
}
export const initialCoachFormState = {
    id: 0,
    name: "",
    plateNumber: "",
    totalSeats: 0,
    status: "",
    description: "",
    priceFrom: 0,
    utilities: [],
    seats: [],
    thumbnails: [],
    distance: []
}
export const initialPriceTicketFormState = {
    title: "",
    fare: ""
}
export const initialScheduleFormState = {
    id: 0,
    departure: 0,
    destination: 0,
    imagePath: "",
    status: "",
    isPopular: 0
}
export const initialUtilityFormState = {
    title: "",
    description: "",
    status: 2,
    imagePath: null,
}
export const initialTestimonialFormState = {
    fullName: "",
    job: "",
    isHot: 2,
    status: 2,
    contentJson: '',
    avatarPath: ""
}
export const initialLocationFormState = {
    name: "",
    parentId: 0,
    status: 1,
    address: "",
    locations: []
}