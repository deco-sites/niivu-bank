export default function InputFieldError(
  { message }: { message?: string },
) {
  if (!message) {
    return null;
  } else {
    return <p class="text-red-500 text-xs">{message}</p>;
  }
}
