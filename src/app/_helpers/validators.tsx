export function isRecordJsonValid(input: string) {
    // Regular expression to match the structure
    const validInputRegex =
        /^\s*{\s*"recordId":\s*"[a-f0-9]{32}",\s*"playerId":\s*"\d+",\s*"serverId":\s*"[a-f0-9]{32}",\s*"cardPoolId":\s*"[a-f0-9]{32}",\s*"cardPoolType":\s*\d+,\s*"languageCode":\s*"[a-z]{2}"\s*}\s*$/;

    // Remove whitespace and newlines from the input
    const trimmedInput = input.trim().replace(/\s+/g, " ");

    // Check if the input matches the regex
    return validInputRegex.test(trimmedInput);
}
