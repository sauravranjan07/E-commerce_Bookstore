import Ajv from "ajv";
import Signup from '../interfaces/signup'
const ajv = new Ajv();
const schema = {
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
    const validate = ajv.compile(schema);
  if (!validate(data)) {
    return JSON.parse(JSON.stringify(validate.errors));
  }else{
    return false
  }
  } catch (error) {
    return error
  }
}

export{validateRegistration}
