// To handle THe open ended Questions

var answer = 'Nile river raise from the east';
var correct_answer = 'The sun raise from the east';

answer = answer.toLowerCase().split(' ');
correct_answer = correct_answer.toLowerCase().split(' ');
let counter = 0;

correct_answer.forEach((word, l) => {
    if (answer.includes(word)) {
        counter++;
    }
});
const theCorrect = correct_answer.length / 2 + (1 / 3) * correct_answer.length;

const result = counter >= theCorrect ? true : false;

console.log(result);

console.log('counter', counter);
console.log('Correct Answer', parseInt(theCorrect));
//
// password = 'lol12';
// const lol = password.split('').forEach((ele) => {
//     var num = ele * 1;
//     num ? ele : ele;
// });
// console.log(lol);
const role = 'student';
const stCode = { code: 'ABC123' };
const user = {
    name: 'mohamed',
    ...(role === 'student' && { stCode }),
};

const userClone = { ...user, exam: 'lol' };
userClone.name = 'ali';
console.log(userClone);
console.log(user);
// const stCode = { code: 'ABC123' };
// const user = {
//   ...(role === 'student' && { ...stCode })
// };

function generateCode() {
    var code = 112233;
    return code;
}

console.log(generateCode());
