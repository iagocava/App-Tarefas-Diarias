import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { taskItemStyles as styles } from './taskItemStyles';

export default function TaskItem({ item, onDelete, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'feito':
        return '#4CAF50'; //verde
      case 'nao_concluido':
        return '#F44336'; //vermelho
      default:
        return '#FFC107'; //amarelo
    }
  };
return (
    <View style={[styles.container, { borderLeftColor: getStatusColor(item.status) }]}>
      <Text style={styles.text}>{item.text}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => onStatusChange(item.id, 'feito')}
        >
          <Text style={styles.statusText}>Feito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: '#FFC107' }]}
          onPress={() => onStatusChange(item.id, 'pendente')}
        >
          <Text style={styles.statusText}>Pendente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: '#F44336' }]}
          onPress={() => onStatusChange(item.id, 'nao_concluido')}
        >
          <Text style={styles.statusText}>Não Concluído</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: 'gray' }]}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.statusText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}