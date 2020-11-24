const mongoose = require('mongoose');

const argvLength = process.argv.length;

if (argvLength < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user_ad:${password}@cluster0.plmmz.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (argvLength === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(person.name + ' ' + person.number);
    });
    mongoose.connection.close();
  });
}

if (argvLength > 3) {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({
    name,
    number,
  });
  person.save().then(result => {
    console.log(result);
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
