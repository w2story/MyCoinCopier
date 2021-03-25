import * as yup from "yup";
import {
  userIdChk,
  userNameChk,
} from "../database/userInfo";

// simulate a network or database call
const checkUsername = username =>
  new Promise(resolve => {
    const available = userNameChk(username);
    console.log(available);
    setTimeout(() => resolve(available), 500);
  });
const checkUserId = userid =>
  new Promise(resolve => {
    const available = userIdChk(userid);
    console.log(available);
    setTimeout(() => resolve(available), 500);
  });

const joinSchema = yup.object().shape({
  user_id: yup
    .string()
    .min(4, '${min}자 이상 입력바랍니다.')
    .max(10, '${max}자 까지 입력됩니다.')
    .trim()
    .required('아이디는 필수입력입니다.')
    .matches(
      /^[0-9a-z]+$/,
      '영어, 숫자로 입력바랍니다.',
    )
    .test('usernameTaken', '이미 사용중인 아이디 입니다.', checkUserId),
  user_name: yup
    .string()
    .max(16, '${max}자 까지 입력됩니다.')
    .trim()
    .required('닉네임은 필수입력입니다.')
    .test('usernameTaken', '이미 사용중인 닉네임 입니다.', checkUsername),
  user_pass: yup
    .string()
    .min(4, '${min}자 이상 입력바랍니다.')
    .max(20, '${max}자 까지 입력됩니다.')
    .trim()
    .required('비밀번호는 필수입력입니다.')
    .matches(
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/,
      '숫자, 특수문자 1회 이상 입력바랍니다.',
    ),
  user_pass_chk: yup
    .string()
    .max(20, '${max}자 까지 입력됩니다.')
    .trim()
    .required('비밀번호 확인은 필수입력입니다.')
    .matches(
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/,
      '숫자, 특수문자 1회 이상 입력바랍니다.',
    )
    .oneOf([yup.ref('user_pass'), null], '비밀번호가 맞지 않습니다.')
});

export { joinSchema };