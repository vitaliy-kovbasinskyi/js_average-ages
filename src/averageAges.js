'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const ifcentury = century ? people.filter(
    person => Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return ifcentury
    .map(person => person.died - person.born)
    .reduce((sumOfAges, age) => sumOfAges + age, 0) / ifcentury.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const ifchild = withChildren ? people.filter(
    person => people.find(mother => person.name === mother.mother)
    && person.sex === 'f') : people.filter(person => person.sex === 'f');

  return ifchild
    .map(woman => woman.died - woman.born)
    .reduce((sumOfAges, age) => sumOfAges + age, 0) / ifchild.length;
};
/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon ? people.filter(person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother))
    : people.filter(person => (
      people.some(mother => mother.name === person.mother)));

  const difference = children.map(child => (
    child.born - people.find(mother => mother.name === child.mother).born));

  return difference.reduce((sumOfAges, age) => (
    sumOfAges + age), 0) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
