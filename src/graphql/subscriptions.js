// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateEmployee = `subscription OnCreateEmployee {
  onCreateEmployee {
    id
    firstname
    lastname
    created
    addresses
    addressID
    skills
    skillsID
  }
}
`;
export const onUpdateEmployee = `subscription OnUpdateEmployee {
  onUpdateEmployee {
    id
    firstname
    lastname
    created
    addresses
    addressID
    skills
    skillsID
  }
}
`;
export const onDeleteEmployee = `subscription OnDeleteEmployee {
  onDeleteEmployee {
    id
    firstname
    lastname
    created
    addresses
    addressID
    skills
    skillsID
  }
}
`;
export const onCreateAddress = `subscription OnCreateAddress {
  onCreateAddress {
    id
    line1
    line2
    city
    state
    zipcode
    employeeID
  }
}
`;
export const onUpdateAddress = `subscription OnUpdateAddress {
  onUpdateAddress {
    id
    line1
    line2
    city
    state
    zipcode
    employeeID
  }
}
`;
export const onDeleteAddress = `subscription OnDeleteAddress {
  onDeleteAddress {
    id
    line1
    line2
    city
    state
    zipcode
    employeeID
  }
}
`;
export const onCreateSkill = `subscription OnCreateSkill {
  onCreateSkill {
    id
    name
    employeeID
  }
}
`;
export const onUpdateSkill = `subscription OnUpdateSkill {
  onUpdateSkill {
    id
    name
    employeeID
  }
}
`;
export const onDeleteSkill = `subscription OnDeleteSkill {
  onDeleteSkill {
    id
    name
    employeeID
  }
}
`;
