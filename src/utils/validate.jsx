import { parseDate } from "./convert";

const textEditorInit = "<p></p>";
const allowedTypes = ["image/jpeg", "image/png"];
const maxSize = 2 * 1024 * 1024; // 2MB

export const validateFields = (formData, rules) => {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    if (!rules[field]) return;
    const value = formData[field];
    // validate ảnh
    if (rules[field].image && value) {
      if (!allowedTypes.includes(formData.image?.file?.type)) {
        errors[field] = "Ảnh phải có định dạng JPEG hoặc PNG";
      } else if (formData.image?.file?.size > maxSize) {
        errors[field] = "Ảnh phải nhỏ hơn 2MB";
      }
    }
    //validate email
    if (
      rules[field].email &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors[field] = "Email không hợp lệ";
    }

    //validate min
    if (rules[field].min && value < rules[field].min) {
      errors[field] = `${rules[field].label} phải lớn hơn ${rules[field].min}`;
    }

    //ngày hợp lệ
    if (rules[field].isValidDate && !parseDate(value)) {
      errors[
        field
      ] = `${rules[field].label} không phải là ngày hợp lệ (dd-MM-yyyy)`;
    }

    if (
      rules[field].dateAfter &&
      parseDate(value) <= parseDate(formData.startDate)
    ) {
      errors[field] = `Ngày kết thúc phải lớn hơn ngày bắt đầu`;
    }

    //validate empty arr
    if (rules[field].empty === false) {
      if (value.length === 0) {
        errors[field] = `${rules[field].label} không được để trống`;
      }
    }

    //validate required
    if (rules[field].required) {
      if (
        !value ||
        value === textEditorInit ||
        (typeof value === "string" && !value.trim())
      ) {
        errors[field] = `${rules[field].label} không được để trống`;
      } else if (typeof value === "object" && value.id === 0) {
        errors[field] = `Vui lòng chọn ${rules[field].label.toLowerCase()}`;
      }
    }
  });

  return errors;
};
