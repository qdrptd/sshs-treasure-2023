import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { setDoc, doc, collection, addDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { Form, Header, List } from "semantic-ui-react";
import { Requirement } from "../components/Requirement";
import { auth, firestore } from "../firebase";

export default function Login() {
  const phone_p = /010\d{8}/;

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [otperr, setOtperr] = useState(false);
  const [otploading, setOtploading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [val, setVal] = useState("");
  useEffect(() => {
    if (user !== null && user !== undefined) {
      navigate("/")
    }
  })

  const sendOTP = async () => {
    if(val!=="sshs1sshs!") {
      alert('확인 질문이 일치하지 않습니다.');  
      return;
    }
    if (otploading || !phone_p.test(phone)) return;
    try {
      const verify = new RecaptchaVerifier(auth, 'recaptcha-container', {});
      console.log('sendOTP'); 
      // setTimeout(async () => {
      setOtploading(true)
      const confirmationResult = await signInWithPhoneNumber(auth, `+82${phone.slice(1,)}`, verify);
      setConfirmation(confirmationResult)
      setOtploading(false)
      alert("인증번호가 전송되었습니다.")
      // }, 500)
    } catch (e) {
      setOtploading(false)
      console.error(e)
    }
  }

  const validateOTP = async () => {
    if (confirmation === undefined) return
    try {
      const result = await confirmation.confirm(otp)
      console.log(result.user.uid);
      if(result._tokenResponse.isNewUser){
        setDoc(doc(firestore, 'users', result.user.uid), {
          phone: result.user.phoneNumber,
          point: 0,
          found: [],
          solved: [],
          error: {},
          revealed: [],
          foundno: [],
          solvedno: [],
          location: '대자연',
          reward: 0
        })
      }
      
    } catch (e) {
      console.error(e)
      setOtperr(true)
    }
  }

  return (
    <div className="flex items-center justify-center p-10 min-h-screen bg-gray-200">
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white p-10 rounded-2xl shadow-2xl">
        <Header as='h2'>로그인</Header>
        <List relaxed>
          <Requirement header="확인질문 입력" description="설곽의 와이파이 비번을 입력해 주세요." condition={val !== ""} />
          <Requirement header="전화번호 입력" description="전화번호를 -없이 입력해 주세요." condition={phone_p.test(phone)} />
          <Requirement header="인증번호 전송" description="인증번호 전송 버튼을 누르고, 캡챠를 진행해 주세요." condition={confirmation !== undefined} />
          <Requirement header="인증번호 입력" description="전송된 인증번호를 입력해 주세요." condition={otp !== ""} />
        </List>
        <Form>
          <Form.Field>
            <label>확인 질문</label>
            <Form.Input
              placeholder='확인 질문'
              onChange={(event, value) => {
                setVal(value.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>전화번호</label>
            <Form.Input
              fluid type='tel'
              placeholder='전화번호'
              disabled={val!=='sshs1sshs!'}
              action={{
                content: '인증번호 전송',
                loading: otploading,
                disabled: !phone_p.test(phone),
                onClick: sendOTP
              }}
              onChange={(event, value) => {
                setPhone(value.value);  
              }}
            />
          </Form.Field>
          <div id="recaptcha-container" className="mb-3"></div>
          <Form.Field
            disabled={confirmation === undefined}
          >
            <label>인증번호</label>
            <Form.Input
              fluid
              placeholder='인증번호'
              action={{
                content: '로그인',
                onClick: validateOTP
              }}
              onChange={(event, value) => {
                setOtp(value.value);
              }}
              error={otperr ?
                { content: '인증에 실패하였습니다.', pointing: 'above' } :
                false
              }
            />
          </Form.Field>
        </Form>
      </div>
    </div>
  )
}