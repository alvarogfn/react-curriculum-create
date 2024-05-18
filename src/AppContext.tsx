import React from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Resume } from "./models/Resume";
import { v4 as uuidv4 } from "uuid";
import { generateFileForDownload } from "./utils/generateFileForDownload";

export const Context = React.createContext<AppContextType | null>(null);

export interface AppContextType {
  createResume: ({
    firstName,
    lastName,
    birthdate,
    email,
    cpf,
    phone,
    gender,
    experience,
  }: ResumeForm) => Resume;
  getAllResumes: () => Resume[];
  getResumeById: (id: string) => Resume | null;
  deleteResumeById: (id: string) => void;
  exportResumeById: (id: string) => void;
  updateResume: (resume: Resume) => string;
}

export function AppContext({ children }: { children: React.ReactNode }) {
  const resumeStorageHook = useLocalStorage<Resume[]>("resumes");

  const [resumes, setResumes] = React.useState<Resume[]>(() => {
    return resumeStorageHook.get() || [];
  });

  function createResume({
    firstName,
    lastName,
    birthdate,
    email,
    cpf,
    phone,
    gender,
    experience,
  }: ResumeForm) {
    const resume: Resume = {
      firstName,
      lastName,
      email,
      cpf,
      phone,
      gender,
      experience,
      id: uuidv4(),
      createdAt: +new Date(),
      birthdate: +new Date(birthdate.concat("T00:00:00")),
    };

    setResumes((last) => [resume, ...last]);

    return resume;
  }

  function getAllResumes(): Resume[] {
    return resumes;
  }

  function getResumeById(id: string): Resume | null {
    return resumes.find((resume) => resume.id === id) || null;
  }

  function deleteResumeById(id: string) {
    setResumes((last) => last.filter((resume) => resume.id !== id));
  }

  function exportResumeById(id: string) {
    const resume = resumes.find((resume) => resume.id === id);

    const filename = `Resume of ${
      resume?.firstName
    } created At ${new Date().toLocaleDateString("pt-BR", {
      dateStyle: "short",
    })}`;

    if (resume) generateFileForDownload(resume, { filename, type: "json" });
  }

  function updateResume(resume: Resume): string {
    setResumes((last) => {
      const index = last.findIndex(({ id }) => id === resume.id);
      if (index === -1) return [resume, ...last];
      last.splice(index, 1, resume);
      return last;
    });

    return resume.id;
  }

  React.useEffect(() => {
    resumeStorageHook.put(resumes);
  }, [resumes]);

  const storage = {
    createResume,
    getAllResumes,
    getResumeById,
    deleteResumeById,
    exportResumeById,
    updateResume,
  };
  return <Context.Provider value={storage}>{children}</Context.Provider>;
}
