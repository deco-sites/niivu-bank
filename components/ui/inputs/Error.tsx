export default function InputFieldError(
  { message }: { message?: string },
) {
  if (!message) {
    return null;
  } else {
    return <p class="text-error text-xs">{message}</p>;
  }
}
