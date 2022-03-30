const sample = 'this is sample text with  number inside, some postcode 12-123 and phone  number 501-502-503';

// - sprawdź czy występuje poprawny kod pocztowy


const regPost = new RegExp("\\d{2}-\\d{3}");
console.log( regPost.test(sample));

// - sprawdź czy występuje poprawny numer telefonu
const regPhone = new RegExp("\\d{3}-\\d{3}-\\d{3}");
console.log( regPhone.test(sample));
// - wypisz wszystkie grupy w których 3 cyfry występują obok siebie
const regThreeNums = new RegExp("\\d{3}}");
console.log( regThreeNums.test(sample));
// - zastąp podwójne spacje pojedyńczymi