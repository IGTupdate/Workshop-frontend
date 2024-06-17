const AddStarsToNumber = (number: number) => {
  // Convert number to string
  const numberString: string = number.toString();

  // Get the last four digits
  const lastFourDigits: string = numberString.slice(-4);

  // Replace each digit except the last four with a star
  const starredString: string = numberString.slice(0, -4).replace(/\d/g, "*");

  // Add a space after every four digits
  const formattedString: string = starredString.replace(/(.{4})/g, "$1 ");

  return formattedString + lastFourDigits;
};

export default AddStarsToNumber;
