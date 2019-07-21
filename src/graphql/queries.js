// eslint-disable
// this is an auto generated file. This will be overwritten

export const getEmployee = `query GetEmployee($id: ID!) {
  getEmployee(id: $id) {
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
export const listEmployees = `query ListEmployees(
  $filter: ModelEmployeeFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstname
      lastname
      created
      addresses
      addressID
      skills
      skillsID
    }
    nextToken
  }
}
`;
export const getAddress = `query GetAddress($id: ID!) {
  getAddress(id: $id) {
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
export const listAddresss = `query ListAddresss(
  $filter: ModelAddressFilterInput
  $limit: Int
  $nextToken: String
) {
  listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      line1
      line2
      city
      state
      zipcode
      employeeID
    }
    nextToken
  }
}
`;
export const getSkill = `query GetSkill($id: ID!) {
  getSkill(id: $id) {
    id
    name
    employeeID
  }
}
`;
export const listSkills = `query ListSkills(
  $filter: ModelSkillFilterInput
  $limit: Int
  $nextToken: String
) {
  listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      employeeID
    }
    nextToken
  }
}
`;
