export interface ExperienceEntry {
  id: string;
  position: string;
  company: string;
  time: string;
  jobDescription: string;
}

export interface EducationEntry {
  id: string;
  degName: string;
  university: string;
  educationYear: string;
  education_summary: string;
}

export interface ProjectEntry {
  id: string;
  projectName: string;
  projectUrl: string;
  projectDescription: string;
}

export interface CertificationEntry {
  id: string;
  certName: string;
  certIssuer: string;
  certYear: string;
}

export interface FormDataState {
  name: string;
  email: string;
  number: string;
  address: string;
  profilePhoto: string;
  education: EducationEntry[];
  experiences: ExperienceEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  skills: string;
}

let idCounter = 0;
export const genId = () => `entry-${Date.now()}-${idCounter++}`;

export const emptyEducation = (): EducationEntry => ({
  id: genId(),
  degName: '',
  university: '',
  educationYear: '',
  education_summary: '',
});

export const emptyExperience = (): ExperienceEntry => ({
  id: genId(),
  position: '',
  company: '',
  time: '',
  jobDescription: '',
});

export const emptyProject = (): ProjectEntry => ({
  id: genId(),
  projectName: '',
  projectUrl: '',
  projectDescription: '',
});

export const emptyCertification = (): CertificationEntry => ({
  id: genId(),
  certName: '',
  certIssuer: '',
  certYear: '',
});

export const initialFormData: FormDataState = {
  name: '',
  email: '',
  number: '',
  address: '',
  profilePhoto: '',
  education: [emptyEducation()],
  experiences: [emptyExperience()],
  projects: [],
  certifications: [],
  skills: '',
};