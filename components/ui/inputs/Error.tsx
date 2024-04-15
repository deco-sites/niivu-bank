export default function InputFieldError(
  { message }: { message?: string },
) {
  if (!message) {
    return null;
  } else {
    return <p class="text-[#BF4040] text-xs">{message}</p>;
  }
}
