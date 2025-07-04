import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import StatCard from "../../components/StatCard";
import GlassCard from "../../components/GlassCard";

const ParentDashboard = () => {
    const { user } = useAuth();
    const { students, grades, attendance } = useData();

    // Para demonstração, vamos assumir que o primeiro aluno é filho deste responsável
    const myChild = students[0];
    const childGrades = grades.filter((g) => g.studentId === myChild?.id);
    const childAttendance = attendance.filter(
        (a) => a.studentId === myChild?.id,
    );

    const attendanceRate =
        childAttendance.length > 0
            ? (
                  (childAttendance.filter((a) => a.present).length /
                      childAttendance.length) *
                  100
              ).toFixed(1)
            : "0";

    const avgBefore =
        childGrades.reduce((acc, g) => acc + g.gradeBefore, 0) /
        (childGrades.length || 1);
    const avgAfter =
        childGrades.reduce((acc, g) => acc + g.gradeAfter, 0) /
        (childGrades.length || 1);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
                    Olá, {user.name}!
                </h1>
                <p className="text-blue-200 text-lg">
                    Acompanhe o progresso de {myChild?.name} no projeto ELLP
                </p>
            </div>

            {myChild && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Frequência"
                            value={`${attendanceRate}%`}
                            subtitle="Taxa de presença"
                            color="blue"
                        />
                        <StatCard
                            title="Média Antes"
                            value={avgBefore.toFixed(1)}
                            subtitle="Notas iniciais"
                            color="red"
                        />
                        <StatCard
                            title="Média Atual"
                            value={avgAfter.toFixed(1)}
                            subtitle="Notas atuais"
                            color="green"
                        />
                        <StatCard
                            title="Melhoria"
                            value={`+${(avgAfter - avgBefore).toFixed(1)}`}
                            subtitle="Evolução"
                            color="purple"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GlassCard className="p-6">
                            <h3 className="text-white text-xl font-semibold mb-4">
                                Informações do Aluno
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-white/5 p-3 rounded-lg">
                                    <p className="text-white/60 text-sm">
                                        Nome
                                    </p>
                                    <p className="text-white font-medium">
                                        {myChild.name}
                                    </p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                    <p className="text-white/60 text-sm">
                                        Idade
                                    </p>
                                    <p className="text-white font-medium">
                                        {myChild.age} anos
                                    </p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                    <p className="text-white/60 text-sm">
                                        Turma
                                    </p>
                                    <p className="text-white font-medium">
                                        {myChild.turma}
                                    </p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                    <p className="text-white/60 text-sm">
                                        Escola
                                    </p>
                                    <p className="text-white font-medium">
                                        {myChild.school}
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h3 className="text-white text-xl font-semibold mb-4">
                                Notas por Disciplina
                            </h3>
                            <div className="space-y-3">
                                {childGrades.map((grade) => (
                                    <div
                                        key={grade.id}
                                        className="bg-white/5 p-3 rounded-lg"
                                    >
                                        <h4 className="text-white font-medium mb-2">
                                            {grade.discipline}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-white/60 text-xs">
                                                    Antes
                                                </p>
                                                <p className="text-red-300 text-lg font-bold">
                                                    {grade.gradeBefore}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-white/60 text-xs">
                                                    Atual
                                                </p>
                                                <p className="text-green-300 text-lg font-bold">
                                                    {grade.gradeAfter}
                                                </p>
                                            </div>
                                        </div>
                                        {grade.observations && (
                                            <p className="text-blue-200 text-sm mt-2">
                                                {grade.observations}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard className="p-6">
                        <h3 className="text-white text-xl font-semibold mb-4">
                            Histórico de Presença
                        </h3>
                        <div className="space-y-2">
                            {childAttendance.map((att) => (
                                <div
                                    key={att.id}
                                    className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                                >
                                    <div>
                                        <p className="text-white font-medium">
                                            {att.workshop}
                                        </p>
                                        <p className="text-blue-200 text-sm">
                                            {new Date(
                                                att.date,
                                            ).toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {att.present ? (
                                            <span className="text-green-300 font-medium">
                                                ✅ Presente
                                            </span>
                                        ) : (
                                            <span className="text-red-300 font-medium">
                                                ❌ Ausente
                                            </span>
                                        )}
                                        {att.reason && (
                                            <p className="text-white/60 text-xs">
                                                {att.reason}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <h3 className="text-white text-xl font-semibold mb-4">
                            Comunicados
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                <h4 className="text-white font-medium">
                                    Workshop Especial de Robótica
                                </h4>
                                <p className="text-blue-200 text-sm">
                                    Próximo sábado teremos uma atividade
                                    especial de robótica. Não percam!
                                </p>
                                <p className="text-white/60 text-xs mt-1">
                                    Há 2 dias
                                </p>
                            </div>
                            <div className="bg-green-500/20 p-3 rounded-lg">
                                <h4 className="text-white font-medium">
                                    Parabéns pelo Progresso!
                                </h4>
                                <p className="text-green-200 text-sm">
                                    {myChild.name} está se destacando nas aulas
                                    de programação. Continue assim!
                                </p>
                                <p className="text-white/60 text-xs mt-1">
                                    Há 1 semana
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </>
            )}
        </div>
    );
};

export default ParentDashboard;
