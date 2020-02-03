import parse from 'csv-parse';
import {writeRegistration} from '../../../firebase/registrations';

export function uploadStudents(file) {
  const reader = new FileReader();
  reader.onload = () => {
    parse(reader.result, (err, data) => {
      const studentsJSON = getStudentsJSON(data);
      studentsJSON.forEach(student => {
        writeRegistration(student);
      });
    });
  };
  reader.readAsBinaryString(file);
}

function getStudentsJSON(data) {
  let studentsList = [];
      
  for (let i = 0; i < data.length; i++) {
    const newStudent = mapStudentJSON(data, i);
    studentsList.push(newStudent);
  }

  return studentsList;
}

function mapStudentJSON(data, i) {
  const firstName = data[i][0];
  const lastName = data[i][1];
  const gender = data[i][2];
  const birthDate = data[i][3];
  const email = data[i][4];
  const zipCode = data[i][5];
  const city = data[i][6];
  const streetName = data[i][7];
  const education = data[i][8];
  const parentFirstName = data[i][9];
  const parentLastName = data[i][10];
  const phoneNumber = data[i][11];

  const newStudent = {
    name: {
      first: firstName,
      last: lastName
    },
    gender,
    birthDate,
    email,
    address: {
      zipCode,
      city,
      streetName
    },
    education,
    parent: {
      name: {
        first: parentFirstName,
        last: parentLastName
      }
    },
    phoneNumber
  };

  return newStudent;
}