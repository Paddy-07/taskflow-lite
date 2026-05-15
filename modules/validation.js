export function validateTaskInput(input) {

  const trimmedInput = input.trim();

  if (trimmedInput === '') {

    return {
      valid: false,
      message: 'Task cannot be empty.'
    };

  }

  if (trimmedInput.length > 100) {

    return {
      valid: false,
      message: 'Task must be under 100 characters.'
    };

  }

  return {
    valid: true,
    message: ''
  };

}