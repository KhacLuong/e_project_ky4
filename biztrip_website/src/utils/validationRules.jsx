import {
    validateEmail,
    validateEmpty, validatePhoneNumber, validateSelectBooleanOption,
    validateSelectStringOption
} from "./helper.jsx";
import {message} from "./message.jsx";

export const formCoachValidationRules = [
    {
        fieldName: "name",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "plateNumber",
        validationFn: validateEmpty,
        errorMessage: message.error.plateNumber.isEmpty
    },
    {
        fieldName: "status",
        validationFn: validateSelectStringOption,
        errorMessage: message.error.status.isEmpty
    },
]

export const formTestimonialValidateRules = [
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "job",
        validationFn: validateEmpty,
        errorMessage: message.error.job.isEmpty
    },
]
export const formUtilityValidateRules = [
    {
        fieldName: "title",
        validationFn: validateEmpty,
        errorMessage: message.error.title.isEmpty
    },
    {
        fieldName: "status",
        validationFn: validateSelectBooleanOption,
        errorMessage: message.error.status.isEmpty
    }
]
export const formLocationValidateRules = [
    {
        fieldName: "name",
        validationFn: validateEmpty,
        errorMessage: message.error.location.isEmpty
    },
]
export const formTicketValidationRules = [
    {
        fieldName: "title",
        validationFn: validateEmpty,
        errorMessage: message.error.title.isEmpty
    },
    {
        fieldName: "fare",
        validationFn: validateEmpty,
        errorMessage: message.error.fare.isEmpty
    }
]

export const formInfoUserBookingTicket = [
    {
        fieldName: "email",
        validationFn: validateEmail,
        errorMessage: message.error.email.isInvalid
    },
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "phoneNumber",
        validationFn: validatePhoneNumber,
        errorMessage: message.error.phoneNumber.isInvalid
    }
]

export const formInfoProfileUser = [
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
]