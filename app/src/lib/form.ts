function verifyTextInput(input: string): { correct: boolean; message: string } {
    let result = { correct: false, message: "" };

    // Check if input is null, undefined or an empty string
    if (input === null || input === undefined || input.trim() === "") {
        result.message = "Incorrect input, please try again";
        return result;
    }

    // If the input is valid, set correct to true
    result.correct = true;
    result.message = ""; // Clear the message if input is valid
    return result;
}

export {
    verifyTextInput
}