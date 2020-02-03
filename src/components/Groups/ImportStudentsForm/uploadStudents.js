import csv from 'csv';

export function uploadStudents(file) {
  const reader = new FileReader();
  reader.onload(() => {
    csv.parse((reader.result, (err, data) => {
      mapStudentsJSON(data);
    }));
  });
  reader.readAsBinaryString(file);
}

function mapStudentsJSON(data) {
  let studentsList = [];
      
  for (let i = 0; i < data.length; i++) {
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
      'name': {
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

    studentsList.push(newStudent);
  }

  return studentsList;
}