import * as yup from "yup";

const loginSchema = yup.object().shape({
  user_id: yup
    .string()
    .min(4, '${min}자 이상 입력바랍니다.')
    .max(10, '${max}자 까지 입력됩니다.')
    .trim()
    .required('아이디는 필수입력입니다.')
    .matches(
      /^[0-9a-zA-Z]+$/,
      '영어, 숫자로 입력바랍니다.',
    ),
  user_pass: yup
    .string()
    .min(4, '${min}자 이상 입력바랍니다.')
    .max(20, '${max}자 까지 입력됩니다.')
    .trim()
    .required('비밀번호는 필수입력입니다.'),
});

export { loginSchema };