// Screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import TaskItem from '../components/taskItem';
import { saveTask } from '../storage/taskStorage';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('tudo'); // 'tudo' | 'hoje'

  const daysOfWeek = [
    'domingo',
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sábado',
  ];

  //Função para descobrir a semana do mês
  const getWeekOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDay.getDay() || 7;
    return Math.ceil((date.getDate() + dayOfWeek - 1) / 7);
  };

  const today = new Date();
  const todayName = daysOfWeek[today.getDay()];
  const weekNumber = getWeekOfMonth(today);
  const monthName = today.toLocaleString('pt-BR', { month: 'long' });

  // ➕ Adicionar nova tarefa para um dia específico
  const addTask = (selectedDay) => {
    if (task.trim().length === 0) return;

    const novaTarefa = {
      id: Date.now().toString(),
      text: task,
      status: 'pendente',
      day: selectedDay,
    };

    const updatedTasks = [...tasks, novaTarefa];
    setTasks(updatedTasks);
    saveTask(updatedTasks);
    setTask('');
  };

  //  Atualizar status da tarefa
  const onStatusChange = (id, novoStatus) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, status: novoStatus } : t
    );
    setTasks(updatedTasks);
    saveTask(updatedTasks);
  };

  //  Excluir tarefa
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    saveTask(updatedTasks);
  };

  // Filtrar tarefas (tudo ou só hoje)
  const filteredDays =
    filter === 'tudo' ? daysOfWeek : [todayName];

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#F5F5F5' }}>
      {/* Cabeçalho com título e filtro */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Semana {weekNumber} de{' '}
          {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: filter === 'tudo' ? '#2196F3' : '#E0E0E0',
              padding: 8,
              borderRadius: 6,
              marginRight: 6,
            }}
            onPress={() => setFilter('tudo')}
          >
            <Text
              style={
                { color: filter === 'tudo' ? '#fff' : '#000', fontWeight: '600' }
                }
            >
              Tudo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: filter === 'hoje' ? '#2196F3' : '#E0E0E0',
              padding: 8,
              borderRadius: 6,
            }}
            onPress={() => setFilter('hoje')}
          >
            <Text
              style={
                { color: filter === 'hoje' ? '#fff' : '#000', fontWeight: '600' }
                }
            >
              Hoje
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de dias */}
      {filteredDays.map((day) => (
        <View key={day} style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 8,
              color: '#333',
            }}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Text>

          {/* Tarefas do dia */}
          <FlatList
            data={tasks.filter((t) => t.day === day)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem
                item={item}
                onDelete={deleteTask}
                onStatusChange={onStatusChange}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: 'gray' }}>Nenhuma tarefa</Text>
            }
          />

          {/* Campo para adicionar tarefa */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <TextInput
              placeholder={`Nova tarefa para ${day}`}
              value={task}
              onChangeText={setTask}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 8,
                borderRadius: 6,
                marginRight: 8,
                backgroundColor: '#fff',
              }}
            />
            <TouchableOpacity
              onPress={() => addTask(day)}
              style={{
                backgroundColor: '#2196F3',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
