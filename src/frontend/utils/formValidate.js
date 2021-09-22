const formValidate = (form, cb) => {
  const regex = {
    email:
      /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
    password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
    name: /^[a-z ,.'-]+$/i,
  };
  const arr = [];
  console.log(form);
  for (const prop in form) {
    arr.push({
      test: regex[prop].test(form[prop]),
      type: prop,
    });
  }
  const arrF = arr.filter(({ test }) => test === false);
  const error = arrF.length > 0;
  const output = {
    message: "Datos Erroneos en: ",

  }
  arrF.forEach((validate,index)=>{
    for(const prop in validate){
      prop === "type" && (output[validate[prop]] = validate.test)
    }
    output.message += ` ${validate.type}, `
  })
  error ?  cb(output, null) : cb(null, form) 
  
};
export default formValidate;
