// Get input as string from the terminal
const args = process.argv.slice(2);
const input = args.join(" ");

// Import Mappings b/w Braille and English
const { brailleToEnglish, englishToBraille } = require('./mappings');

// Function to identify if input string is Braille or English
function isBraille(input) {
  return input.includes("0") || input.includes(".");
}

// Translate Braille to English
function translateBrailleToEnglish(braille) {
    let englishOutput = '';
    let capitalizeNext = false;
    
    for (let i=0; i< braille.length; i+=6) {    // Go through the braille string 6 characters at a time
        const brailleChar = braille.slice(i, i + 6);    // Get the braille character by slicing between the 'i' index and 6 indices after it
        console.log("processing Braille Char:", brailleChar);
        // console.log('ASCII values:', [...brailleChar].map(char => char.charCodeAt(0)));


        // check if there will be a capital letter after
        if (brailleChar == '.....0') {
            console.log('Capital follows detected');
            capitalizeNext = true;
            continue;   // continue to the next loop if so and skip processing this character
        }

        // Use the map to translate the braille character to an english character
        let englishChar = brailleToEnglish[brailleChar] || '*';

        // Capitalize the character if 'Capital Follows' i
        if (capitalizeNext) {
            console.log(`Capitalizing character: ${englishChar}`)
            englishChar = englishChar.toUpperCase();
            capitalizeNext = false;
        }

        englishOutput += englishChar;
    }
    return englishOutput
}

// Testing
console.log("Type of Input received:", typeof(input));
console.log("Input received:", (input));

console.log("Is it Braille?", isBraille(input));

// Test Brail Inputs
if (isBraille(input)) {
    console.log("Translated English Output:", translateBrailleToEnglish(input));   
} else {
    console.log("Your input is not Braille.");
}