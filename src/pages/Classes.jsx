
import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layout-grid, Settings, Users } from 'lucide-react';

const Classes = () => {
  const [classes] = useState([
    {
      id: 1,
      name: 'Turma A - Manhã',
      schedule: '08:00 - 11:00',
      days: 'Seg, Qua, Sex',
      instructor: 'João Silva',
      studentsCount: 15,
      maxStudents: 20,
      subject: 'Informática Básica',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Turma B - Tarde',
      schedule: '14:00 - 17:00',
      days: 'Ter, Qui',
      instructor: 'Maria Santos',
      studentsCount: 12,
      maxStudents: 18,
      subject: 'Robótica',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Turma C - Noite',
      schedule: '19:00 - 21:00',
      days: 'Seg, Qua',
      instructor: 'Pedro Oliveira',
      studentsCount: 8,
      maxStudents: 15,
      subject: 'Programação',
      status: 'inativo'
    }
  ]);

  const getStatusBadge = (status) => {
    return status === 'ativo' 
      ? <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Ativo</span>
      : <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">Inativo</span>;
  };

  const getCapacityBadge = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) {
      return <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">Lotada</span>;
    } else if (percentage >= 70) {
      return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">Quase Cheia</span>;
    }
    return <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Disponível</span>;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Layout-grid className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Gerenciar Turmas</h1>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Nova Turma
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{classes.length}</div>
              <div className="text-blue-200 text-sm">Total de Turmas</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">
                {classes.filter(c => c.status === 'ativo').length}
              </div>
              <div className="text-blue-200 text-sm">Turmas Ativas</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {classes.reduce((acc, c) => acc + c.studentsCount, 0)}
              </div>
              <div className="text-blue-200 text-sm">Total de Alunos</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">3</div>
              <div className="text-blue-200 text-sm">Instrutores</div>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-blue-200">Nome da Turma</TableHead>
                <TableHead className="text-blue-200">Horário</TableHead>
                <TableHead className="text-blue-200">Dias</TableHead>
                <TableHead className="text-blue-200">Instrutor</TableHead>
                <TableHead className="text-blue-200">Matéria</TableHead>
                <TableHead className="text-blue-200">Alunos</TableHead>
                <TableHead className="text-blue-200">Status</TableHead>
                <TableHead className="text-blue-200">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classItem) => (
                <TableRow key={classItem.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white font-medium">{classItem.name}</TableCell>
                  <TableCell className="text-blue-200">{classItem.schedule}</TableCell>
                  <TableCell className="text-blue-200">{classItem.days}</TableCell>
                  <TableCell className="text-blue-200">{classItem.instructor}</TableCell>
                  <TableCell className="text-blue-200">{classItem.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{classItem.studentsCount}/{classItem.maxStudents}</span>
                      {getCapacityBadge(classItem.studentsCount, classItem.maxStudents)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(classItem.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-white/10">
                        <Users className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-white/10">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GlassCard>
      </div>
    </div>
  );
};

export default Classes;
