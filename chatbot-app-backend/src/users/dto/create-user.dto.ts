export class CreateUserDto {
  email: string;
  password: string;
  gender: string;
  smoker: boolean;
  region: string; // E.g., Vrancea, București
  ageInterval: string; // E.g., "< 20", "21 - 30"
  medicalCondition: string; // E.g., Cardiovascular incident
}
