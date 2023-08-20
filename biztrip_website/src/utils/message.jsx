export const message = {
    error: {
        email: {
            isInvalid: 'Email không hợp lệ!',
            isEmpty: 'Vui lòng nhập email!'
        },
        phoneNumber: {
            isInvalid: 'Số điện thoại không hợp lệ!',
            isEmpty: 'Vui lòng nhập số điện thoại!'
        },
        password: {
            confirm_password: 'Mật khẩu nhập lại không đúng!',
            isEmpty: 'Vui lòng nhập mật khẩu!',
            isShort: 'Mật khẩu bắt buộc phải nhiều hơn 6 ký tự!',
        },
        name: {
            isInvalid: 'Tên không hợp lệ!',
            isEmpty: 'Vui lòng nhập tên!'
        },
        title: {
            isEmpty: 'Vui lòng nhập tiêu đề!',
        },
        status: {
            isEmpty: 'Vui lòng chọn trạng thái!'
        },
        file: {
            isEmpty: 'Vui lòng chọn ảnh!',
            max: 'Dung lượng ảnh không được vượt quá 5MB!',
            notAllowed: 'File không hợp lệ!'
        },
        plateNumber: {
            isEmpty: 'Vui lòng nhập biển số xe!'
        },
        fare: {
            isEmpty: 'Vui lòng nhập giá vé!'
        },
        job: {
            isEmpty: "Vui lòng nhập nghề nghiệp!"
        },
        content: {
            isEmpty: "Vui lòng nhập nội dung!",
            invalidLength: (min, max)=> `Nội dung phải trong giới hạn cho phép (min: ${min}, max: ${max})`
        },
        role: {
            isEmpty: "Vui lòng chọn vai trò!",
        },
        location: {
            isEmpty: "Vui lòng nhập địa điểm!"
        }
    },
    success: 'Successfully added new'
}