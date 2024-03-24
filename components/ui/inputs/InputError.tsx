interface InputFieldErrorProps {
  errorMessages?: string;
}

export default function InputFieldError(
  { errorMessages }: InputFieldErrorProps,
) {
  if (!errorMessages) {
    return null;
  } else {
    return <p class="text-red-500 text-xs">{errorMessages}</p>;
  }
}
