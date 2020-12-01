export const store = {
  state: {
    numbers: [1, 2, 3],
    profileURL: 'img/profile.png',
  },
  addNumber(newNumber) {
    this.state.numbers.push(newNumber);
  }
};
