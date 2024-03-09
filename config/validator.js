import yup from 'yup'

const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true
}

const validator = (schema = {}) => ({
  schema: schema,
  validatorCompiler: ({ schema, method, url, httpPart }) => {

    return async function (data) {
      // with option strict = false, yup `validateSync` function returns the
      // coerced value if validation was successful, or throws if validation failed
      try {
        const result = schema.validateSync(data, yupOptions)
        return { value: result }
      } catch (e) {
        return { error: e }
      }
    }
  }  
})

export default validator