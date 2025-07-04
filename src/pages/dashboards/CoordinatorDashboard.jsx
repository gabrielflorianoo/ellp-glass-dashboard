
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import StatCard from '../../components/StatCard';
import GlassCard from '../../components/GlassCard';

const CoordinatorDashboard = () => {
  const { user } = useAuth();
  const { students, grades, attendance } = useData();

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'ativo').length;

  // Cálculo de médias por disciplina
  const disciplines = ['Informática Básica', 'Lógica de Programação', 'Robótica'];
  const disciplineStats = disciplines.map(discipline => {
    const disciplineGrades = grades.filter(g => g.discipline === discipline);
    const avgBefore = disciplineGrades.reduce((acc, g) => acc + g.gradeBefore, 0) / (disciplineGrades.length || 1);
    const avgAfter = disciplineGrades.reduce((acc, g) => acc + g.gradeAfter, 0) / (disciplineGrades.length || 1);
    return {
      discipline,
      avgBefore: avgBefore.toFixed(1),
      avgAfter: avgAfter.toFixed(1),
      improvement: (avgAfter - avgBefore).toFixed(1)
    };
  });

  const attendanceRate = attendance.length > 0 ? 
    (attendance.filter(a => a.present).length / attendance.length * 100).toFixed(1) : '0';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Prof. {user.name}
        </h1>
        <p className="text-blue-200 text-lg">
          Coordenação do Projeto ELLP - UTFPR
        </p>
        <p className="text-white/70 text-sm mt-1">
          Relatórios Executivos e Análise de Impacto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Participantes"
          value={totalStudents}
          subtitle={`${activeStudents} ativos`}
          color="blue"
        />
        <StatCard
          title="Taxa de Frequência"
          value={`${attendanceRate}%`}
          subtitle="Geral do projeto"
          color="green"
        />
        <StatCard
          title="Melhoria Média"
          value="+2.1"
          subtitle="Pontos nas notas"
          color="yellow"
        />
        <StatCard
          title="Taxa de Conclusão"
          value="92%"
          subtitle="Alunos que finalizaram"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Impacto do Projeto</h3>
          <div className="space-y-4">
            {disciplineStats.map(stat => (
              <div key={stat.discipline} className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">{stat.discipline}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-white/60 text-xs">Antes</p>
                    <p className="text-red-300 text-lg font-bold">{stat.avgBefore}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Depois</p>
                    <p className="text-green-300 text-lg font-bold">{stat.avgAfter}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Melhoria</p>
                    <p className="text-blue-300 text-lg font-bold">+{stat.improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Ações Executivas</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-500/30 hover:bg-blue-500/40 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-left">
              📊 Relatório Institucional
            </button>
            <button className="w-full bg-green-500/30 hover:bg-green-500/40 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-left">
              📈 Analytics Avançado
            </button>
            <button className="w-full bg-purple-500/30 hover:bg-purple-500/40 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-left">
              👥 Supervisão de Voluntários
            </button>
            <button className="w-full bg-yellow-500/30 hover:bg-yellow-500/40 text-white py-3 px-4 rounded-lg transition-colors duration-200 text-left">
              📋 Exportar Dados
            </button>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Distribuição por Escola de Origem</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white font-medium">Escola Municipal João Santos</h4>
            <p className="text-blue-200 text-2xl font-bold">1</p>
            <p className="text-white/60 text-sm">aluno</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white font-medium">Escola Estadual Dom Pedro</h4>
            <p className="text-green-200 text-2xl font-bold">1</p>
            <p className="text-white/60 text-sm">aluno</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white font-medium">Escola Municipal Santa Rita</h4>
            <p className="text-yellow-200 text-2xl font-bold">1</p>
            <p className="text-white/60 text-sm">aluno</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Agenda e Comunicados</h3>
        <div className="space-y-3">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">Reunião com Reitoria</h4>
                <p className="text-blue-200 text-sm">Apresentação de resultados</p>
              </div>
              <span className="text-yellow-300 text-sm">Sexta-feira</span>
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium">Workshop de Robótica</h4>
                <p className="text-blue-200 text-sm">Evento especial para alunos</p>
              </div>
              <span className="text-green-300 text-sm">Sábado</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CoordinatorDashboard;
