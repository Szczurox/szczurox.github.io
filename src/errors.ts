export function error(message: string, commandResponse?: HTMLElement | null) {
  if (!commandResponse) return -1;
  commandResponse.innerText = message;
  document.getElementById("cmd")!.before(commandResponse);
  return -1;
}

export function char_error(
  character: string,
  position: number | string,
  commandResponse?: HTMLElement | null
) {
  return error(
    `ERROR: Illegal character: ${character} at position: ${position}`,
    commandResponse
  );
}
