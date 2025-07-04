
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Dados mock para demonstração
const mockStudents = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    age: 12,
    school: 'Escola Municipal João Santos',
    phone: '(43) 99999-1111',
    responsibleName: 'Maria Silva',
    responsiblePhone: '(43) 99999-2222',
    status: 'ativo',
    enrollmentDate: '2024-02-15',
    turma: 'Turma A - Manhã'
  },
  {
    id: 2,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    age: 14,
    school: 'Escola Estadual Dom Pedro',
    phone: '(43) 99999-3333',
    responsibleName: 'João Oliveira',
    responsiblePhone: '(43) 99999-4444',
    status: 'ativo',
    enrollmentDate: '2024-02-20',
    turma: 'Turma B - Tarde'
  },
  {
    id: 3,
    name: 'Carla Santos',
    email: 'carla.santos@email.com',
    age: 13,
    school: 'Escola Municipal Santa Rita',
    phone: '(43) 99999-5555',
    responsibleName: 'Rosa Santos',
    responsiblePhone: '(43) 99999-6666',
    status: 'ativo',
    enrollmentDate: '2024-03-01',
    turma: 'Turma A - Manhã'
  }
];

const mockGrades = [
  {
    id: 1,
    studentId: 1,
    discipline: 'Informática Básica',
    gradeBefore: 6.5,
    gradeAfter: 8.5,
    observations: 'Ótima evolução no uso do computador',
    date: '2024-06-15'
  },
  {
    id: 2,
    studentId: 1,
    discipline: 'Lógica de Programação',
    gradeBefore: 5.0,
    gradeAfter: 7.8,
    observations: 'Demonstra bom raciocínio lógico',
    date: '2024-06-15'
  },
  {
    id: 3,
    studentId: 2,
    discipline: 'Robótica',
    gradeBefore: 7.0,
    gradeAfter: 9.0,
    observations: 'Excelente habilidade com montagem',
    date: '2024-06-20'
  }
];

const mockAttendance = [
  {
    id: 1,
    studentId: 1,
    date: '2024-06-01',
    present: true,
    workshop: 'Informática Básica'
  },
  {
    id: 2,
    studentId: 1,
    date: '2024-06-08',
    present: true,
    workshop: 'Lógica de Programação'
  },
  {
    id: 3,
    studentId: 2,
    date: '2024-06-01',
    present: false,
    workshop: 'Robótica',
    reason: 'Doente'
  }
];

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(mockStudents);
  const [grades, setGrades] = useState(mockGrades);
  const [attendance, setAttendance] = useState(mockAttendance);

  // Funções para gerenciar estudantes
  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now(),
      status: 'ativo',
      enrollmentDate: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    setGrades(prev => prev.filter(grade => grade.studentId !== id));
    setAttendance(prev => prev.filter(att => att.studentId !== id));
  };

  // Funções para gerenciar notas
  const addGrade = (grade) => {
    const newGrade = {
      ...grade,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setGrades(prev => [...prev, newGrade]);
    return newGrade;
  };

  const updateGrade = (id, updatedData) => {
    setGrades(prev => 
      prev.map(grade => 
        grade.id === id ? { ...grade, ...updatedData } : grade
      )
    );
  };

  // Funções para gerenciar presença
  const addAttendance = (attendanceData) => {
    const newAttendance = {
      ...attendanceData,
      id: Date.now()
    };
    setAttendance(prev => [...prev, newAttendance]);
    return newAttendance;
  };

  const updateAttendance = (id, updatedData) => {
    setAttendance(prev => 
      prev.map(att => 
        att.id === id ? { ...att, ...updatedData } : att
      )
    );
  };

  // Funções de consulta
  const getStudentGrades = (studentId) => {
    return grades.filter(grade => grade.studentId === studentId);
  };

  const getStudentAttendance = (studentId) => {
    return attendance.filter(att => att.studentId === studentId);
  };

  const getAttendanceByDate = (date) => {
    return attendance.filter(att => att.date === date);
  };

  const value = {
    students,
    grades,
    attendance,
    addStudent,
    updateStudent,
    deleteStudent,
    addGrade,
    updateGrade,
    addAttendance,
    updateAttendance,
    getStudentGrades,
    getStudentAttendance,
    getAttendanceByDate
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
