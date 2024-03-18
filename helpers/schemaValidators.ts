import Ajv from "ajv";
import Signup from '../interfaces/signup'
import Login from '../interfaces/login'
const ajv = new Ajv();
const SignUpschema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    repassword: { type: "string" },
    phone: { type: "integer" },
  },
  required: ["name", "email", "password", "repassword", "phone"],
  additionalProperties: false,
};
function validateRegistration(data: Signup): any {
  try {
    const validate = ajv.compile(SignUpschema);
  if (!validate(data)) {
    return JSON.parse(JSON.stringify(validate.errors));
  }else{
    return false
  }
  } catch (error) {
    return error
  }
}
function validateLoginCredentials(data:Login):any{
  try {
    const validate = ajv.compile(LoginSchema);
  if (!validate(data)) {
    return JSON.parse(JSON.stringify(validate.errors));
  }else{
    return false
  }
  } catch (error) {
    return error
  }
}
const LoginSchema={
  type:"object",
  properties:{
    email:{type:"string"},
    password:{type:"string"}
  },
  required:["email","password"],
  additionalProperties: false,
}

export{validateRegistration,validateLoginCredentials}
