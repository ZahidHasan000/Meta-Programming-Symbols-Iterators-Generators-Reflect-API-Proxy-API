//library land
const uid = Symbol();
console.log(uid);
const user = {
  // id: 'p1',
  [uid]: 'p1',
  name: 'Max',
  age: 30,
  [Symbol.toStringTag]: 'User'
};
user[uid] = 'p3';

//app land => Using the library
user.id = "p2";  //this should not be possible
console.log(user);
console.log(user[Symbol('uid')]);
console.log(Symbol('uid') === Symbol('uid'));
console.log(user);
console.log(user.toString());



const company = {
  curEmployee: 0,
  employees: ['Max', 'Manuel', 'Anna'],
  // next() {
  //   if (this.curEmployee >= this.employees.length) {
  //     return { value: this.curEmployee, done: true };
  //   }
  //   const returnValue = {
  //     value: this.employees[this.curEmployee],
  //     done: false
  //   };
  //   this.curEmployee++;
  //   return returnValue;
  // },
  [Symbol.iterator]: function* employeeGenerator() {
    // getEmployee: function* employeeGenerator() {
    //     let employee = company.next();
    // while (!employee.done) {
    //   yield employee.value;
    //   employee = company.next();
    // }

    let currrentEmployee = 0;
    while (currrentEmployee < this.employees.length) {
      yield this.employees[currrentEmployee];
      currrentEmployee++;
    }

  }

};

// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());

// let employee = company.next();
// while (!employee.done) {
//   console.log(employee.value);
//   employee = company.next();
// }

for (const employee of company) {
  console.log(employee);
}
console.log([...company]);
// const it = company.getEmployee();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

const person = ['Max', 'Manuel'];
console.log(person);



//REflect API
const course = {
  title: 'JavaScript - The Complete Guide'
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  }
});
// console.log(course.toString());
Reflect.deleteProperty(course, 'title');
console.log(course);



//proxy API
const coursed = {
  title: 'JavaScript - The Complete Guide'
};

Reflect.setPrototypeOf(coursed, {
  toString() {
    return this.title;
  }
});
console.log(coursed);

const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName);
    // return obj[propertyName];
    // return 'somethimg'; 
    if (propertyName === 'length') {
      return 0;
    }
    return obj[propertyName] || 'Not found';
  },
  set(obj, propertyName, newValue) {
    console.log('Sending data...');
    if (propertyName === 'rating') {
      return;
    }
    obj[propertyName] = newValue;
  }
};
const pCourse = new Proxy(coursed, courseHandler);
pCourse.rating = 5;
// console.log(pCourse.title);
// console.log(coursed, pCourse);
console.log(pCourse.title, pCourse.length, pCourse.rating);