
import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Calendar, Users, ChartBar } from 'lucide-react';

const Reports = () => {
  const [attendanceData] = useState([
    { month: 'Jan', presentes: 85, faltas: 15 },
    { month: 'Fev', presentes: 88, faltas: 12 },
    { month: 'Mar', presentes: 82, faltas: 18 },
    { month: 'Abr', presentes: 90, faltas: 10 },
    { month: 'Mai', presentes: 87, faltas: 13 },
    { month: 'Jun', presentes: 92, faltas: 8 }
  ]);

  const [gradeData] = useState([
    { name: 'Excelente (9-10)', value: 25, color: '#22c55e' },
    { name: 'Bom (7-8)', value: 45, color: '#3b82f6' },
    { name: 'Regular (5-6)', value: 25, color: '#f59e0b' },
    { name: 'Precisa Melhorar (<5)', value: 5, color: '#ef4444' }
  ]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/20">
          <p className="text-white font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-blue-200">
              {`${entry.dataKey}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Relatórios e Analytics</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              Filtrar Período
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Exportar PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">35</div>
              <div className="text-blue-200 text-sm">Total de Alunos</div>
              <div className="text-green-300 text-xs mt-1">+12% este mês</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">87%</div>
              <div className="text-blue-200 text-sm">Taxa de Presença</div>
              <div className="text-green-300 text-xs mt-1">+5% vs mês anterior</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">7.8</div>
              <div className="text-blue-200 text-sm">Nota Média</div>
              <div className="text-green-300 text-xs mt-1">+0.3 vs semestre anterior</div>
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">92%</div>
              <div className="text-blue-200 text-sm">Satisfação</div>
              <div className="text-green-300 text-xs mt-1">Baseado em pesquisas</div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ChartBar className="w-5 h-5 text-blue-300" />
              <h3 className="text-xl font-semibold text-white">Frequência por Mês</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="presentes" fill="#22c55e" name="Presentes (%)" />
                <Bar dataKey="faltas" fill="#ef4444" name="Faltas (%)" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-300" />
              <h3 className="text-xl font-semibold text-white">Distribuição de Notas</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Relatórios Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
              <h4 className="text-white font-medium mb-2">Relatório de Frequência</h4>
              <p className="text-blue-200 text-sm mb-3">Análise detalhada da presença dos alunos por período</p>
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Gerar Relatório
              </Button>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
              <h4 className="text-white font-medium mb-2">Relatório de Notas</h4>
              <p className="text-blue-200 text-sm mb-3">Evolução do desempenho acadêmico dos estudantes</p>
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Gerar Relatório
              </Button>
            </div>
            <div className="p-4 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
              <h4 className="text-white font-medium mb-2">Relatório de Turmas</h4>
              <p className="text-blue-200 text-sm mb-3">Performance e estatísticas por turma</p>
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Gerar Relatório
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Reports;
