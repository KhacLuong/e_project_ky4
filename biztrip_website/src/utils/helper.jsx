import {message} from "./message.jsx";
import moment from "moment";

export const validateForm = (formData, validationRules) => {
    let errors = {};
    validationRules.forEach((rule) => {
        const {fieldName, validationFn, errorMessage} = rule;
        const fieldValue = formData[fieldName];

        if (typeof fieldValue === "string" && fieldValue.trim() === "") {
            // Check if the field value is an empty string (for input fields)
            errors[fieldName] = errorMessage;
        } else if (Array.isArray(fieldValue) && fieldValue.length === 0) {
            // Check if the field value is an empty array (for select options with multiple selection)
            errors[fieldName] = errorMessage;
        } else if (fieldValue instanceof FileList && fieldValue.length === 0) {
            // Check if the field value is an empty FileList (for file inputs)
            errors[fieldName] = errorMessage;
        } else if (!validationFn(fieldValue)) {
            // Perform custom validation using the provided function
            errors[fieldName] = errorMessage;
        }
    });
    return errors;
}
export const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword === password) {
        return null
    }
    return message.error.password.confirm_password
}
export const validateEmpty = (value) => {
    return value.trim() !== ""
}
export const validateSelectStringOption = (value) => {
    return value !== null
}
export const validateSelectBooleanOption = (value) => {
    return value !== 2
}
export const validateSelectNotNull = (value) => {
    return value !== 0
}
export const validateLengthOfString = (value, min, max) => {
    if (value.length <= max && value.length >= min) {
        return null
    }
    return message.error.content.invalidLength(min, max)
}
export const validateFile = (file) => {
    // Check if a file is selected
    if (!file) {
        return message.error.file.isEmpty;
    }
    // Check the file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        return message.error.file.notAllowed;
    }

    // Check the file size (in bytes)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return message.error.file.max;
    }

    // File is valid
    return null;
};
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Regex pattern for 10-digit phone number
    return phoneRegex.test(phoneNumber);
};

export const handleChangeImage = (e, setImageDefault, setImageName, setErrMsg) => {
    setErrMsg("")
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
        return;
    }
    setImageDefault(window.URL.createObjectURL(fileObj))
    setImageName(fileObj)

    // 👇️ reset file input
    e.target.value = null;
}
export const handleOpenFileInput = (inputImageRef) => {
    inputImageRef.current.click()
}

export const handleConvertStringToSlug = (string) => {
    // Chuyển hết sang chữ thường
    string = string.toLowerCase();

    // xóa dấu
    string = string
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    string = string.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    string = string.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    string = string.replace(/(\s+)/g, '-');

    // Xóa ký tự - liên tiếp
    string = string.replace(/-+/g, '-');

    // xóa phần dư - ở đầu & cuối
    string = string.replace(/^-+|-+$/g, '');

    // return
    return string;
}

export const groupByPosition = (originalArray) => {
    const sortArr = originalArray.slice().sort((a, b) => a.position - b.position);
    const resultArray = [];
    let currentChild = [];
    sortArr.forEach((element) => {
        currentChild.push(element);
        if (currentChild.length === 5) {
            resultArray.push(currentChild);
            currentChild = [];
        }
    });

    if (currentChild.length > 0) {
        resultArray.push(currentChild);
    }
    return resultArray;
}

export const convertLocalDateToGlobalDate = (date) => {
    const parsedDate = moment(date, 'DD-MM-YYYY')
    if (parsedDate._isValid) {
        const parts = date.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`
    }
    return null
}
export const convertCurrentTimeToTimeFormat = (time, format) => {
    const parts = time.split(":")
    if (format === "HH:mm:ss") {
        return `${parts[0]}:${parts[1]}:${parts[2]}`
    } else if (format === "HH:mm") {
        return `${parts[0]}:${parts[1]}`
    }
}
export const formatTimeArray = (timeArray, format) => {
    if (!Array.isArray(timeArray)) {
        return "Invalid input";
    }
    const [hours, minutes, seconds = 0] = timeArray;
    if (format === 'HH:mm:ss') {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    } else {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    }
}
export const convertMinutesToTime = (minutes) => {
    const duration = moment.duration(minutes, 'minutes');
    const hours = duration.hours();
    const min = duration.minutes();

    if (hours === 0) {
        return `${min} phút`;
    } else if (min === 0) {
        return `${hours} giờ`;
    } else {
        return `${hours} giờ ${min} phút`;
    }
}
export const formatPriceToVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
export const renderStar = (count_of_star) => {
    let data = []
    for (let i = 1; i <= count_of_star; i++) {
        data.push(`<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                    <title>Rating star</title>
                    <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                    </path>
                </svg>`)
    }
    return data.join('')
}

export const handleCalculateAverage = (reviews, key) => {
    if(reviews) {
        const totalStars = reviews.reduce((sum, item) => sum + item[key], 0);
        return (totalStars / reviews.length).toFixed(1);
    }
}
export const generateString = (length) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const extractInitials = (name) => {
    const words = name.split(" ");

    if (words.length === 0) {
        return "";
    }

    const firstInitial = words[0].charAt(0).toUpperCase();

    if (words.length === 1) {
        return firstInitial;
    }

    const lastInitial = words[words.length - 1].charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
};