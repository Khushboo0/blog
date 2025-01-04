export const VALIDATION_RULES = {
    title:{
        minLength:3,
        maxLength:20,
        required:true
    },
    content:{
        minLength:10,
        maxLength:200,
        required:true
    },
    author:{
        minLength:2,
        maxLength:50,
        required:true
    },
}

export const ValidateBlogPost = (formData)=>{
    const errors={}
    // Title validation
  if (!formData.title && VALIDATION_RULES.title.required) {
    errors.title = "Title is required";
  } else if (formData.title.length < VALIDATION_RULES.title.minLength) {
    errors.title = `Title must be at least ${VALIDATION_RULES.title.minLength} characters long`;
  } else if (formData.title.length > VALIDATION_RULES.title.maxLength) {
    errors.title = `Title cannot exceed ${VALIDATION_RULES.title.maxLength} characters`;
  }

  // Content validation
  if (!formData.content && VALIDATION_RULES.content.required) {
    errors.content = "Content is required";
  } else if (formData.content.length < VALIDATION_RULES.content.minLength) {
    errors.content = `Content must be at least ${VALIDATION_RULES.content.minLength} characters long`;
  } else if (formData.content.length > VALIDATION_RULES.content.maxLength) {
    errors.content = `Content cannot exceed ${VALIDATION_RULES.content.maxLength} characters`;
  }

  // Author validation
  if (!formData.author && VALIDATION_RULES.author.required) {
    errors.author = "Author name is required";
  } else if (formData.author.length < VALIDATION_RULES.author.minLength) {
    errors.author = `Author name must be at least ${VALIDATION_RULES.author.minLength} characters long`;
  } else if (formData.author.length > VALIDATION_RULES.author.maxLength) {
    errors.author = `Author name cannot exceed ${VALIDATION_RULES.author.maxLength} characters`;
  }

  return{
    isValid: Object.keys(errors).length ===0,
    errors,
  }


}